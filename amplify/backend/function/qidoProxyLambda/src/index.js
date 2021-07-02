const https = require('https');

   
async function remoteQuery(url) {
  let dataString='';
  const queryData = await new Promise((resolve, reject) => {
    const req = https.get(url, function(res) {
      res.on('data', chunk => {
        dataString += chunk;
      });
      res.on('end', () => {
        resolve({
            statusCode: 200,
            body: dataString,
        });
      });
    });
    
    req.on('error', (e) => {
      resolve({
          statusCode: 500,
          internalError: e,
          body: 'Something went wrong:'+e
      });
    });
  });

  return queryData;
}

const Tags = {PixelData:'7FE00010'};

const proxiedDomain = 'server.dcmjs.org';
const proxiedStage = 'dcm4chee-arc/aets/DCM4CHEE/rs';

function updateURL(url, domainName, stage) {
    url = url.replace('http:','https:');
    if( domainName ) url = url.replace(proxiedDomain,domainName);
    if( stage ) url = url.replace(proxiedStage,stage);
    return url;
}

function mapHttpPrefix(item, domainName, stage) {
    let url = item['00081190'];
    if( url ) {
        url.Value = url.Value.map(value => updateURL(value,domainName,stage));
    }
    let pixelData = item[Tags.PixelData];
    const {BulkDataURI} = pixelData || {};
    if( BulkDataURI ) {
        pixelData.BulkDataURI = updateURL(BulkDataURI,domainName,stage);
    }
    return item;
}

function addQuery(path, multiValueQueryStringParameters, domainName, stage) {
    let hasQuery = path.indexOf('?')!==-1;
    path = path.replace('dcmjs/','');
    for(const key in multiValueQueryStringParameters) {
        path = path + (hasQuery ? '&' : '?') + 
            multiValueQueryStringParameters[key].map((value) => (key + "="+encodeURIComponent(value))).join('&');
        hasQuery = true; 
    }
    return path;
}

exports.handler = async (event) => {
    const { multiValueQueryStringParameters, path, requestContext } = event;
    const {domainName,stage} = requestContext || {};
    const queryWithPath = addQuery(path,multiValueQueryStringParameters);
    const url = 'https://server.dcmjs.org/dcm4chee-arc/aets/DCM4CHEE/rs' + queryWithPath;
    console.debug('url=',url,'domainName', domainName, 'stage',stage);
    const queryData = await remoteQuery(url);
    let response;
    if( queryData.statusCode===200 ) {
        let jsonData = JSON.parse(queryData.body);
        let body = jsonData.map( item => mapHttpPrefix(item,domainName,stage+'/dcmjs') );
        if( body.length>0 ) {
            // Not quite legal DICOM, but seems to be accepted generally
            body[0]['00031010'] = {vr: "UN", Value: [url, JSON.stringify(event)] };
        }
        response = {body:JSON.stringify(body,null,4), statusCode:200};
    } else {
        response = {body:'Something went wrong queryData='+JSON.stringify(queryData), statusCode: queryData.statusCode || 500};
    }
    return response;
};

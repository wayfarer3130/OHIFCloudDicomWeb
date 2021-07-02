const https = require('https');
   
async function remoteQuery(url) {
  const queryData = await new Promise((resolve, reject) => {
    const req = https.get(url, function(res) {
       res.setEncoding('binary');
       let chunks = [];        
       res.on('data', (chunk) => {
            chunks.push(Buffer.from(chunk, 'binary'));
       });
        
       res.on('end', () => {
          let binary = Buffer.concat(chunks);
          const contentType = res.headers && res.headers['content-type'];
          // Query binary if it is not JSON or if it is multipart/related - need to fix related xml types as well
          if( contentType && (contentType.indexOf('json')===-1 || contentType.indexOf('multipart')!==-1) ) {
            const base64 = binary.toString('base64');
            console.log('Base64', base64.length, binary.length, base64);
            resolve({
              statusCode: 200,
              headers: {...CORS_HEADERS, 'Content-Type':contentType},
              body: base64,
              isBase64Encoded: "True",
            });
          } else {
            const text = binary.toString();
            console.log('Text version=', text);
            resolve({
              statusCode: 200,
              headers: {...CORS_HEADERS, 'Content-Type':contentType},
              body: text,
            });
          }
          
      });

      req.on('error', (e) => {
        resolve({
            statusCode: 500,
            internalError: e,
            body: 'Something went wrong:'+e
        });
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

const CORS_HEADERS = { 
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*' // Your origin name
};

exports.handler = async (event) => {
    const { multiValueQueryStringParameters, path, requestContext } = event;
    const {domainName,stage} = requestContext || {};
    const queryWithPath = addQuery(path,multiValueQueryStringParameters);
    const url = 'https://server.dcmjs.org/dcm4chee-arc/aets/DCM4CHEE/rs' + queryWithPath;
    console.debug('url=',url,'domainName', domainName, 'stage',stage);
    const queryData = await remoteQuery(url);
    let response;
    if( queryData.statusCode===200 ) {
        if( queryData.isBase64Encoded ) {
            console.log('Response is base 64 encoded, returning:', JSON.stringify(queryData));
            return queryData;
        }
        let jsonData = JSON.parse(queryData.body);
        let body = jsonData.map( item => mapHttpPrefix(item,domainName,stage+'/dcmjs') );
        if( body.length>0 ) {
            // Not quite legal DICOM, but seems to be accepted generally
            body[0]['00031010'] = {vr: "UN", Value: [url, JSON.stringify(event)] };
        }
        response = {body:JSON.stringify(body,null,4), statusCode:200, headers: CORS_HEADERS};
    } else {
        response = {body:'Something went wrong queryData='+JSON.stringify(queryData), statusCode: queryData.statusCode || 500};
    }
    return response;
};

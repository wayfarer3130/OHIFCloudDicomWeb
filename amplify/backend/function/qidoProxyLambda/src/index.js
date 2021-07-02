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

function mapHttpPrefix(item) {
    let url = item['00081190'];
    if( url ) {
        url.Value = url.Value.map( (str) => str.replace('http:','https:'));
    }
    return item;
}

function addQuery(path, multiValueQueryStringParameters) {
    let hasQuery = path.indexOf('?')!=-1;
    for(const key in multiValueQueryStringParameters) {
        path = path + (hasQuery ? '&' : '?') + 
            multiValueQueryStringParameters[key].map((value) => (key + "="+encodeURIComponent(value))).join('&');
        hasQuery = true; 
    }
    return path;
}

exports.handler = async (event) => {
    const { multiValueQueryStringParameters, path } = event;
    const queryWithPath = addQuery(path,multiValueQueryStringParameters);
    const url = 'https://server.dcmjs.org/dcm4chee-arc/aets/DCM4CHEE/rs' + queryWithPath;
    console.warn('url=',url);
    const queryData = await remoteQuery(url);
    let response;
    if( queryData.statusCode===200 ) {
        let jsonData = JSON.parse(queryData.body);
        let body = jsonData.map( mapHttpPrefix );
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

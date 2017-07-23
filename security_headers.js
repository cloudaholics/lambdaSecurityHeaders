
'use strict';

exports.handler = (event, context, callback) => {
   const response = event.Records[0].cf.response;
   const headers = response.headers;
   const secHeaders = [{
     "key":"Strict-Transport-Security",
     "Value":"max-age=86400; includeSubDomains"
   },
 {
   "key":"X-Frame-Options","value":"sameorigin"
 },{
   "key":"X-XSS-Protection","value": "1; mode=block"
 },
 {
   "key":"X-Content-Type-Options","value": "nosniff"
 }
];
for (i=0,i<secHeaders.length;i++){
  if(headers[secHeaders[i].Key.toLowerCase()]){
    headers[secHeaders[i].Key.toLowerCase()] = [
       secHeaders[i]
    ];
  }else{
    headers[secHeaders[i].Key.toLowerCase()]=secHeaders[i];
  }

}

   callback(null, response);
};

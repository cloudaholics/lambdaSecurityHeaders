'use strict';

exports.handler = (event, context, callback) => {
   const response = event.Records[0].cf.response;
   const headers = response.headers;
   const secHeaders = [{
     "key":"Strict-Transport-Security",
     "value":"max-age=86400; includeSubDomains"
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
secHeaders.forEach(function(header) {
    console.log(header)
    headers[header.key.toLowerCase()]=[header]
});


   callback(null, response);
};

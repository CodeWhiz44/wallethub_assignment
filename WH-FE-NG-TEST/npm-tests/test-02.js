//@ts-check
/** 
 * run from root folder as : node ./npm-tests/test-02.js
 * 
 * Parse the response from the given REST end point and print out "hobbies" property in the following format: ITEM1, ITEM2, ...
 */
import https from "https";


https.get('https://coderbyte.com/api/challenges/json/rest-get-simple', (resp) => {
  let data = "";
  // response : {"name":"John Smith","age":25,"hobbies":["running","coding","camping"]}
  // parse json and print "hobbies" property as ITEM1, ITEM2,...
  resp.on('data',(chunk)=>{
    data+=chunk;
  });

  resp.on('end', ()=>{
    try {
      const jsonResponse = JSON.parse(data);

      if (jsonResponse.hobbies && Array.isArray(jsonResponse.hobbies)) {
        const hobbies = jsonResponse.hobbies.join(', ');
        console.log(hobbies);
      }else{
        console.error('Hobbies property is not founded or not valid type');
      }
     } catch (err) {
        console.error('Error parsing JSON response:', err.message);
    }
  });
  console.log();
}).on('error', err=>{
  console.error('Error with HTTPS request:', err.message);
});
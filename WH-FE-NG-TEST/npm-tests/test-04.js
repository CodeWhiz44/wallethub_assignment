//@ts-check
/**
 * run from root folder as : node ./npm-tests/test-04.js
 *
 * In the following, make JSON POST to the /save end point.
 * Purify the user input that is received through the /save POST request so that you strip all html tags from the content and clear the security risks in them and print out just the plain text "John Doe" when visiting http://127.0.0.1:8080/get-name
 */
import { fastify } from "fastify";
import http from "http";
import sanitizeHtml from "sanitize-html";

const app = fastify({
  ignoreTrailingSlash: true,
  keepAliveTimeout: 65 * 1000,
});

/** @type {{ firstname?: string, lastname?: string}} */
const userInput = {};

app.register(require("fastify-formbody"));

app.post("/save", (request, reply) => {
  const { firstname, lastname } = request.body;

  userInput.firstname = sanitizeHtml(firstname, {
    allowedTags: [],
    allowedAttributes: {},
  });
  userInput.lastname = sanitizeHtml(lastname, {
    allowedTags: [],
    allowedAttributes: {},
  });

  reply.status(200);
  reply.header("Content-Type", "text/plain; charset=utf-8");
  reply.send("OK");
});

app.get("/get-name", (request, reply) => {
  reply.header("Content-Type", "text/html; charset=utf-8");
  const page = `<html>
           <head>
               <title>Wallethub Test</title>
           </head>
           <body>
               <p>First Name: ${userInput.firstname}</p>
               <p>Last Name: ${userInput.lastname}</p>
           </body>
       </html>`;

  reply.send(page);
});

// server start
app.listen(8080, "0.0.0.0").then((address) => {
  console.log(`Server started at ${address}`);

  // JSON payload to POST
  const payload = JSON.stringify({
    firstname: `<b>John</b><script>/* *\x2A/javascript:alert(1)// */</script>`,
    lastname:
      '<a href="javascript\x3Ajavascript:alert(1)" id="fuzzelement1">Doe</a>',
  });

  // JSON POST of `payload` to http://127.0.0.1:8080/save
  const options = {
    hostname: "127.0.0.1",
    port: 8080,
    path: "/save",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(payload),
    },
  };

  const req = http.request(options, (res) => {
    let data = "";
    res.on("data", (chunk) => {
      data += chunk;
    });
    res.on("end", () => {
      console.log(`Response: ${data}`);
    });
  });

  req.on("error", (e) => {
    console.error(`Problem with request: ${e.message}`);
  });

  // Write data to request body
  req.write(payload);
  req.end();
});

// @ts-check
/**
 * run from root folder as : node ./npm-tests/test-01.js
 *
 * Using fs write the following json (data) into a file (data.json)
 * Through the fastify server and with help from fs read the json saved in "data.json" and print out the data.user in the html response as a list of names each being as <p>{name}</p>, ex : <p>John Doe</p><p>Lucita Esau</p>
 */

const fs = require("fs");
const fastify = require("fastify")({
  ignoreTrailingSlash: true,
  keepAliveTimeout: 65 * 1000,
});

const data = {
  error: false,
  users: [
    "John Doe",
    "Lucita Esau",
    "Thomas Friedman",
    "Norma Helms",
    "Amy Manning",
  ],
};

// write the json saving code here
const writeData = () => {
  fs.writeFile("./data.json", JSON.stringify(data), (err) => {
    if (err) {
      console.error("Error writing JSON data to file:", err);
    } else {
      console.log("JSON data has been written to data.json");
    }
  });
};
writeData();

fastify.get("/", async (request, reply) => {
  fs.readFile("./data.json", (err, jsonData) => {
    if (err) {
      console.error("Error reading JSON data from file:", err);
      reply.status(500).send("Internal Server Error");
    } else {
      const users = JSON.parse(jsonData).users;
      const userListHtml = users.map((user) => `<p>${user}</p>`).join("");

      const page = `
<html>
<head>
<title>Wallethub Test</title>
</head>
<body>
${userListHtml}
</body>
</html>`;

      reply.header("Content-Type", "text/html; charset=utf-8");
      reply.send(page);
    }
  });
});

// Server start
fastify.listen(8080, "0.0.0.0", (err, address) => {
  if (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
  console.log(`Server started at ${address}`);
});

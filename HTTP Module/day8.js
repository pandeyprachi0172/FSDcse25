// import http from "http"; // Import the built-in HTTP module

// // Create the HTTP server
// const server = http.createServer((req, res) => {
//     res.writeHead(200, { "Content-Type": "text/html" });

//     res.write("<h1>This is my own server</h1>");

//     // Send normal text to the browser
//     res.write("Hello Prachi! Server is working.");

//     // End the response
//     res.end();
// });

// // Start the server on port 3000
// server.listen(3000, () => {
//     console.log("Server is running on port 3000");
// });





// import http from "http"; // Import the built-in HTTP module

// // Create the HTTP server
// const server = http.createServer((req, res) => {
//     res.setHeader("content-type","text/html");
//     res.end('response from server end');
// });
// server.listen(POST,HOST,()=>{
//     const PORT=process.env.PORT
// })



//  <--------------------program 3------------------->
// Create a basic HTTP server  using .createSErver().Respond with "Hello World" and return headers +status code
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/success') {
    res.writeHead(200, {
      'Content-Type': 'text/plain',
      'X-Custom-Header': 'Hello'
    });

    res.end('Hello World');
  } 
  else if (req.url === '/forbidden') {
    res.writeHead(403, {
      'Content-Type': 'text/plain',
      'X-Custom-Header': 'Hello'
    });

    res.end('Forbidden');
  } 
  else {
    res.writeHead(404, {
      'Content-Type': 'text/plain'
    });

    res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
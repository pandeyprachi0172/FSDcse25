import http from "http"; // Import the built-in HTTP module

// Create the HTTP server
const server = http.createServer((req, res) => {
    // Send a response to the client
    res.write("Hello Prachi! Server is working.");

    // End the response
    res.end();
});

// Start the server on port 3000
server.listen(3000, () => {
    console.log("Server is running on port 3000");
});
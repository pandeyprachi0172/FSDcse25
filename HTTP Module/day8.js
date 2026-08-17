// Create your own server using HTTP
import http from "http";

const server = http.createServer((req, res) => {
    res.write("Hello Prachi! Server is working.");
    res.end();
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});
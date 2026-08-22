//  status code for network 200 :success, 404: page not found ,403:forbidden ,
// Practice routing using http module in node.js

import http from "http";

const server = http.createServer((req, res) => {

    if (req.url === "/") {
        res.statusCode = 200;
        res.end(" This is Home Page");
    }
    else if (req.url === "/about") {
        res.statusCode = 200;
        res.end(" This is About Page");
    }
    else if (req.url === "/admin") {
        res.statusCode = 403;
        res.end("Forbidden");
    }
    else {
        res.statusCode = 404;
        res.end("Page Not Found");
    }

});

server.listen(3000, () => {
    console.log("server is running on http://localhost:3000");
});

//  make a student information table  from using html and send data to server add create 
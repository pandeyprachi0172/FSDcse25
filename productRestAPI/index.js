import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Product REST API is running!");
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});

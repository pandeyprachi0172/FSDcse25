const express = require("express");

const app = express();

app.use(express.json());

const products = [];

for (let i = 1; i <= 100; i++) {
    products.push({
        id: i,
        name: `Product ${i}`,
        price: i * 50,
        category: `Category ${((i - 1) % 5) + 1}`,
        available: i % 2 === 0
    });
}

app.get("/", (req, res) => {
    res.send("Product REST API is running");
});

app.get("/products", (req, res) => {
    res.json(products);
});

app.get("/products/:id", (req, res) => {
    const id = Number(req.params.id);

    const product = products.find((item) => item.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.json(product);
});

app.post("/products", (req, res) => {
    const { name, price, category, available } = req.body;

    const newProduct = {
        id: products.length + 1,
        name: name,
        price: price,
        category: category,
        available: available
    };

    products.push(newProduct);

    res.status(201).json(newProduct);
});

app.put("/products/:id", (req, res) => {
    const id = Number(req.params.id);
    const product = products.find((item) => item.id === id);
    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }
    product.name = req.body.name ?? product.name;
    product.price = req.body.price ?? product.price;
    product.category = req.body.category ?? product.category;
    product.available = req.body.available ?? product.available;

    res.json(product);
});

app.delete("/products/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = products.findIndex((item) => item.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    const deletedProduct = products.splice(index, 1);

    res.json({
        message: "Product deleted",
        product: deletedProduct[0]
    });
});
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});

const express = require("express");
const app = express();
app.use(express.json());
const productNames = [
    "iPhone 15",
    "Samsung Galaxy S24",
    "OnePlus 12",
    "MacBook Air",
    "Dell Inspiron Laptop",
    "HP Pavilion Laptop",
    "iPad Air",
    "Samsung Tablet",
    "Sony Headphones",
    "Boat Earbuds",
    "JBL Speaker",
    "Apple Watch",
    "Samsung Smart Watch",
    "Logitech Keyboard",
    "Wireless Mouse",
    "Gaming Mouse",
    "Computer Monitor",
    "Canon Camera",
    "Nikon Camera",
    "Power Bank",
    "USB Cable",
    "Bluetooth Speaker",
    "Gaming Controller",
    "Laptop Bag",
    "School Backpack",
    "Running Shoes",
    "Sports Shoes",
    "Casual Shoes",
    "Cotton T-Shirt",
    "Polo T-Shirt",
    "Blue Jeans",
    "Black Jeans",
    "Leather Jacket",
    "Hoodie",
    "Formal Shirt",
    "Sunglasses",
    "Wrist Watch",
    "Wallet",
    "Leather Belt",
    "Baseball Cap",
    "Harry Potter Book",
    "JavaScript Book",
    "Python Book",
    "Node.js Book",
    "Notebook",
    "Ball Pen",
    "Pencil Set",
    "Desk Lamp",
    "Office Chair",
    "Study Table",
    "Coffee Mug",
    "Water Bottle",
    "Dinner Set",
    "Electric Kettle",
    "Mixer Grinder",
    "Toaster",
    "Microwave Oven",
    "Air Fryer",
    "Ceiling Fan",
    "Table Fan",
    "LED Bulb",
    "Bed Sheet",
    "Pillow",
    "Blanket",
    "Curtains",
    "Towel Set",
    "Floor Mat",
    "Football",
    "Cricket Bat",
    "Cricket Ball",
    "Badminton Racket",
    "Tennis Racket",
    "Yoga Mat",
    "Skipping Rope",
    "Dumbbells",
    "Gym Bag",
    "Bicycle",
    "Car Cleaning Kit",
    "Mobile Stand",
    "Phone Cover",
    "Screen Protector",
    "Tripod Stand",
    "Ring Light",
    "Webcam",
    "Microphone",
    "Router",
    "Hard Drive",
    "Pen Drive",
    "Memory Card",
    "Printer",
    "Calculator",
    "Alarm Clock",
    "Wall Clock",
    "Travel Bag",
    "School Shoes",
    "Rain Coat",
    "Umbrella",
    "First Aid Kit",
    "Torch"
];
const categories = [
    "Electronics",
    "Clothing",
    "Books",
    "Home",
    "Sports"
];
const products = [];
for (let i = 0; i < 100; i++) {
    products.push({
        id: i + 1,
        name: productNames[i],
        price: (i + 1) * 100,
        category: categories[i % categories.length],
        available: i % 3 !== 0
    });
}
app.get("/", (req, res) => {
    res.send("Product REST API is running. Visit /products to see all products.");
});
app.get("/products", (req, res) => {
    res.json({
        total: products.length,
        products: products
    });
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

    if (!name || price === undefined || !category) {
        return res.status(400).json({
            message: "Name, price and category are required"
        });
    }

    const newProduct = {
        id: products.length + 1,
        name: name,
        price: price,
        category: category,
        available: available ?? true
    };

    products.push(newProduct);

    res.status(201).json({
        message: "Product created successfully",
        product: newProduct
    });
});
app.put("/products/:id", (req, res) => {
    const id = Number(req.params.id);

    const product = products.find((item) => item.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    if (req.body.name !== undefined) {
        product.name = req.body.name;
    }

    if (req.body.price !== undefined) {
        product.price = req.body.price;
    }
    if (req.body.category !== undefined) {
        product.category = req.body.category;
    }
    if (req.body.available !== undefined) {
        product.available = req.body.available;
    }
    res.json({
        message: "Product updated successfully",
        product: product
    });
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
        message: "Product deleted successfully",
        product: deletedProduct[0]
    });
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});

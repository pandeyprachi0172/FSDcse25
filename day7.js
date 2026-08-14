import fs from "fs/promises";

const fileName = "student.txt";

async function createFile() {
    try {
        const result = await fs.writeFile(
            fileName,
            "Name: Prachi Pandey\nEmail: pandeyprachi0172@gmail.com"
        );

        return result;
    } catch (error) {
        console.log("Error writing file:", error);
    }
}

createFile();
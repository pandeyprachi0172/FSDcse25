const http = require("http");
const fs = require("fs");
const PORT = 3000;
const fileName = "students.json";
function readStudents() {
    if (!fs.existsSync(fileName)) {
        fs.writeFileSync(fileName, "[]");
    }
    const data = fs.readFileSync(fileName, "utf8");

    if (data.trim() === "") {
        return [];
    }

    return JSON.parse(data);
}
function saveStudents(students) {
    fs.writeFileSync(
        fileName,
        JSON.stringify(students, null, 2)
    );
}
function showHomePage(res) {
    const page = `
<!DOCTYPE html>
<html>
<head>
    <title>Student Records</title>
</head>
<body>

    <h1>Student Record System</h1>

    <p>Welcome to the Student Record Application</p>

    <form action="/add-student" method="POST">

        <label>Student Name:</label>
        <input type="text" name="name" required>
        <br><br>

        <label>Roll Number:</label>
        <input type="text" name="rollNumber" required>
        <br><br>

        <label>Course:</label>
        <input type="text" name="course" required>
        <br><br>

        <label>Email:</label>
        <input type="email" name="email" required>
        <br><br>

        <button type="submit">Add Student</button>

    </form>

    <br>

    <a href="/students">View Student Records</a>

</body>
</html>
`;

    res.writeHead(200, {
        "Content-Type": "text/html"
    });

    res.end(page);
}

function showStudents(res) {
    const students = readStudents();

    let records = "";

    if (students.length === 0) {
        records = "<p>No student records available.</p>";
    } else {
        students.forEach((student, index) => {
            records += `
                <div>
                    <h3>Student ${index + 1}</h3>
                    <p>Name: ${student.name}</p>
                    <p>Roll Number: ${student.rollNumber}</p>
                    <p>Course: ${student.course}</p>
                    <p>Email: ${student.email}</p>
                </div>
                <hr>
            `;
        });
    }

    const page = `
<!DOCTYPE html>
<html>
<head>
    <title>Student Records</title>
</head>
<body>

    <h1>Student Records</h1>

    ${records}

    <a href="/">Add New Student</a>

</body>
</html>
`;

    res.writeHead(200, {
        "Content-Type": "text/html"
    });

    res.end(page);
}

function addStudent(req, res) {
    let formData = "";

    req.on("data", (chunk) => {
        formData += chunk.toString();
    });

    req.on("end", () => {
        const values = new URLSearchParams(formData);

        const student = {
            name: values.get("name"),
            rollNumber: values.get("rollNumber"),
            course: values.get("course"),
            email: values.get("email")
        };

        const students = readStudents();

        students.push(student);

        saveStudents(students);

        res.writeHead(302, {
            Location: "/students"
        });

        res.end();
    });
}

const server = http.createServer((req, res) => {

    if (req.method === "GET" && req.url === "/") {
        showHomePage(res);
    }

    else if (req.method === "GET" && req.url === "/students") {
        showStudents(res);
    }

    else if (req.method === "POST" && req.url === "/add-student") {
        addStudent(req, res);
    }

    else {
        res.writeHead(404, {
            "Content-Type": "text/html"
        });

        res.end("<h1>404 - Page Not Found</h1>");
    }
});

server.listen(PORT, () => {
    console.log("Student Record Server is running on port 3000");
});

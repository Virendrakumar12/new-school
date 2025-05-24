const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require('http');
const socketIO = require('socket.io');
const messageRoutes = require('./routes/messageRoutes');
const socketLogic = require('./socket/socket');
const authSchool = require("./routes/schoolRoutes");
const classRoutes = require("./routes/classRoutes");
const sectionRoutes = require("./routes/sectionRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const parentRoutes = require("./routes/parentRoutes");
const studentRoutes = require("./routes/studentRoutes");
const feeRoutes =require("./routes/feeRoutes")
dotenv.config({});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  'http://localhost:3000',
  'https://new-school-5kv1.vercel.app',
  'https://www.sunriseinternationalpublicschool.in'
];
const corsOptions = {
    origin:function (origin, callback) {
    if (!origin) return callback(null, true); // Allow non-browser requests (like Postman)
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};




app.use(cors(corsOptions));  // ✅ Apply CORS for REST API

const server = http.createServer(app);
const io = socketIO(server, {
    cors: corsOptions,
});

main().then(() => {
    console.log("connected to db");
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGO_URI);
}
const port =process.env.PORT ||8081;
app.use("/api/school", authSchool);
app.use("/api/class", classRoutes);
app.use("/api/section", sectionRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/subject", subjectRoutes);
app.use("/api/parent", parentRoutes);
app.use("/api/student", studentRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/fees', feeRoutes); 
// Initialize socket logic

socketLogic(io);

app.get("/", (req, res) => {
    res.send("hello");
});

server.listen(port, () => {
    console.log(`server is running on port ${port}`);
});


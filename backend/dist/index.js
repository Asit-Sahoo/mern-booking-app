"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = __importDefault(require("./routes/users"));
const auth_1 = __importDefault(require("./routes/auth"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
mongoose_1.default.connect(process.env.MONGODB_CONNECTION_STRING);
// .then(()=>
//   console.log(
//     "connected to database ",
//     process.env.MONGODB_CONNECTION_STRING
//   )
// );
// catch(e){
//     console.log(e);
// }
// const DB_PATH='mongodb+srv://asitsahoo3921:aUt9AYAawMiqbiNA@cluster0.t6dk2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
// mongoose.connect(DB_PATH);
const com = mongoose_1.default.connection;
com.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});
com.once('open', () => {
    console.log('MongoDB connected successfully');
});
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//app.use(cors());
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL, // Replace with your client's origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));
// app.get("/api/user",userRoutes,async(req:Request,res:Response)=>{
//         res.json({message:"hello from asit endpoints"});
// });
// app.use(express.static(path.join(__dirname, "../../frontend/dist")));
app.use("/api/auth", auth_1.default);
app.use("/api/users", users_1.default);
app.listen(7000, () => {
    console.log("serevr is running on localhost:7000");
});

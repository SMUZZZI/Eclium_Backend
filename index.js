import express from "express"
import mongoose from "mongoose"
import multer from "multer"
import cors from "cors"
import checkAuth from "./utils/checkAuth.js"


import userRouter from './routes/user.routes.js'
import songRouter from './routes/songs.routes.js'

const PORT = process.env.PORT || 5000

mongoose.connect("mongodb+srv://smuzzzzzzi:Gp4aOsfLnySvmwVS@eclium.ricvrfw.mongodb.net/App?retryWrites=true&w=majority")
        .then(() => console.log("DB ok"))
        .catch((err) => console.log("DB error", err));

const app = express()

// app.all('/', function (req, res, next) {
//         res.header("Access-Control-Allow-Origin", "*");
//         res.header("Access-Control-Allow-Headers", "X-Requested-With");
//         next();
// });

const storage = multer.diskStorage({
        destination: (_, __, cb) => {
                cb(null, "uploads");
        },
        filename: (_, file, cb) => {
                cb(null, file.originalname);
        },
})
const upload = multer({ storage })

app.post("/upload", checkAuth, upload.single("file"), (req, res) => {
        res.json({
                url: `/uploads/${req.file.originalname}`
        })
})

app.use(express.json())

app.use(cors({
        origin: '*'
}))

app.use("/uploads", express.static("uploads"))

app.use("/api", userRouter)
app.use("/api", songRouter)


app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`))
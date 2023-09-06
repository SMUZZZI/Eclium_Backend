import express from "express"
import mongoose from "mongoose"
import multer from "multer"
import cors from "cors"

const PORT = process.env.PORT || 5000

mongoose.connect("mongodb+srv://smuzzzzzzi:Gp4aOsfLnySvmwVS@eclium.ricvrfw.mongodb.net/app?retryWrites=true&w=majority")
        .then(() => console.log("DB ok"))
        .catch((err) => console.log("DB error", err));

const app = express()

const storage = multer.diskStorage({
        destination: (_, __, cb) => {
                cb(null, "uploads");
        },
        filename: (_, file, cb) => {
                cb(null, file.originalname);
        },
})

const upload = multer({ storage })

app.post("/upload", upload.single("file"), (req, res) => {
        res.json({ 
                url: `/uploads/${req.file.originalname}`
        })
})

app.use(express.json())
app.use(cors())

app.use("/uploads", express.static("uploads"))

app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`))
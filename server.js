require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(fileupload({
    useTempFiles: true
}));

// Routes
app.use('/user', require('./routes/userRouter'));
app.use('/api', require('./routes/categoryRouter'));
app.use('/api', require('./routes/upload'));

app.post('/upload', (req, res) => {
    if (req.files === null) {
        return res.status(400).json({msg: "No File Upload."});
    }

    const file = req.files.file;
    const file_name = new Date().getTime()+file.name;
    file.mv(`${__dirname}/client/public/uploads/${file_name}`, err => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
        res.json({fileName: file_name, filePath: `/uploads/${file_name}`});
    });
});

// Connect to mongodb
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw err;
    console.log('Connected to MongoDB');
});

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


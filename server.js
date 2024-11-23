const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;
const secret = process.env.CONVERTAPI_SECRET;

const convertapi = require('convertapi')(secret);
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/converted', express.static(path.join(__dirname, 'converted')));


app.get('/', (req, res) => {
    res.sendFile('index.html').status(200);
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            return cb(new Error('Only .docx files are allowed!'), false);
        }
        cb(null, true);
    },
});

app.post('/upload', upload.single('file'), async (req, res) => {
    const file = req.file;

    if (!file) {
        return res.status(400).json({ error: 'No file uploaded!' });
    }

    try {
        const inputPath = path.join(__dirname, file.path);
        const outputFileName = file.originalname.replace('.docx', '.pdf');
        const outputPath = path.join(__dirname, 'converted', outputFileName);

        if (!fs.existsSync(path.join(__dirname, 'converted'))) {
            fs.mkdirSync(path.join(__dirname, 'converted'));
        }

        await convertapi.convert('pdf', { File: inputPath })
            .then(function(result) {
                console.log("Converted file url: " + result.file.url);
                result.file.save(path.join(outputPath));
            })
            .catch(function(e) {
                console.error(e.toString());
            });

        const stats = fs.statSync(inputPath);
        const metadata = {
            fileName: file.originalname,
            fileSize: stats.size,
            uploadDate: stats.birthtime,
        };

        res.json({
            metadata,
            link: `/converted/${outputFileName}`,
        });
    } catch (error) {
        res.status(500).json({ error: 'File conversion failed!', details: error.message });
    }
});

app.get('/download/:fileName', (req, res) => {
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, 'converted', fileName);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'File not found!' });
    }

    res.download(filePath);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
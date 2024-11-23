# DOCX to PDF Converter Web Application

## Description
This application allows users to upload `.docx` files, view their metadata, and download the files in `.pdf` format. It provides a simple and user-friendly interface for document conversion.

---

## Features
- **Upload DOCX Files:** Users can upload `.docx` files from their local machine.
- **View Metadata:** The application displays file metadata such as:
  - File Name
  - File Size
  - Upload Date
- **Download Converted PDF:** After conversion, users can download the `.pdf` version of their uploaded file.

---

## How to Install and Run the Application

### 1. Install Dependencies
Ensure you have Node.js installed, then run:
```bash
npm install
```
### 2. Start Server
Ensure you have Node.js installed, then run:
```bash
npm start
```
## Usage

1. Open the application in your browser at [http://localhost:3000](http://localhost:3000).
2. Upload a `.docx` file using the provided form.
3. View the file's metadata, including:
   - File Name
   - File Size
   - Upload Date
4. Download the converted `.pdf` file using the provided download link.
## Technologies Used

### Backend

- **Node.js**: Runtime environment for building scalable applications.
- **Express.js**: Web framework for handling HTTP requests and middleware.
- **Multer**: Middleware for handling file uploads.
- **ConvertAPI**: External API for DOCX-to-PDF file conversion.

### Frontend

- **HTML**: Structure of the user interface.
- **CSS**: Styling for a responsive and clean design.
- **JavaScript**: Adds interactivity to the application.

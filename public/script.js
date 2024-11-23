document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a .docx file!');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('File upload failed!');
        }

        const result = await response.json();

        // Display metadata
        document.getElementById('fileName').textContent = result.metadata.fileName;
        document.getElementById('fileSize').textContent = result.metadata.fileSize;
        document.getElementById('uploadDate').textContent = new Date(result.metadata.uploadDate).toLocaleString();

        document.getElementById('metadata').style.display = 'block';

        // Set download link
        const downloadLink = document.getElementById('downloadLink');
        downloadLink.href = result.link;
        downloadLink.textContent = `Download ${result.metadata.fileName.replace('.docx', '.pdf')}`;
        document.getElementById('downloadSection').style.display = 'block';
    } catch (error) {
        alert(error.message);
    }
});

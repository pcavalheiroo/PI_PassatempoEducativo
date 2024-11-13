// Salvar o texto editado
document.getElementById('saveText').addEventListener('click', function () {
    const newText = document.getElementById('editableText').innerText;

    // Enviar o novo texto via requisição AJAX
    fetch('/save-text', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: newText })
    })
        .then(response => response.json())
        .then(data => {
            alert('Texto salvo com sucesso!');
        })
        .catch(error => {
            console.error('Erro ao salvar o texto:', error);
        });
});

// Upload de imagem
document.getElementById('uploadForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData();
    const fileField = document.getElementById('imageUpload').files[0];

    formData.append('image', fileField);

    // Enviar a imagem via fetch
    fetch('/upload-image', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('currentImage').src = data.newImagePath;
            alert('Imagem alterada com sucesso!');
        })
        .catch(error => {
            console.error('Erro ao fazer upload da imagem:', error);
        });
});
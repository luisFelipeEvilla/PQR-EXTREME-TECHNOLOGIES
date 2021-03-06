const bcrypt = require('bcryptjs');

const helpers = {}

helpers.encrypPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

helpers.mathPassword = async (password, savedPassword) => {
    try {
        return await bcrypt.compare(password, savedPassword);
    } catch (err) {
        console.log(err);
    }
}

helpers.convertToPdf = () => {
    const html2pdf = require('html2pdf.js');


const $boton = document.querySelector('#pdfBtn');
$boton.addEventListener('click', () => {
    console.log("click");
    const $elementoParaConvertir = document.querySelector('#pqr')
    html2pdf()
    .set({
        margin: 1,
        filename: 'documento.pdf',
        image: {
            type: 'jpeg',
            quality: 0.98
        },
        html2canvas: {
            scale: 3, // A mayor escala, mejores gráficos, pero más peso
            letterRendering: true,
        },
        jsPDF: {
            unit: "in",
            format: "a3",
            orientation: 'portrait' // landscape o portrait
        }
    })
    .from($elementoParaConvertir)
    .save()
    .catch(err => console.log(err));
})
}

module.exports = helpers;
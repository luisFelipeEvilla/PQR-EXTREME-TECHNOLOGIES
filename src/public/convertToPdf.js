const $boton = document.querySelector('#pdfBtn');
$boton.addEventListener('click', () => {
    const $elementoParaConvertir = document.querySelector('#pqr')
    html2pdf()
    .set({
        margin: 1,
        filename: 'pqr.pdf',
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


function getColorPallate(hex, mode) {
    return fetch(`https://www.thecolorapi.com/scheme?hex=${hex}&mode=${mode}`)
        .then(res => res.json())
        .then(data => {
            const colorPallate = data.colors;
            const colorPallateHtml = colorPallate.map(color => `
                <div class="color" data-hex="${color.hex.value}">
                    <div class="color-fill" style="background-color: ${color.hex.value}"></div>
                    <p>${color.hex.value}</p>
                </div>
            `).join('');
            document.getElementById('color-pallate').innerHTML = colorPallateHtml;

            document.querySelectorAll('.color').forEach(colorElement => {
                colorElement.addEventListener('click', function() {
                    const hexValue = this.dataset.hex;
                    copyToClipboard(hexValue);
                });
            });
        });
}

document.getElementById('generate-button').addEventListener('click', function() {
    const hex = document.getElementById('color-selector').value.replace('#', '');
    const mode = document.getElementById('mode-selector').value;

    getColorPallate(hex, mode);
});

function copyToClipboard(hexValue) {
    navigator.clipboard.writeText(hexValue)
        .then(() => {
            const popup = document.getElementById('copy-color-popup')
            popup.textContent = `${hexValue} copied to clipboard!`
            popup.style.visibility = 'visible'
            setTimeout(() => {
                popup.style.visibility = 'hidden'
            }, 2000);
        })
        .catch(err => {
            console.error('Could not copy text: ', err);
        });
}

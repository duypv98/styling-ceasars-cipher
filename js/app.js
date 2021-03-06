const theKey = document.getElementById('shift-key');
const inputText = document.getElementById('input-text');
const resultText = document.getElementById('result-text');
const format = document.getElementById('format-text');
const eodChoice = document.getElementById('choice');
const key = document.getElementById('key');
const modal = document.getElementById('notice-modal');
const closeBtn = document.getElementById('close-btn');
const modeBtn = document.getElementById('mode-btn');

const FORMAT_MODE = {
    cancerous: 'c',
    normal: 'n'
}

let formatModeValue = FORMAT_MODE.cancerous;

function updateShiftKey(val) { theKey.value = val; }
function getCode() {
    if (inputText.value === null || inputText.value === "" || !inputText.value) {
        modal.style.display = "block";
        return;
    }
    const eod = eodChoice.value;
    const shiftKey = eod === 'encode' ? parseInt(theKey.value) : parseInt(theKey.value) * - 1;
    const txt = inputText.value;
    const x = [];

    for (let i = 0; i < txt.length; i++) {
        x[i] = txt.charCodeAt(i) + shiftKey;
        if (txt.charCodeAt(i) >= 65 && txt.charCodeAt(i) <= 90) {
            if (x[i] >= 65 && x[i] <= 90) {
                x[i] = x[i];
            }
            else if (x[i] > 90) {
                x[i] -= 26;
            }
            else if (x[i] < 65) {
                x[i] += 26;
            }
        }
        if (txt.charCodeAt(i) === 32 || txt.charCodeAt(i) < 65 || txt.charCodeAt(i) > 122
            || (txt.charCodeAt(i) >= 91 && txt.charCodeAt(i) <= 96)) {
            x[i] = txt.charCodeAt(i);
        }
        if (txt.charCodeAt(i) >= 97 && txt.charCodeAt(i) <= 122) {
            if (x[i] >= 97 && x[i] <= 122) {
                x[i] = x[i];
            }
            else if (x[i] > 122) {
                x[i] -= 26;
            }
            else if (x[i] < 97) {
                x[i] += 26;
            }
        }
    }
    resultText.value = String.fromCharCode.apply(null, x);
    if (formatModeValue === FORMAT_MODE.normal) {
        format.innerHTML = 'Normal';
        format.setAttribute('style', 'color: green;');
        modeBtn.setAttribute('class', 'btn btn-warning btn-lg');
        modeBtn.innerHTML = 'F*ck Text';
        formatModeValue = FORMAT_MODE.cancerous;
    };
    modeBtn.disabled = false;
}

closeBtn.onclick = () => {
    modal.style.display = "none";
}
window.onclick = (event) => {
    if (event.target === modal) modal.style.display = "none";
}
window.onkeydown = (event) => {
    if (event.keyCode === 27) modal.style.display = "none"; // Hit ESC to close the modal
}

function cancerous() {
    if (inputText.value === null || inputText.value === "" || !inputText.value) {
        modal.style.display = "block";
        return;
    }

    if (formatModeValue === FORMAT_MODE.cancerous) {
        resultText.value = change(resultText.value);
        format.innerHTML = 'Cancerous';
        format.setAttribute('style', 'color: red;');
        modeBtn.innerHTML = 'Normalize';
        modeBtn.setAttribute('class', 'btn btn-success btn-lg');
        formatModeValue = FORMAT_MODE.normal;
    } else if (formatModeValue === FORMAT_MODE.normal) {
        getCode();
        modeBtn.innerHTML = 'F*ck Text';
        modeBtn.setAttribute('class', 'btn btn-warning btn-lg');
        formatModeValue = FORMAT_MODE.cancerous;
    }
}

function change(str) {
    const cancerousStr = str.toLowerCase().split('');
    for (let i = 0; i < cancerousStr.length; i++) {
        if (i % 2 != 0) {
            cancerousStr[i] = cancerousStr[i].toUpperCase();
        }
    }
    return cancerousStr.join('');
}

function resetValue() {
    inputText.value = "";
    resultText.value = "";
    theKey.value = 0;
    key.value = 0;
    modeBtn.value = 'C';
    modeBtn.innerHTML = 'F*ck Text';
    modeBtn.disabled = true;
}
const btnTranslate = document.querySelector('#btn-translate');
const translateInput = document.querySelector('#translate-input');
const alertContainer = document.querySelector('.alert');
const btnClose = document.querySelector('.close-btn');
const msg = document.querySelector('.msg');
const translateOutput = document.querySelector('#translate-output');

const url = "https://api.funtranslations.com/translate/ferb-latin.json";

function constructURL(inputText) {
    const encodedURI = encodeURI(inputText);
    return `${url}?text=${encodedURI}`;
}

function errorHandler(error) {
    showAlert();
    msg.innerText = error;
}

function addBackgroundAnimation() {
    translateOutput.innerText = '';
    translateOutput.classList.add('animation');
    translateOutput.addEventListener('animationend', () => {
        translateOutput.classList.remove('animation');

    });
}


function showAlert() {
    alertContainer.classList.add('show');
    alertContainer.classList.remove('hide');
    alertContainer.classList.add('showAlert');
    setTimeout(function () {
        closeAlert();
    }, 4000);
};

function closeAlert() {
    alertContainer.classList.remove('show');
    alertContainer.classList.add('hide');
}

async function clickEventHandler(event) {
    const translateInputValue = translateInput.value;
    const finalURL = constructURL(translateInputValue);

    if (translateInputValue == '') {
        showAlert()
        msg.innerText = 'Please enter text you want to translate.'
        return;
    }
    
    addBackgroundAnimation();

    try {
        const response = await fetch(finalURL);
        const json = await response.json();   
        if (response.ok) {
            translateOutput.innerText = json.contents.translated;
        } else {        
            throw new Error(`${json.error.code} - ${json.error.message}`);
        }
    } catch (err) {
        errorHandler(err);
    }
};

btnTranslate.addEventListener('click', clickEventHandler);

btnClose.addEventListener('click', closeAlert);
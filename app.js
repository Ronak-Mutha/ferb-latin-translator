const btnTranslate = document.querySelector('#btn-translate');
const translateInput = document.querySelector('#translate-input');
const translateOutput = document.querySelector('#translate-output');


function addBackgroundAnimation() {
    translateOutput.innerText = '';
    translateOutput.classList.add('animation');
    translateOutput.addEventListener('animationend', () => {
        translateOutput.classList.remove('animation');
        clickEventHandler();
    });
}

const url = "https://api.funtranslations.com/translate/ferb-latin.json";

function constructURL(inputText) {
    const encodedURI = encodeURI(inputText);
    return `${url}?text=${encodedURI}`;
}

async function clickEventHandler(event) {
    console.log("button clicked");
    const translateInputValue = translateInput.value;
    const finalURL = constructURL(translateInputValue);

    if (translateInputValue == "") {
        alert("Please enter some text");
        return;
    }

    function errorHandler(error) {
        console.log("something's fishy?", error);
        alert("something's fishy? try again later")
    }

    try {
        const response = await fetch(finalURL);
        console.log(response);
        if (response.ok) {
            const json = await response.json();
            console.log(json)
            translateOutput.innerText = json.contents.translated;
        } else {
            throw new Error('Request failed.');
        }
    } catch (err) {
        console.log(errorHandler(err));
    }
};

btnTranslate.addEventListener('click', addBackgroundAnimation);
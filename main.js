let langoption = document.querySelectorAll('select');
let fromText  = document.querySelector('.fromText');
let toText = document.querySelector('.toText');
let codeLen = document.querySelector('.code_len');
let fromAudio = document.querySelector('.from-audio');
let toAudio = document.querySelector('.to-audio');
let copyBtn = document.querySelector('.copy-translation');

langoption.forEach((select, index) => {
    for (let countrycode in language) {
        let selected = '';
        if (index === 0 && countrycode === 'en-GB') {
            selected = 'selected';
        } else if (index === 1 && countrycode === 'bn-IN') {
            selected = 'selected';
        }
        let option = `<option value="${countrycode}" ${selected}>${language[countrycode]}</option>`;
        select.insertAdjacentHTML('beforeend', option);
    }
});

fromText.addEventListener('input', () => {
    let content = fromText.value;
    let fromLang = langoption[0].value;
    let toLang = langoption[1].value;

    let translink = `https://api.mymemory.translated.net/get?q=${content}!&langpair=${fromLang}|${toLang}`;
    fetch(translink)
        .then(response => response.json())
        .then(data => {
            if (data.responseData.translatedText) {
                toText.value = data.responseData.translatedText;
            }
        });

    codeLen.textContent = `${content.length}/5,000`;
});

const speakText = (text, lang) => {
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    speechSynthesis.speak(utterance);
};

fromAudio.addEventListener('click', () => {
    let content = fromText.value;
    let fromLang = langoption[0].value;
    speakText(content, fromLang);
});

toAudio.addEventListener('click', () => {
    let content = toText.value;
    let toLang = langoption[1].value;
    speakText(content, toLang);
});

copyBtn.addEventListener('click', () => {
    toText.select();
    document.execCommand('copy');
});

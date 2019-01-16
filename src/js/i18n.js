// ***************************************
// Translation proccess
// ***************************************

// Get all translatable elements
var i18nElems = document.getElementsByClassName('i18n');

// Translate STRINGS
function translateStrings() {
  // Create path to appropriate translation file
  var translationPath = 'assets/locales/' + lang + '/' + lang + '.json';
  // Replace translatable elems inner text with new translated text
  function jsonReqListener(e) {
    translation = JSON.parse(this.responseText);
    // console.log('Loaded translation: ' + this.responseText);
    for (var i = 0; i < i18nElems.length; i++) {
      for (var key in translation) {
        if (i18nElems[i].id == key) {
          i18nElems[i].innerHTML = translation[key];
        };
      };
    };
  };
  // Get appropriate translation file
  var translation;
  var jsonReq = new XMLHttpRequest();
  jsonReq.open('get', translationPath, true);
  jsonReq.onload = jsonReqListener;
  jsonReq.onerror = function(e) {
    console.error(jsonReq.statusText);
  };
  jsonReq.send(null);
};

// Translate HTML
function translateElements() {
  // Create path to appropriate translation file
  var translationElementsPath = 'assets/locales/' + lang + '/' + lang + '.html';
  // Add inside translatable elems new translated html
  function elementsReqListener(e) {
    translationElements = this.responseXML;
    for (var i = 0; i < i18nElems.length; i++) {
      var translatedElem = translationElements.getElementById(i18nElems[i].id);
      if (translatedElem) {
        // console.log(translatedElem);
        i18nElems[i].innerHTML = translatedElem.innerHTML;
      };
    };
  };
  // Get appropriate translation file
  var translationElements;
  var elementsReq = new XMLHttpRequest();
  elementsReq.open('get', translationElementsPath, true);
  elementsReq.onload = elementsReqListener;
  elementsReq.onerror = function(e) {
    console.error(elementsReq.statusText);
  };
  elementsReq.responseType = 'document';
  elementsReq.send(null);
}

// ***************************************
// Default language
// ***************************************

// Set default lang English
var lang = 'en';
// console.log('Default language: ' + lang);
// Translate
// translateStrings();
// translateElements();

// ***************************************
// Add click listener to lang switchers
// ***************************************

var langBtns = document.getElementsByClassName('i18n-switcher-btn');
function changeLang() {
  // Get lang btns wrapper
  var langBtnsWrapper = document.getElementById('i18n-switcher');
  // console.log(langBtnsWrapper);
  // Get selected lang btn
  var selectedLangBtn;
  if (event.target.classList.contains('i18n-switcher-btn')) {
    selectedLangBtn = event.target;
  } else {
    selectedLangBtn = event.srcElement.parentElement;
  };
  // Change flags
  langBtnsWrapper.insertBefore(selectedLangBtn, langBtnsWrapper.firstChild);
  // Check if lang is already selected
  if (selectedLangBtn.classList.contains('selected-lang')) {
    return false;
  } else {
    // Remove actve state from previous langBtns
    for (var i = 0; i < langBtns.length; i++) {
      langBtns[i].classList.remove('selected-lang');
    };
    // Add active state to currently selected langBtn
    selectedLangBtn.classList.add('selected-lang');
    // Change lang
    lang = selectedLangBtn.id;
    // console.log('Changed language: ' + lang);
    // Translate
    translateStrings();
    translateElements();
  };
};
for (var i = 0; i < langBtns.length; i++) {
  // Change language on click
  langBtns[i].addEventListener('click', changeLang, false);
};

// GLOBAL
const showButton = document.getElementById('show-button');
const userInput = document.getElementById('user-number');
const outputContainer = document.getElementById('output-container'); 
const baseUrl = 'http://numbersapi.com/';

// ASYNC FUNCTION
const getSuggestions = async (url) => {
  cleanOutputContainer();
  addLoadingIcon();
  try {
    const response = await fetch(url);

    if (response.ok) {
      const jsonResponse = await response.json();
      cleanOutputContainer();
      addOutput(jsonResponse.text);
    }
  } catch(error) {
    console.log(error);
    cleanOutputContainer();
    addOutput(';( Something went wrong...');
  }
}

// APP FUNCTIONS
const getRadioValue = () => {
  const triviaRadio = document.getElementById('trivia');
  const mathRadio = document.getElementById('math');
    if (triviaRadio.checked) {
      return triviaRadio.value;
    }
    if (mathRadio.checked) {
      return mathRadio.value;
    }
}

const createRequest = (number, type) => {
  if (number) {
    return `${baseUrl}${number}/${type}?json`;
  }
  // If user input is empty, API will use random number.
  if (!number) {
    return `${baseUrl}random/${type}?json`;
  }
}

// DOM MANIPULATION
const addLoadingIcon = () => {
  const newDiv = document.createElement('div');
  newDiv.setAttribute('id', 'load-icon');
  outputContainer.append(newDiv);
}

const addOutput = str => {
  const newPharagraph = document.createElement('p');
  newPharagraph.setAttribute('id', 'output-text');
  newPharagraph.textContent = str;
  outputContainer.append(newPharagraph);
}

const cleanOutputContainer = () => {
  outputContainer.innerHTML = '';
}

//EVENT LISTENER
showButton.addEventListener('click', () => {
  const inputValue = userInput.value;
  const checkedRadio = getRadioValue();
  const url = createRequest(inputValue, checkedRadio);
  getSuggestions(url);
});
const output = document.querySelector("#output")
const talkBtn = document.querySelector("#talk-btn")
const translateBtn = document.querySelector("#translate-btn")
const input = document.querySelector("#input")
const serverURL = "https://api.funtranslations.com/translate/groot.json"

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;

talkBtn.addEventListener('click',()=>{
    input.value = '';
    recognition.start();
})



recognition.addEventListener("result", (e) => {
    console.log(e)
  const current = e.resultIndex;
  const transcript = e.results[current][0].transcript
  console.log("transcript: ",transcript)
  if(e.results[current].isFinal){
    input.value += transcript;
  }
})

function getTranslationURL(input) {
  console.log(`${serverURL}?text=${input}`)
  return `${serverURL}?text=${input}`
}

function errorHandler(error) {
  console.log("error occured", error);
  alert("something wrong with server! try again after some time")
}


translateBtn.addEventListener('click',()=>{
  const inputText = input.value;  
  recognition.stop();
  if(inputText === '')
        alert("Please Enter the text to be translated");
  // calling server for processing
  fetch(getTranslationURL(inputText))
  .then(response => response.json())
  .then(json => {
      const translatedText = json.contents.translated;
      output.innerText = translatedText; // output
     })
  .catch(errorHandler)

})
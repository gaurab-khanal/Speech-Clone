// Initializing variables for Speech to Text
let text = document.querySelector('textarea');
let text_value = text.value;
let mic = document.getElementById('mic');
let p = document.querySelector('p');


//Set a new SpeechRecognition Object/ Initilize
let sp = window.webkitSpeechRecognition || window.speechRecognition;
let spRec = new sp();
spRec.continuous = true;
spRec.interimResult = true;

//Speech To Text Starts--------------

// Set language of speech Recognition
spRec.lang = 'en-US';


// When mouse is clicked::
mic.addEventListener('mousedown', (event) => {
  p.innerHTML = "Listeining...";
  spRec.start();
});

spRec.onresult = res => {
  let Text = Array.from(res.results).map(r => r[0]).map(txt => txt.transcript).join("");
  text.innerHTML = Text;
}

// Speech to Text ends


const form = document.querySelector('form');

mic.addEventListener('mouseup', async(e)=>{
  e.preventDefault();
  const data = new FormData(form);
  p.innerHTML = 'Hold mic To Speak';
  const response = await fetch('http://localhost:8080/dream',{
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: data.get('prompt'),
    }),
  });

  const { completeText } = await response.json();
  text.value = completeText;

  // text to speech starts
  spRec.stop();
  setTimeout(() => {
    let voices;
    if ("speechSynthesis" in window) {
      speechSynthesis.onvoiceschanged = () => {
        voices = speechSynthesis.getVoices()[10];

      }
      let tts = new SpeechSynthesisUtterance();
      tts.text = completeText;
      tts.voice = voices;
      tts.rate = 0.9;
      speechSynthesis.cancel();
      speechSynthesis.speak(tts);

    }
    else {
      alert("Unsupported")
    }
  }, 1000);
  
  
})

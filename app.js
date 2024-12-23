const btn = document.querySelector('.talk')
const content = document.querySelector('.content')


function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);

    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    var day = new Date();
    var hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Good Morning Sir...")
    }

    else if (hour > 12 && hour < 17) {
        speak("Good Afternoon Sir...")
    }

    else {
        speak("Good Evenining Sir...")
    }

}

window.addEventListener('load', ()=>{
    speak("Initializing Jarvis...");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());

}

btn.addEventListener('click', () => {
    content.textContent = "Listening...."
    
    recognition.start();

})
// Commands and Functions of Jarvis


function takeCommand(message) {
    // for basic greetings and small talks  
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Sir, How May I Help You?");
    }
    else if (message.includes("jarvis who am i") || message.includes("jarvis what is my name") || message.includes("jarvis what's my name")) {
        if (message.includes('my name')) {
            speak("Your name is Rohit singh");

        }
        else {
            speak("You are My master, Rohit");
        }
    }
    // for opening something (any website) on the browser 
    else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...")
    }
    else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening Youtube...")
    }
    else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...")
    }

    else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what i found on internet regarding " + message;
        speak(finalText);

    }
    // for the date and time
    else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" })
        const finalText = time;
        speak(finalText);
    }

    else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" })
        const finalText = date;
        speak(finalText);
    }

    else if (message.includes('calculator')) {
        window.open('Calculator:///')
        speak("Opening calculator");
    }
    else if (message.includes('good night jarvis') || message.includes('thank you')) {
        if (message.includes('thank you')) {
            speak("you are most welcome sir..");
        }
        else {
            speak("Good Night sir");
            speak("I am sleeping now");
        }
    }
    // for shutting down 
    else if (message.includes('shutdown jarvis')) {
        speak("shutting down sir");
        window.close();
    }

    // for playing songs
    else if (message.includes('play the song')) {
        if (message.includes(' what went wrong')) {
            speak("Playing what went wrong by Kid laroi");
            window.open(`https://www.youtube.com/watch?v=48t_4o2mMkQ`, "_blank");
        }
        else if (message.includes(' raro') || message.includes(' raaro')) {
            speak("playing raaro by chinoi nacho");
            window.open(`https://www.youtube.com/watch?v=Zj6f_JQLcyY`, "_blank");

        }
    }
    // searching on youtube 

    else if(message.includes("youtube search") || message.includes("youtube type")){
        window.open(`https://www.youtube.com/search?q=${message.replace("youtube search", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on youtube";
        speak(finalText);
    }

    // for anything else we will send it to google
    else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on google";
        speak(finalText);
    }
}
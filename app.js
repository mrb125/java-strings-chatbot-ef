let lessons = [];
let currentLessonIndex = 0;

async function init() {
    const response = await fetch('lessons.json');
    lessons = await response.json();
    loadLesson(0);
}

function loadLesson(index) {
    if (index < 0 || index >= lessons.length) return;
    
    currentLessonIndex = index;
    const lesson = lessons[index];
    
    document.getElementById('lessonTitle').innerText = lesson.title;
    document.getElementById('theoryText').innerHTML = lesson.theory;
    document.getElementById('taskText').innerHTML = `<strong>Aufgabe:</strong> ${lesson.task}`;
    
    // Update buttons
    document.getElementById('prevBtn').disabled = (index === 0);
    document.getElementById('nextBtn').innerText = (index === lessons.length - 1) ? 'Fertig!' : 'Weiter';
    
    // Send code to IDE
    updateIDE(lesson.initialCode);
}

function updateIDE(code) {
    const ideFrame = document.getElementById('ideFrame');
    
    // We send the code via postMessage to the iframe
    // The iframe must be prepared to receive it
    if (ideFrame.contentWindow) {
        ideFrame.contentWindow.postMessage({ type: 'loadCode', code: code }, '*');
    }
}

function nextLesson() {
    if (currentLessonIndex < lessons.length - 1) {
        loadLesson(currentLessonIndex + 1);
    } else {
        alert("Super gemacht! Ralph ist stolz auf dich! 🍌");
    }
}

function prevLesson() {
    if (currentLessonIndex > 0) {
        loadLesson(currentLessonIndex - 1);
    }
}

// Initialisiere die App
init();

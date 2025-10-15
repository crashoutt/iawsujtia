// Paragraph split into parts
const paragraphParts = [
  "my baby, my princessss, my everything i love you so much, baby. i love spending time with you and hanging out with you, my love.",
  "you’re literally always on my mind, and i couldn’t wish for better. even though you say i hate you so much, call me a retard all the time, and tell me to die, i really do love you, my princess.",
  "and i will ALWAYS love you, i’ll never stop, even when we argue or get upset at each other whenever you get upset, i'll always be there to listen to you.",
  "that will never pull me apart from you. i hope you feel the same. whenever something happens, WE fix it and move on together, cause that’s what we do.",
  "i love how you are, your humor is the best. i feel like we have the same humor, and it’s perfect! EVEN though you spam “boi, boi, boi, shut up, boi”...",
  "i hope this relationship lasts forever cause i’m not going anywhere. you better not either, or i’ll find your house deadass.",
  "i love when we’re together, you’re my favorite person to hang out with. sometimes i just wanna hang out, me and you, cause it’s the best feeling talking to you.",
  "i feel like we got closer when we both age baited each other, ms. “18 year old”... alsooo i never said i was 19!! never happened, and you got no proof at all!",
  "You are such a good girlfriend genuinely, you’re so perfect, my love. You’re smart, funny, beautiful, pretty, and absolutely gorgeous. Whenever you feel down about anything, baby, I’m here for you. I’ll always listen to your problems and help you, my baby. You’re at the gym right now and not with me, and I miss you so much. I really do love you for the hundredth time and I’m not trolling, so stop saying that before I fuck the shit out of you!\n\n-your awesome husband"
];

// Quiz questions
const questions = [
  { type: "s", question: "What is my favorite thing about you?", answer: "when i yap" },
  { type: "s", question: "What do you always call me?", answer: "bigger" },
  { type: "mc", question: "What is my age? (don't get it wrong!)", options: ["19", "25", "17"], answer: "17" },
  { type: "mc", question: "Am I funny af or sped?", options: ["sped", "funny"], answer: "funny", wrongMessage: "wow... thats so sweet baby 😘, try again!" },
  { type: "s", question: "Who is my favorite person?", answer: "me" },
  { type: "s", question: "What are my favorite foods? (list with commas)", answer: "steak, lobster" },
  { type: "mc", question: "Is my rage bait hella good?", options: ["yes", "yes", "yes"], answer: "yes" },
  { type: "mc", question: "Who wears the pants in the relationship?", options: ["you", "me", "both"], answer: "you" },
  { type: "mc", question: "What is my favorite name to be called?", options: ["Daddy", "baby", "handsome", "sweet boy"], answer: ["handsome", "Daddy"] }
];

let currentIndex = 0;
let revealedParagraph = "";
let points = 0;

// Audio setup
const audio = new Audio("love.mp3");
audio.loop = false;
audio.volume = 0.5;

// Start quiz
function startQuiz() {
  document.getElementById("intro").classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");
  updatePoints();
  showQuestion();
}

// Show current question
function showQuestion() {
  const q = questions[currentIndex];
  const container = document.getElementById("question-container");
  const optionsDiv = document.getElementById("options");
  const input = document.getElementById("answer-input");

  container.style.opacity = 0;
  optionsDiv.style.opacity = 0;

  container.innerHTML = `<p class="question">${q.question}</p>`;
  optionsDiv.innerHTML = "";
  input.value = "";

  if (q.type === "mc") {
    input.classList.add("hidden");
    q.options.forEach(opt => {
      const btn = document.createElement("button");
      btn.innerText = opt;
      btn.onclick = () => checkAnswer(opt);
      optionsDiv.appendChild(btn);
    });
  } else {
    input.classList.remove("hidden");
    input.focus();
    input.onkeydown = function(e) {
      if (e.key === "Enter") checkAnswer();
    };
  }

  fadeIn(container);
  fadeIn(optionsDiv);
}

// Check answer
function checkAnswer(selected = null) {
  const q = questions[currentIndex];
  const input = document.getElementById("answer-input");

  let answer;
  if (q.type === "s") {
    answer = input.value.trim().toLowerCase();
    if (!answer) return;
  } else {
    answer = selected.toLowerCase();
  }

  let isCorrect = false;

  if (Array.isArray(q.answer)) {
    // Multiple correct answers
    isCorrect = q.answer.some(a => a.toLowerCase() === answer);
  } else {
    isCorrect = answer === q.answer.toLowerCase();
  }

  if (isCorrect) {
    points++;
    updatePoints();
    revealedParagraph += paragraphParts[currentIndex] ? paragraphParts[currentIndex] + " " : "";
    currentIndex++;
    if (currentIndex >= questions.length) {
      showFullMessage();
    } else {
      showQuestion();
    }
  } else {
    const popupText = q.wrongMessage ? q.wrongMessage : "Oops! Try again 😘";
    document.getElementById("popup").querySelector("p").innerText = popupText;
    showPopup();
  }
}

// Update points display
function updatePoints() {
  const pointsDiv = document.getElementById("points");
  if (pointsDiv) pointsDiv.innerText = `Points: ${points} / ${questions.length}`;
}

// Show full paragraph, sentence by sentence
function showFullMessage() {
  document.getElementById("page-title").innerText = "Awesome Paragraph";
  document.getElementById("quiz").classList.add("hidden");
  const msgDiv = document.getElementById("message");
  msgDiv.classList.remove("hidden");
  const para = document.getElementById("full-paragraph");
  para.style.opacity = 1;
  para.innerText = "";

  const sentences = revealedParagraph.split(/(?<=[.!?])\s+/);
  let i = 0;
  function revealNextSentence() {
    if (i < sentences.length) {
      para.innerText += sentences[i] + " ";
      i++;
      setTimeout(revealNextSentence, 800);
    }
  }
  revealNextSentence();

  audio.play().catch(err => console.log("Audio playback failed:", err));
}

// Fade in helper
function fadeIn(element) {
  let op = 0;
  const timer = setInterval(() => {
    if (op >= 1) clearInterval(timer);
    element.style.opacity = op;
    op += 0.05;
  }, 20);
}

// Popup
function showPopup() {
  document.getElementById("popup").classList.remove("hidden");
}

function closePopup() {
  document.getElementById("popup").classList.add("hidden");
}

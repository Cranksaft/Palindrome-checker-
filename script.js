const input = document.getElementById("input");
const resultInput = document.getElementById("result");
const verdictInput = document.getElementById("verdict");
const historyList = document.getElementById("history-list");
const correctCountEl = document.getElementById("correct-count");
const incorrectCountEl = document.getElementById("incorrect-count");

let correctCount = 0;
let incorrectCount = 0;
let enterStreak = 0; // tracks consecutive Enter presses without other input
let checkStreak = 0; // tracks consecutive Check button clicks without other input

function reverseString(str) {
    return str.split("").reverse().join("");
}

function check() {
    checkStreak++;
    if (checkStreak >= 2) {
        clearAll();
        checkStreak = 0;
        return;
    }

    const rawValue = input.value.trim();
    const cleanValue = rawValue.toLowerCase();

    if (cleanValue === "") {
        verdictInput.value = "Please type something!";
        return;
    }
    if (cleanValue.length < 2) {
        verdictInput.value = "⚠️ Need at least 2 letters/numbers!";
        return;
    }

    const reversed = reverseString(rawValue);
    resultInput.value = reversed;

    const cleanReversed = reverseString(cleanValue);
    let isPalindrome = false;

    if (cleanValue === cleanReversed) {
        verdictInput.value = "🎉 PALINDROME!";
        isPalindrome = true;
        correctCount++;
    } else {
        verdictInput.value = "❌ NOT A PALINDROME";
        isPalindrome = false;
        incorrectCount++;
    }

    updateCounts();
    addToHistory(rawValue, isPalindrome);
}

function updateCounts() {
    correctCountEl.textContent = correctCount;
    incorrectCountEl.textContent = incorrectCount;
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        enterStreak++;

        if (enterStreak >= 2) {
            clearAll();
            enterStreak = 0;
        } else {
            check();
        }s
        return;
    }

  if (event.key === "Backspace" && input.value === "") {
    clearAll();
}

    enterStreak = 0;
    checkStreak = 0;
}

function clearAll() {
    input.value = "";
    resultInput.value = "";
    verdictInput.value = "";
}

function addToHistory(word, isPalindrome) {
    const li = document.createElement("li");

    if (isPalindrome) {
        li.innerHTML = `${word} - <span class="palindrome">Palindrome.</span>`;
    } else {
        li.innerHTML = `${word} - <span class="not-palindrome">NOT palindrome.</span>`;
    }

    historyList.appendChild(li);
}

function resetHistory() {
    historyList.innerHTML = "";
    correctCount = 0;
    incorrectCount = 0;
    updateCounts();
}
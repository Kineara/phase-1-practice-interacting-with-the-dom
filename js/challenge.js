/*    Globals   */
const counter = document.querySelector("#counter");
const likeList = document.querySelector(".likes");
const buttonMinus = document.querySelector("#minus");
const buttonPlus = document.querySelector("#plus");
const buttonLike = document.querySelector("#heart");
const buttonPause = document.querySelector("#pause");
const commentForm = document.querySelector("#comment-form");
const commentList = document.querySelector("#list");
const buttonSubmit = document.querySelector("#submit");
const numLikes = [];
let intID;
let currentCount = 0;

// Start the counter
countUpBySeconds();

/*    Buttons     */
// Increment current count
buttonMinus.addEventListener("click", () => {
  currentCount--;
  updateCounter();
});

// Decrement current count
buttonPlus.addEventListener("click", () => {
  currentCount++;
  updateCounter();
});

// Like current number
buttonLike.addEventListener("click", () => {
  const likeNum = currentCount;

  // Check if num is already liked
  let numSearch = numLikes.find((object) => object.number === likeNum);

  // Update like count if found, otherwise append new object to numLikes array
  if (numSearch) {
    numSearch.likeCount++;
  } else {
    numLikes.push({ number: likeNum, likeCount: 1 });
  }

  updateLikeList();
});

// Pause and Resume
buttonPause.addEventListener("click", (e) => {
  if (e.target.textContent === "resume") {
    e.target.textContent = "pause";
    countUpBySeconds();
    enableButtons();
  } else {
    e.target.textContent = "resume";
    clearInterval(intID);
    disableButtons();
  }
});

// Submit comment
commentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newCommentText = commentForm.querySelector("#comment-input").value;
  const newCommentEl = document.createElement("p");
  newCommentEl.textContent = newCommentText;
  document.querySelector("#list").appendChild(newCommentEl);
  commentForm.reset();
});

/*    Functions     */
// Update counter number
function updateCounter() {
  counter.textContent = currentCount;
}

// Count up one second until the end of time
function countUpBySeconds() {
  intID = setInterval(() => {
    currentCount++;
    updateCounter();
  }, 1000);
}

function updateLikeList() {
  // Remove current list items
  while (likeList.firstChild) {
    likeList.removeChild(likeList.firstChild);
  }

  // Add contents of likeList array to DOM
  numLikes.forEach((object) => {
    const newElement = document.createElement("li");
    newElement.textContent = `${object.number} (liked ${object.likeCount} times)`;
    likeList.appendChild(newElement);
  });
}

function disableButtons() {
  buttonMinus.disabled = true;
  buttonPlus.disabled = true;
  buttonLike.disabled = true;
  buttonSubmit.disabled = true;
}

function enableButtons() {
  buttonMinus.disabled = false;
  buttonPlus.disabled = false;
  buttonLike.disabled = false;
  buttonSubmit.disabled = false;
}

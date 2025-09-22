"Use strict";

// Select elements
const formSection = document.querySelector(".form");
const ticketSection = document.querySelector(".ticket");

const dropArea = document.getElementById("drop-area");
const inputFile = document.getElementById("input-file");
const imageView = document.getElementById("image-view");
const inputText = document.querySelector(".file__upload-text");
const btnImage = document.querySelector(".btn__file-image");
const uploadIcon = document.getElementById("upload--icon");

const messageHint = document.getElementById("message--hint");
const messageInfo = document.getElementById("message--info");
const infoIcon = document.querySelector(".info-icon");
const messageError = document.getElementById("message--error");

const btnRemove = document.querySelector(".btn__remove");
const btnChange = document.querySelector(".btn__change");
const btnSubmit = document.querySelector(".btn__submit");

const form = document.querySelector(".form__container");
const inputFullName = document.getElementById("fullName");
const fullNameErrorMessage = document.getElementById("message--fullName");
const inputUserName = document.getElementById("username");
const usernameErrorMessage = document.getElementById("message--username");
// const fullNameMessage = document.getElementById("fullName--message");

const inputEmail = document.getElementById("email");
const emailErrorMessage = document.getElementById("message--email");
const emailMessage = document.getElementById("email--message");

let fullName, email, username, file;

// Hide error image upload success
const uploadSuccess = function () {
  uploadIcon.classList.add("hidden");

  messageError.classList.add("hidden");
  messageHint.classList.remove("hidden");

  inputText.classList.add("hidden");
  btnImage.classList.remove("hidden");
};

//Show Error image upload
const uploadError = function () {
  uploadIcon.classList.remove("hidden");

  messageError.classList.remove("hidden");
  messageHint.classList.add("hidden");

  inputText.classList.remove("hidden");
  btnImage.classList.add("hidden");
};

//Upload Image function
const uploadImage = function () {
  const file = inputFile.files[0];
  const maxSize = 500 * 1024;

  if (!file) return;

  if (file.size > maxSize) {
    imageView.style.backgroundImage = "";
    uploadError();
  } else {
    let imgLink = URL.createObjectURL(inputFile.files[0]);
    imageView.style.backgroundImage = `url(${imgLink})`;
    uploadSuccess();
  }
};

// Upload image
inputFile.addEventListener("change", uploadImage);

// Drag and Drop feature
dropArea.addEventListener("dragover", function (e) {
  e.preventDefault();
});

dropArea.addEventListener("drop", function (e) {
  e.preventDefault();
  inputFile.files = e.dataTransfer.files;
  uploadImage();
});

//Remove image
btnRemove.addEventListener("click", (e) => {
  e.preventDefault();

  inputFile.value = "";
  imageView.style.backgroundImage = "";
  uploadIcon.classList.remove("hidden");

  messageError.classList.add("hidden");
  messageHint.classList.remove("hidden");

  inputText.classList.remove("hidden");
  btnImage.classList.add("hidden");
});

//Change image
btnChange.addEventListener("click", (e) => {
  e.preventDefault();
  inputFile.click();
});

// Check email function
const emailValidation = function () {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (inputEmail.value.trim() === "") {
    emailErrorMessage.classList.remove("hidden");
    emailMessage.textContent = "Please add your email!";
    return false;
  } else if (!regex.test(inputEmail.value.trim())) {
    emailErrorMessage.classList.toggle("hidden");
    emailMessage.textContent = "Please enter a valid email address.";
    return false;
  } else {
    emailErrorMessage.classList.add("hidden");
    return true;
  }
};

const fullNameValidation = function () {
  if (inputFullName.value.trim() === "") {
    fullNameErrorMessage.classList.remove("hidden");
    return false;
  } else {
    fullNameErrorMessage.classList.add("hidden");
    return true;
  }
};
const usernameValidation = function () {
  if (inputUserName.value.trim() === "") {
    usernameErrorMessage.classList.remove("hidden");
    return false;
  } else {
    usernameErrorMessage.classList.add("hidden");
    return true;
  }
};

const uploadFileValidation = function () {
  if (!inputFile.files[0]) {
    messageInfo.classList.remove("info");
    messageInfo.classList.add("error");
    infoIcon.classList.add("error-icon");
    return false;
  } else {
    messageInfo.classList.remove("error");
    messageInfo.classList.add("info");
    infoIcon.classList.remove("error-icon");
    return true;
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const emailValid = emailValidation();
  const fullNameValid = fullNameValidation();
  const usernameValid = usernameValidation();
  const uploadFileValid = uploadFileValidation();
  if (emailValid && fullNameValid && usernameValid && uploadFileValid) {
    fullName = inputFullName.value.trim();
    email = inputEmail.value.trim();
    username = inputUserName.value.trim();
    file = URL.createObjectURL(inputFile.files[0]);

    let dots = 0;
    const loadingInteral = setInterval(() => {
      dots = (dots + 1) % 4; // cycle 0 - 1-2-3-back to 0
      btnSubmit.textContent = "Loading" + ".".repeat(dots);
    }, 500);
    setTimeout(() => {
      clearInterval(loadingInteral);
      formSection.classList.add("hidden");
      ticketSection.classList.remove("hidden");
    }, 3000);
  }
});

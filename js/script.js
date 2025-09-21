"Use strict";

// Select elements
const dropArea = document.getElementById("drop-area");
const inputFile = document.getElementById("input-file");
const imageView = document.getElementById("image-view");
const inputText = document.querySelector(".file__upload-text");
const btnImage = document.querySelector(".btn__file-image");
const uploadIcon = document.getElementById("upload--icon");

const messageHint = document.getElementById("message--hint");
const messageError = document.getElementById("message--error");

const btnRemove = document.querySelector(".btn__remove");
const btnChange = document.querySelector(".btn__change");

const form = document.querySelector(".form__container");
const inputEmail = document.getElementById("email");
const emailErrorMessage = document.getElementById("message--email");
const emailMessage = document.getElementById("email--message");

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
    console.log("empty");
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

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const emailValid = emailValidation();

  if (emailValid) {
    form.submit();
  }
});

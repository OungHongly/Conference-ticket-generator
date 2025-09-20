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

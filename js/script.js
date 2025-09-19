"Use strict";

// Select elements
const dropArea = document.getElementById("drop-area");
const inputFile = document.getElementById("input-file");
const imageView = document.getElementById("image-view");
const inputText = document.querySelector(".file__upload-text");
const btnImage = document.querySelector(".btn__file-image");

const uploadImage = function () {
  let imgLink = URL.createObjectURL(inputFile.files[0]);
  imageView.style.backgroundImage = `url(${imgLink})`;
  imageView.textContent = "";
  inputText.classList.add("hidden");
  btnImage.classList.remove("hidden");
};

inputFile.addEventListener("change", uploadImage);

dropArea.addEventListener("dragover", function (e) {
  e.preventDefault();
});

dropArea.addEventListener("drop", function (e) {
  e.preventDefault();
  inputFile.files = e.dataTransfer.files;
  uploadImage();
});

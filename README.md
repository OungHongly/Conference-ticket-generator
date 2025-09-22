# Frontend Mentor - Conference ticket generator solution

This is a solution to the [Conference ticket generator challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/conference-ticket-generator-oq5gFIU12w). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)

## Overview

### The challenge

Users should be able to:

- Complete the form with their details
- Receive form validation messages if:
  - Any field is missed
  - The email address is not formatted correctly
  - The avatar upload is too big or the wrong image format
- Complete the form only using their keyboard
- Have inputs, form field hints, and error messages announced on their screen reader
- See the generated conference ticket when they successfully submit the form
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![](./design/image.png)

### Links

- Solution URL: [Github Repo](https://github.com/OungHongly/Conference-ticket-generator.git)
- Live Site URL: [Live Server](https://ounghongly.github.io/Conference-ticket-generator/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow
- JavaScript

### What I learned

```css
/*----------- Background patter with multiple overlay + responsive Change--------- */
:root {
  /* ---- Background Image ---- */
  --line-overlay: url("../assets/images/pattern-lines.svg");
  --circle1-overlay: url("../assets/images//pattern-circle.svg");
  --circle2-overlay: url("../assets/images//pattern-circle.svg");

  --squiggly-line-top: url("../assets/images/pattern-squiggly-line-top.svg");
  --squiggly-line-desktop: url("../assets/images/pattern-squiggly-line-bottom-desktop.svg");
  --main-bg-desktop: url("../assets/images/background-desktop.png");
}

body {
  background-image: var(--main-bg-desktop);
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  z-index: -10;
  min-height: 100vh;
}
.bg--overlay {
  position: absolute;
  background-image: var(--line-overlay), var(--circle1-overlay), var(
      --circle2-overlay
    ), var(--squiggly-line-top), var(--squiggly-line-desktop);
  background-repeat: no-repeat;
  background-position: center top, top -60px left 35px, center right 20%, top
      40px right, bottom left;
  background-size: auto, auto, auto, 30vw, 40vw;
  top: 0;
  left: 0;
  height: 100%;
  z-index: -9;
  width: 100%;
}
@media (max-width: 375px) {
  :root {
    --squiggly-line-desktop: url("../assets/images/pattern-squiggly-line-bottom-mobile-tablet.svg");
    --main-bg-desktop: url("../assets/images/background-mobile.png");
  }
}

/*----------- Mask Icon Image --------- */
.error-icon {
  width: 18px;
  background-color: var(--Orange-500);
  mask: url("../assets/images/icon-info.svg") no-repeat center;
  mask-size: 14px;
}

/*----------- When rotate 90deg element still keep it original width and hieght --------- */
.ticket__number {
  display: flex;
  width: 12%;
  align-items: center;
  justify-content: center;
  transform: rotate(90deg);
  font-size: var(--text-h4);
  color: var(--Neutral-300-04);
}
```

```html
<!-- Drap and Drop File -->
<label class="form__label">Upload Avatar</label>

<label class="form__label--file" id="drop-area">
  <input type="file" accept="image/*" hidden id="input-file" />
  <div class="file__image" id="image-view">
    <img
      src="./assets/images/icon-upload.svg"
      alt="upload-icon"
      id="upload--icon"
    />
  </div>
  <p class="file__upload-text">Drag and drop or click to upload</p>
  <div class="btn__file-image hidden">
    <button class="btnFile btn__remove">Remove image</button>
    <button class="btnFile btn__change">Change image</button>
  </div>
</label>

<div class="message--upload" id="message--hint">
  <img
    src="./assets/images/icon-info.svg"
    alt="icon info"
    class="message-icon info-icon"
  />
  <p class="message info" id="message--info">
    Upload your photo (JPG or PNG, max size: 500KB).
  </p>
</div>
<div class="message--upload hidden" id="message--error">
  <img
    src="./assets/images/icon-info.svg"
    alt="icon info"
    class="message-icon error-icon"
  />
  <p class="message error">
    File too large. Please upload a photo under 500KB.
  </p>
</div>
```

```js
// Drag and Drop feature
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

// Upload image handler
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
```

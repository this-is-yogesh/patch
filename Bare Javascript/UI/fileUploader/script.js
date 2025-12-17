import { users } from "./userData.js";
import removeImage from "./removeLogic.js";
const fileInput = document.getElementById("fileInput");
const dropZone = document.getElementById("dropZone");
const preview = document.getElementById("preview");

let files = [];

// ----------------- Handle File Selection -----------------
fileInput.addEventListener("change", e => {
  const selected = Array.from(e.target.files);
  files.push(...selected);
  renderImages();
});

// ----------------- Drag Events -----------------
function preventDefaults(e) {
  e.preventDefault();
}

["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
  dropZone.addEventListener(eventName, preventDefaults);
});

dropZone.onclick = () => {
  fileInput.click();
};

dropZone.addEventListener("drop", e => {
  const droppedFiles = Array.from(e.dataTransfer.files);
  files.push(...droppedFiles);
  renderImages();
});

// ----------------- Remove Image -----------------
function removeImageFunction(name) {
  files = removeImage(files, name);
  renderImages();
}

// ----------------- Render Preview Images -----------------
function renderImages() {
  preview.innerHTML = "";

  files.forEach(file => {
    const divImageBox = document.createElement("div");
    divImageBox.className = "imgBox";

    const remove = document.createElement("div");
    remove.className = "removeBtn";
    remove.innerText = "x";
    remove.onclick = () => removeImageFunction(file.name);

    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);

    divImageBox.appendChild(remove);
    divImageBox.appendChild(img);
    preview.appendChild(divImageBox);
  });
}

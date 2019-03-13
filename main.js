// const colors = [
//   "#6d23b8",
//   "#ffc600",
//   "#09181E",
//   "#37A000",
//   "#0255e9",
//   "#073F54",
//   "#0C2129",
//   "#FE4C00",
//   "#3498db",
//   "#4C5175",
//   "#E1E8EC",
//   "#BCE7D9",
//   "#FBDDEC",
//   "#F752A7",
//   "#131E77",
//   "#FEAD32",
//   "#371F72",
//   "#006052",
//   "#FDF0F0",
//   "#1F4172",
//   "#Febbbb",
//   "#f2f3f8",
//   "#3d3b56"
// ];
// // Create div for each color, Append all of them in their container
// colors.forEach(color => {
//   let newEl = `<div class="card" data-color="${color}"></div>`;
//   container.innerHTML += newEl;
// });

const myColors = JSON.parse(localStorage.getItem("myColors")) || [];

const cardsWrapper = document.querySelector(".cards_wrapper");
const addNewColor = document.querySelector(".add_new_color");
const colorField = document.querySelector(".form input");
const dialogWrapper = document.querySelector(".dialog_wrapper");
const submitColorBtn = document.querySelector(".submit_color");

// Open the color form when the user hit on Plus Icon to add one
function openColorForm() {
  addNewColor.classList.add("active");
  colorField.focus();
  dialogWrapper.style.display = "block";
}
// dialogWrapper will open when the form open
// The user will click on dialogWrapper If he/she click outside on the color form
dialogWrapper.addEventListener("click", function() {
  addNewColor.classList.remove("active");
  dialogWrapper.style.display = "none";
});

// Get input value while usre typing
colorField.addEventListener("keyup", function(e) {
  let colorIsOk = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(
    `${e.target.value}`
  );
  let colorWithoutHash = /(^[0-9A-F]{6}$)|(^[0-9A-F]{3}$)/i.test(
    `${e.target.value}`
  );
  if (colorIsOk) {
    submitColorBtn.removeAttribute("disabled");
  } else {
    if (colorWithoutHash) {
      e.target.value = "#" + e.target.value;
      submitColorBtn.removeAttribute("disabled");
    } else {
      submitColorBtn.setAttribute("disabled", "");
      return false;
    }
  }

  // If user hit Enter trigger a submit button click
  if (event.keyCode === 13) {
    event.preventDefault();
    submitColorBtn.click();
  }
});

// If user hit enter || click on Add new Color button
submitColorBtn.addEventListener("click", function() {
  // Push the new color to myColors array and update the localStorage
  myColors.push(colorField.value);
  localStorage.setItem("myColors", JSON.stringify(myColors));
  // Create new card for the new color
  let card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("data-color", `${colorField.value}`);
  card.style.backgroundColor = `${colorField.value}`;
  cardsWrapper.appendChild(card);
  // Reset my color input (colorField) & make the button disabled & focus on colorField again
  colorField.value = "";
  submitColorBtn.setAttribute("disabled", "");
  colorField.focus();
});

// Create card for each single item in myColors array
function handleCards() {}
myColors.forEach(color => {
  let card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("data-color", `${color}`);
  card.style.backgroundColor = color;
  cardsWrapper.appendChild(card);
});

// Handle copy feature

// Hover Animation
let cards = document.querySelectorAll(".card");
cards.forEach(card => {
  // Mouse enter
  card.addEventListener("mouseenter", e => {
    let copyIcon = document.createElement("div");
    copyIcon.classList.add("copy_color");
    copyIcon.textContent = "COPY";
    card.appendChild(copyIcon);
  });
  // Mouse leave
  card.addEventListener("mouseleave", e => {
    let copyIcon = document.querySelector(".copy_color");
    copyIcon.remove();
  });
  // Click to copy
  card.addEventListener("click", e => {
    let colorCode = document.createElement("input");
    colorCode.setAttribute("type", "text");
    colorCode.setAttribute("value", `${card.getAttribute("data-color")}`);
    card.appendChild(colorCode);
    colorCode.select();
    document.execCommand("copy");
    clearSelection();
    setTimeout(() => {
      colorCode.remove();
    }, 50);
  });

  // Copy Animation
});

// Clear selection after the user copy the color code
function clearSelection() {
  if (window.getSelection) {
    window.getSelection().removeAllRanges();
  } else if (document.selection) {
    document.selection.empty();
  }
}

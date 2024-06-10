var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

let box = document.querySelector(".box");
let container = document.querySelector(".container");
import { getData, getSingleData } from "./service.js";

// declaration function
// async function x(){
// }

// const data = async function(){
// }

const saveState = async (key, data) => {
  const value = JSON.stringify(data);
  localStorage.setItem(key, value);
};

const getState = (key) => {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
};

const renderLocalData = () => {
  const data = getState("product");
  modal.innerHTML = data
    .map(
      (item) => `<div>
    <img width = '300' src="${item.url}" alt="img" />
    <h1>${item.title}</h1>
    <button data-deleteid = '${item.id}'>remove</button>
  </div>`
    )
    .join("");
};

const render = async () => {
  const data = await getData();

  box.innerHTML = data
    .map(
      (item) => `
  <div>
    <img width = '300' src = '${item.url}' alt = 'img'/>
    <h2>${item.title}</h2>
    <button data-id ='${item.id}'>add</button>
  </div>
  `
    )
    .join("");
};

render();

box.addEventListener("click", async (e) => {
  if (e.target.dataset.id) {
    const data = await getSingleData(e.target.dataset.id);
    const oldData = getState("product");
    const el = oldData.find((item) => item.id == e.target.dataset.id);
    if (!el) {
      saveState("product", [...oldData, data]);
      renderLocalData();
    }
  }
});
renderLocalData();

modal.addEventListener("click", async (e) => {
  if (e.target.dataset.deleteid) {
    const data = getState("product");
    console.log(data);

    for (let i = 0; i < data.length; i++) {
      if (e.target.dataset.deleteid == data[i].id) {
        data.splice(i, 1);
      }
    }
    console.log(data);
    saveState("product", data);
  }

  renderLocalData();
});

/**
 * Google Extension for url storage.
 * Capture the tab url or save the custom url from user.
 * Delete All the url at once.
 * @author  Logesh Kumar
 * @version 1.1, 03/08/21
 */

let myLeads = [];
let oldLeads = [];
const inputBtn = document.getElementById("input-btn");
const inputEl = document.getElementById("input-el");
const ulEL = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

/**
 * Add customised url
 */
inputBtn.addEventListener("click", function () {
  let inputValue = inputEl.value;
  addUrl(inputValue);
});

/**
 * Add tab url(s)
 */
tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    let inputValue = tabs[0].url;
    addUrl(inputValue);
  });
});

/**
 * Delete all the listed Url(s)
 */
deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});
/**
 * List the url leads
 *
 * @param {Array} leads
 */
function render(leads) {
  let listItems = "";

  for (let i = 0; i < leads.length; i++) {
    listItems += `
      <li>
        <a href='${leads[i]}' target='_blank'>
            ${leads[i]}
        </a>
      </li>`;
  }
  ulEL.innerHTML = listItems;
}
/**
 * Add the URL for both custom and auto tab
 *
 * @param {String} url
 * @param {Boolean} customUrl
 * @returns
 */
function addUrl(url) {
  let errorMsg = document.getElementById("error-msg");
  if (myLeads.length > 0 && myLeads.includes(url)) {
    errorMsg.innerText = `Given url already exist`;
    setTimeout(function () {
      errorMsg.innerText = ``;
    }, 2000);
    return false;
  }
  myLeads.push(url);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
}

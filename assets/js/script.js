// on opening the webpage
// keep input field in focus and ...
document.querySelector("textarea").focus();
// ... display lasted saved note in the saved window
document.getElementById("last-saved-note").textContent = localStorage.getItem("saved-document");

// save button
var saveButton = document.getElementById("save-button");
saveButton.addEventListener("click", function(event) {
    // save the document in local storage
    localStorage.setItem("saved-document", document.getElementById("current-note").value);
    // display content in the saved window
    document.getElementById("last-saved-note").textContent = localStorage.getItem("saved-document");
    // return focus to input field
    document.querySelector("textarea").focus();
});

// restore button
var restoreButton = document.getElementById("restore-button");
restoreButton.addEventListener("click", function(event) {
    // replace content in the input field with the lasted saved note
    document.getElementById("current-note").value = localStorage.getItem("saved-document");
    // return focus to input field
    document.querySelector("textarea").focus();
});


// clear button
var clearButton = document.getElementById("clear-button");
clearButton.addEventListener("click", function(event) {
    // removed lasted saved note from local stoage
    localStorage.removeItem("saved-document");
    console.log("hi!");
    // update the history display window
    document.getElementById("last-saved-note").textContent = localStorage.getItem("saved-document");
    // return focus to input field
    document.querySelector("textarea").focus();
});


// Save every minute
// Need to edit so not repeated...
setInterval(function(event) {
    // save the document in local storage
    localStorage.setItem("saved-document", document.getElementById("current-note").value);
    // display content in the saved window
    document.getElementById("last-saved-note").textContent = localStorage.getItem("saved-document");
    // return focus to input field
    document.querySelector("textarea").focus();
}, 60000);
// on opening the webpage
// keep input field in focus and ...
document.querySelector("textarea").focus();
// ... display lasted saved note in the saved window
document.getElementById("manually-saved-note").textContent = localStorage.getItem("manually-saved-document");
document.getElementById("automatically-saved-note").textContent = localStorage.getItem("automatically-saved-document");

// save button
var saveButton = document.getElementById("save-button");
saveButton.addEventListener("click", function(event) {
    // save the document in local storage
    localStorage.setItem("manually-saved-document", document.getElementById("current-note").value);
    // display content in the saved window
    document.getElementById("manually-saved-note").textContent = localStorage.getItem("manually-saved-document");
    // return focus to input field
    document.querySelector("textarea").focus();
});

// restore manual button
var restoreManualButton = document.getElementById("restore-manual-button");
restoreManualButton.addEventListener("click", function(event) {
    // replace content in the input field with the lasted saved note
    document.getElementById("current-note").value = localStorage.getItem("manually-saved-document");
    // return focus to input field
    document.querySelector("textarea").focus();
});


// clear button
var clearButton = document.getElementById("clear-button");
clearButton.addEventListener("click", function(event) {
    // removed lasted saved note from local stoage
    localStorage.removeItem("manually-saved-document");
    console.log("hi!");
    // update the history display window
    document.getElementById("manually-saved-note").textContent = localStorage.getItem("manually-saved-document");
    // return focus to input field
    document.querySelector("textarea").focus();
});


// Save every minute
setInterval(function(event) {
    // save the document in local storage
    localStorage.setItem("automatically-saved-document", document.getElementById("current-note").value);
    // display content in the saved window
    document.getElementById("automatically-saved-note").textContent = localStorage.getItem("automatically-saved-document");
    // return focus to input field
    document.querySelector("textarea").focus();
}, 10000);
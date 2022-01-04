var timestamp = function() {
    var today = new Date(),
        year = today.getFullYear(),
        month = ("0" + (today.getMonth()+1)).slice(-2),
        day = ("0" + (today.getDate())).slice(-2),
        date = year+'-'+month+'-'+day,
        hours = ("0" + today.getHours()).slice(-2),
        minutes = ("0" + today.getMinutes()).slice(-2),
        seconds = ("0" + today.getSeconds()).slice(-2),
        time = hours + ":" + minutes + ":" + seconds,
        dateTime = date+' '+time;
    return dateTime;
}

var feedback = function(string) {
    document.getElementById("feedback").textContent = timestamp() + " " + string;
}

// on opening the webpage
// ... display lasted saved note in the saved window
document.getElementById("manually-saved-note").textContent = localStorage.getItem("manually-saved-document");
document.getElementById("automatically-saved-note").textContent = localStorage.getItem("automatically-saved-document");
document.getElementById("current-note").value= localStorage.getItem("automatically-saved-document");
if (localStorage.getItem("automatically-saved-document") === null || localStorage.getItem("automatically-saved-document") === "") { 
    feedback("There is no automatic save to restore!");
} else {
    feedback("Your automatic save has been restored!");
}
// keep input field in focus and ...
document.getElementById("current-note").focus();

// save button
var saveButton = document.getElementById("save-button");
saveButton.addEventListener("click", function(event) {
    if (document.getElementById("current-note").value === "") { 
        feedback("There is nothing to save!");
    } else {
        // save the document in local storage
        localStorage.setItem("manually-saved-document", document.getElementById("current-note").value);
        // display content in the saved window
        document.getElementById("manually-saved-note").textContent = localStorage.getItem("manually-saved-document");
        // return focus to input field
        document.getElementById("current-note").focus();
        
        feedback("You have manually saved!");
    }
});

// restore manual button
var restoreManualButton = document.getElementById("restore-manual-button");
restoreManualButton.addEventListener("click", function(event) {
    // replace content in the input field with the lasted saved note
    if (localStorage.getItem("manually-saved-document") === null || localStorage.getItem("manually-saved-document") === "") { 
        feedback("No manual saves to restore!");
    } else {
        feedback("Your manual save has been restored!");
        document.getElementById("current-note").value = localStorage.getItem("manually-saved-document");
    }
    // return focus to input field
    document.getElementById("current-note").focus();
});


// clear button
var clearButton = document.getElementById("clear-button");
clearButton.addEventListener("click", function(event) {
    // removed lasted saved note from local stoage
    localStorage.removeItem("manually-saved-document");
    // update the history display window
    document.getElementById("manually-saved-note").textContent = localStorage.getItem("manually-saved-document");
    // return focus to input field
    document.getElementById("current-note").focus();
    // provide feedback
    feedback("Your manual saves have been cleared!")
});


// Save every minute
setInterval(function(event) {
    // save the document in local storage
    localStorage.setItem("automatically-saved-document", document.getElementById("current-note").value);
    // display content in the saved window
    document.getElementById("automatically-saved-note").textContent = localStorage.getItem("automatically-saved-document");
    // return focus to input field
    document.getElementById("current-note").focus();
}, 100);


// Capture Ctrl/Cmd+S to save manually and Ctrl/Cmd+O to restore manual save
document.addEventListener("keydown", function(event) {
    if ((event.ctrlKey || event.metaKey) && event.code == "KeyS") {
        event.preventDefault();
        saveButton.click();
    }
    if ((event.ctrlKey || event.metaKey) && event.code == "KeyO") {
        event.preventDefault();
        restoreManualButton.click();
    }
});

// Ensure tab has expected behaviour instead of moving to the next element
document.getElementById("current-note").addEventListener("keydown", function(event) {
    if (event.code == "Tab") {
        event.preventDefault();
        // get caret position/selection
        var value = this.value,
            start = this.selectionStart,
            end = this.selectionEnd;
        // set textarea value to: text before caret + tab + text after caret
        this.value = value.substring(0, start) + '\t' + value.substring(end);
        // put caret at right position again
        this.selectionStart = this.selectionEnd = start + 1;
    }
});
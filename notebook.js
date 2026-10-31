
'use strict';

const addButton = document.getElementById("add-Btn");

// Makes a note draggable
function makeDraggable(note) {
    let offsetX;
    let offsetY;

    // Start dragging when the mouse button is pressed
    note.addEventListener("mousedown", function (e) {

        // Prevent dragging when clicking the delete button
        if (e.target.closest(".deletebtn")) {
            return;
        }

        // Calculate the mouse position inside the note
        offsetX = e.clientX - note.offsetLeft;
        offsetY = e.clientY - note.offsetTop;

        // Move the note along with the mouse
        function moveNote(e) {
            note.style.left = (e.clientX - offsetX) + "px";
            note.style.top = (e.clientY - offsetY) + "px";
        }

        // Stop dragging when the mouse button is released
        function stopDragging() {
            document.removeEventListener("mousemove", moveNote);
            document.removeEventListener("mouseup", stopDragging);
        }

        document.addEventListener("mousemove", moveNote);
        document.addEventListener("mouseup", stopDragging);
    });
}

// Create a new note when the add button is clicked
addButton.addEventListener("click", function () {

    const note = document.createElement("div");
    note.classList.add("note");
    note.style.position = "absolute";
    document.body.appendChild(note);

    // Place the note at a random position inside the browser window
    note.style.left = Math.random() * (window.innerWidth - 250) + "px";
    note.style.top = Math.random() * (window.innerHeight - 250) + "px";

    // Create the title input and text area
    const titleNote = document.createElement("input");
    const textNote = document.createElement("textarea");

    titleNote.type = "text";
    titleNote.classList.add("title");
    titleNote.placeholder = "Title...";
    titleNote.maxLength = 20;

    textNote.placeholder = "Write your note here...";

    // Add the input fields to the note
    note.appendChild(titleNote);
    note.appendChild(textNote);

    // Create the delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("deletebtn");
    deleteBtn.textContent = "X";
    note.appendChild(deleteBtn);

    // Delete the current note
    deleteBtn.addEventListener("click", function () {
        note.remove();
    });

    // Enable dragging for the new note
    makeDraggable(note);
});

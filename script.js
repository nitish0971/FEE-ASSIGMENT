document.addEventListener("DOMContentLoaded", () => {
    const noteInput = document.getElementById("note-input");
    const addButton = document.getElementById("add-button");
    const notesList = document.getElementById("notes-list");

    // Load existing notes from local storage
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];

    function displayNotes() {
        notesList.innerHTML = "";
        savedNotes.forEach((note, index) => {
            const noteDiv = document.createElement("div");
            noteDiv.classList.add("note");
            noteDiv.innerHTML = `
                <p>${note}</p>
                <button onclick="deleteNote(${index})">Delete</button>
            `;
            notesList.appendChild(noteDiv);
        });
    }

    displayNotes();

    addButton.addEventListener("click", () => {
        const newNote = noteInput.value.trim();
        if (newNote !== "") {
            savedNotes.push(newNote);
            localStorage.setItem("notes", JSON.stringify(savedNotes));
            noteInput.value = "";
            displayNotes();
        }
    });

    window.deleteNote = function (index) {
        savedNotes.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(savedNotes));
        displayNotes();
    };
});

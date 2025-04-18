function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
}

function getCurrentDateTime() {
    let now = new Date();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return `${days[now.getDay()]}, ${now.toLocaleDateString()} at ${now.toLocaleTimeString()}`;
}

function saveData() {
    let title = document.getElementById("title").value.trim();
    let notes = document.getElementById("notes").value.trim();

    if (!title || !notes) {
        alert("Please enter a title and note!");
        return;
    }

    let savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    savedNotes.push({ title, notes, dateTime: getCurrentDateTime() });
    localStorage.setItem("notes", JSON.stringify(savedNotes));

    document.getElementById("title").value = "";
    document.getElementById("notes").value = "";
    displayNotes();
}

function displayNotes() {
    let savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    let notesContainer = document.getElementById("notesContainer");
    notesContainer.innerHTML = "";

    savedNotes.forEach((note, index) => {
        let noteElement = document.createElement("div");
        noteElement.classList.add("note");
        noteElement.innerHTML = `
                    <h2>${note.title}</h2>
                    <p>${note.notes}</p>
                    <p class="date">${note.dateTime}</p>
                    <button class="btn" onclick="editNote(${index})" style = "width: 80px;">Edit</button>
                    <button class="btn" onclick="copyNote(${index})" style = "width: 80px;">Copy</button>
                    <button class="btn" onclick="deleteNote(${index})" style = "width: 80px;">Delete</button>
                `;
        notesContainer.appendChild(noteElement);
    });
}

function deleteNote(index) {
    let savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    savedNotes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(savedNotes));
    displayNotes();
}

function editNote(index) {
    let savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    let note = savedNotes[index];
    let newTitle = prompt("Edit Title:", note.title);
    let newNotes = prompt("Edit Note:", note.notes);
    if (newTitle !== null && newNotes !== null) {
        savedNotes[index] = { title: newTitle, notes: newNotes, dateTime: getCurrentDateTime() };
        localStorage.setItem("notes", JSON.stringify(savedNotes));
        displayNotes();
    }
}

function copyNote(index) {
    let note = JSON.parse(localStorage.getItem("notes"))[index];
    navigator.clipboard.writeText(`Title: ${note.title}\nNote: ${note.notes}\nDate: ${note.dateTime}`).then(() => alert("Note copied!"));
}

window.onload = function () {
    if (localStorage.getItem("darkMode") === "true") document.body.classList.add("dark-mode");
    displayNotes();
};
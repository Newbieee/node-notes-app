const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes();
    //const duplicateNotes = notes.filter((note) => note.title === title);

    const duplicateNote = notes.find((note) => note.title === title);
    
    if(!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);

        console.log(chalk.green.inverse("New Note added!"));
    }
    else {
        console.log(chalk.red.inverse("Note title taken!"));
    }
}

const removeNote = (title) => {

    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title !== title);

    if(notes.length > notesToKeep.length) {
        saveNotes(notesToKeep);
        console.log(chalk.green.inverse("Note removed!"));
        
    }
    else {
        console.log(chalk.red.inverse("No note found!"));
    }
}

const listNotes = () => {
    const notes = loadNotes();

    console.log(chalk.yellow.inverse("Your notes"));

    notes.forEach((note) => console.log(chalk.cyan("* " + note.title)));
}

const readNote = (title) => {
    const notes = loadNotes();

    const note = notes.find((note) =>  note.title === title);

    if(note) {
        console.log(chalk.inverse(note.title));
        console.log(note.body);
    }
    else {
        console.log(chalk.red.inverse("Note not found"));
    }
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }
    catch(e) {
        return [];
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync("notes.json", dataJSON);
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}

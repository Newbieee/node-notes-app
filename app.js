const validator = require("validator");
const chalk = require("chalk");
const yargs = require("yargs");
const notes = require('./notes');

/* const getNotesFn = require("./notes.js");

console.log(getNotesFn());
console.log(validator.isURL("https://google.com"));

console.log(chalk.green.inverse.bold("Success!")); */

// Create a add command

yargs.command({
    command: "add",
    describe: "Add a note",
    builder: {
        title: {
            describe: 'Note title',
            type: 'string',
            demandOption: true
        },
        body: {
            describe: 'Description of note',
            type: 'string',
            demandOption: true
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body);
    }

})

// Create a remove command
yargs.command({
    command: "remove",
    describe: "Remove a note",
    builder: {
      title: {
          describe: 'Note title',
          type: 'string',
          demandOption: true
      }  
    },
    handler(argv) {
        notes.removeNote(argv.title);
    }
})

//Create a list command
yargs.command({
    command: "list",
    describe: "List all the notes",
    handler() {
        notes.listNotes();
    }
})

//Create a read command
yargs.command({
    command: "read",
    describe: "Read a note!",
    builder: {
        title: {
            describe: "Note title",
            type: "string",
            demandOption: true
        }
    },
    handler(argv) {
        notes.readNote(argv.title);
    }
})

//console.log(yargs.argv);
yargs.parse();

const fs = require("fs");
const _ = require("lodash");
const yargs = require("yargs");

const notes = require("./notes.js");

var bodyOptions = {
	describe: 'The Body of Note',
	demand: true,
	alias: 'b'
}
var titleOptions = {
	describe: 'Title of note',
	demand: true,
	alias: 't'
}

const argv = yargs
	.command('add', 'Add a new note', {
		title: titleOptions,
		body: bodyOptions
	})
	.command('list', 'List all Notes')
	.command('read', 'Read a Note', {
		title: titleOptions
	})
	.command('remove', 'Removing a Note', {
		title: titleOptions	
	})
	.help()
	.argv;


var command = argv._[0];

if(command === 'add')
{
	var note = notes.addNote(argv.title, argv.body);
	if(note)
	{
		console.log("Note Added Successfully");
		notes.logNote(note);
	}
	else
	{
		console.log("Note title is either Duplicate or Invalid.");
		console.log("Cannot Add Note");
	}
}
else if(command === 'list')
{
	var allNotes = notes.getAll();
	console.log(`Printing ${allNotes.length} note(s).`);
	allNotes.forEach((note) => notes.logNote(note));
}
else if(command === 'read')
{
	var readNote = notes.getNote(argv.title);
	if(readNote)
	{
		console.log("Note Read Successfully");
		notes.logNote(readNote);
	}
	else
	{
		console.log("Sorry!! Note not found");
	}
}
else if(command === 'remove')
{
	var ans = notes.removeNote(argv.title);
	if(ans)
	{
		console.log("A Note was deleted");
	}
	else
	{
		console.log("The Note Could not be deleted");
	}
}
else
{
	console.log('Command not recognized');
}
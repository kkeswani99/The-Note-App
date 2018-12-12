const fs = require("fs");

//A Function to Fetch Notes From The File
var fetchNotes = () => {
	try
	{
		var notesString = fs.readFileSync("notes-data.json");
		return  JSON.parse(notesString);
	}
	catch(e)
	{
		return [];
	}
};

//A Function to save The Objects Back into File
var saveNotes = (notes) => {
	fs.writeFileSync('notes-data.json',JSON.stringify(notes));
};

//Function to add a new note
var addNote = (title, body) => {
	var notes = fetchNotes();
	var note = {
		title,
		body
	};
	var duplicateNotes = notes.filter((note) => note.title === title);

	if(duplicateNotes.length === 0)
	{
		notes.push(note);
		saveNotes(notes);
		return note;
	}	
};

 var getAll = () => {
 	return fetchNotes();
};
var getNote = (title) => {

	//Fetch
	var notes = fetchNotes();
	//Filter
	var readNotes = notes.filter((note) => note.title === title);
	//Return
	return readNotes[0];
};
var removeNote = (title) => {
	//fetch Notes
	var notes = fetchNotes();
	//filter Notes Removing the one with title of argument
	var finalNotes = notes.filter((note)=> note.title !== title);
	//save new notes array
	saveNotes(finalNotes);
	//Passing Message
	return notes.length !== finalNotes.length;
};

var logNote = (note) => {
	console.log("------------------------");
	console.log(`Note Title: ${note.title}`);
	console.log(`Note Body: ${note.body}`);	
};
module.exports = {
	addNote,
	getAll,
	getNote,
	removeNote,
	logNote
};
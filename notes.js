const fs = require('fs')
const chalk=require('chalk')

const addNote=(title,body)=>{
    const notes=loadNotes()
    const duplicateNote=notes.find((note)=>note.title===title)
    
    if(!duplicateNote){
        console.log(chalk.inverse.green("Note added!"))
        notes.push(
            {
                title: title,
                body: body
            }
        )
    }
    else{
        console.log(chalk.inverse.red("duplicate title present. Try again with a new title"))
    }
    saveNotes(notes)
}

const saveNotes=(notes)=>{
    const dataJSON=JSON.stringify(notes)
    fs.writeFileSync("notes.json",dataJSON)
}
const removeNote=(title)=>{
    let notes=loadNotes();
    let deleted=false;
    for (let i=0;i<notes.length;i++){
        if(title==notes[i].title){
            deleted=true;
            notes.splice(i,1);
            break
        }
    }
    if(deleted==false){
        console.log(chalk.inverse.red("No note found!"))
    }
    else{
        console.log(chalk.inverse.green("Note removed!"))
    }
    saveNotes(notes)
}

const loadNotes=()=>{
    try{
        const databuffer=fs.readFileSync('notes.json')
        const dataJSON=databuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch(e){
        return []
    }
    
}

const listNotes=()=>{
    console.log(chalk.yellow.bold("Your Notes"))
    const notes=loadNotes()
    notes.forEach((note)=>{
        console.log(note.title)
    })
}

const readNote=(title)=>{
    const notes=loadNotes()
    const note=notes.find((note)=>note.title==title)
    if(!note){
        console.log(chalk.red.inverse("No note found!"))
    }
    else{
        console.log(chalk.yellow.bold(note.title))
        console.log(note.body)
    }
}

module.exports={
    addNote: addNote,
    removeNote:removeNote,
    listNotes:listNotes,
    readNote:readNote
}
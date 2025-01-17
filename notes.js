const fs = require('fs')
const chalk = require('chalk')

exports.addNote = (title, body) => {
  const notes = loadNotes()
  const duplicateNote = notes.find((note) => note.title === title)

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    })
    saveNotes(notes)
    console.log(chalk.green.inverse('New note added!'))
  } else {
    console.log(chalk.red.inverse('Note title taken!'))
  }
}

exports.removeNote = (title) => {
  const notes = loadNotes()
  const index = notes.findIndex((note) => note.title === title)

  if (index == -1) {
    return console.log(chalk.red.inverse('No note found!'))
  }

  notes.splice(index, 1)
  saveNotes(notes)
  console.log(chalk.green.inverse('Note removed!'))
}

exports.listNotes = () => {
  const notes = loadNotes()

  if (!notes.length) {
    return console.log(chalk.red.inverse('No notes found'))
  }

  console.log(chalk.inverse('Your notes'))

  notes.forEach((note) => {
    console.log(note.title)
  })
}

exports.readNote = (title) => {
  const notes = loadNotes()
  const note = notes.find((note) => note.title === title)

  if (note) {
    console.log(chalk.inverse(note.title))
    console.log(note.body)
  } else {
    console.log(chalk.red.inverse('Note not found!'))
  }
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (e) {
    return []
  }
}

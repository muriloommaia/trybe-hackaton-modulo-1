newNoteButton.addEventListener('click', () => {
  localStorage.notes = notes.innerHTML;
})
const saveNotes = () => {
  if (localStorage.notes) {
    notes.innerHTML = localStorage.notes;
  }
}
const deleteNoteButton = document.querySelector('#delete');

deleteNoteButton.addEventListener('click', () => {
  console.log('teste')
  notes.innerHTML = '';
  numberOfNotes = 1;
  criaNovaNota();
  localStorage.removeItem('notes');
})
const notes = document.querySelector('#notes');

let numberOfNotes = 2;

const createNewNote = () => {
  const newContainerNote = document.createElement('div');
  newContainerNote.classList.add('container-note');
  newContainerNote.classList.add('m-2');
  const newDiv = document.createElement('div');
  newDiv.classList.add('m-2');
  newDiv.innerHTML = `<h5>Nota ${numberOfNotes}</h5>
  <hr class= "m-0">`;
  const newNote = document.createElement('div');
  newNote.classList.add('note');
  newNote.classList.add('m-2');
  newNote.id = `note-${numberOfNotes}`;
  newContainerNote.appendChild(newDiv);
  newDiv.appendChild(newNote);
  notes.appendChild(newContainerNote);
};

ClassicEditor
  .create(document.querySelector('#note-1'), {
    toolbar: ['bold', 'italic', 'link', 'blockQuote', 'undo', 'redo', 'numberedList', 'bulletedList']
  })
  .catch(error => {
    console.error(error);
  });

const newNoteButton = document.querySelector('#new');

newNoteButton.addEventListener('click', () => {
  createNewNote();
  ClassicEditor
    .create(document.querySelector(`#note-${numberOfNotes}`), {
      toolbar: ['bold', 'italic', 'link', 'blockQuote', 'undo', 'redo', 'numberedList', 'bulletedList']
    })
    .catch(error => {
      console.error(error);
    });
  numberOfNotes++;
  saveNotesInLocalStorage();
  window.scrollTo(0, document.body.scrollHeight);
});

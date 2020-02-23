console.log('Hello!!')

const NOTES_URL = '/notes';

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    const todos = document.getElementById('todos');
    const todo = document.getElementById('todo');

    todos.addEventListener('submit', (event) => {
        event.preventDefault();
        const note = todo.value;
        todo.value = ''; 
        addNote(note);
        fetch(NOTES_URL, {
            method: 'post',
            headers: headers,
            body: JSON.stringify({note: note})
        })
    });

    function addNote(note) {
        const element = document.createElement('li');
        element.innerText = note;
        element.className = 'note';
        content.appendChild(element);
        
    }

    fetch(NOTES_URL).then(res => res.json()).then(body => {
        content.innerHTML = '';
        body.notes.forEach((note) => addNote(note));
    });

})
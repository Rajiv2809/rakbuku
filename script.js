const form = document.getElementById('form');
const readBookList = document.querySelector('.readBook ul');
const readedBookList = document.querySelector('.readedBook ul');

// Load data from local storage if available
const unreadBooks = JSON.parse(localStorage.getItem('unreadBooks')) || [];
const readBooks = JSON.parse(localStorage.getItem('readBooks')) || [];

// Function to save data to local storage
function saveDataToLocalStorage() {
    localStorage.setItem('unreadBooks', JSON.stringify(unreadBooks));
    localStorage.setItem('readBooks', JSON.stringify(readBooks));
}

// Function to display books in the appropriate list
function displayBooks() {
    readBookList.innerHTML = '';
    readedBookList.innerHTML = '';

    unreadBooks.forEach((book, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
        <div class="listBook">
        <div class="text">
            <h2>${book.name}</h2>
            <span>${book.date}</span>
        </div>
        <p>${book.halaman} halaman</p>
        
        <div>
            <button class="done-button" data-index="${index}">Done</button>
            <button class="delete-button" data-index="${index}">Delete</button>
        </div>
        
        </div>
        `;
        readBookList.appendChild(li);

        // Add a click event listener to the "Done" button
        const doneButton = li.querySelector('.done-button');
        doneButton.addEventListener('click', function () {
            moveBookToReaded(index);
        });

        // Add a click event listener to the "Delete" button
        const deleteButton = li.querySelector('.delete-button');
        deleteButton.addEventListener('click', function () {
            deleteBook(index, 'unread');
        });
    });

    readBooks.forEach((book, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
        <div class="listBook">
        <div class="text">
            <h2>${book.name}</h2>
            <span>${book.date}</span>
        </div>
        <p>${book.halaman} halaman</p>
        
        <div>
            <button class="delete-button" data-index="${index}">Delete</button>
        </div>
        
        </div>
        `;
        readedBookList.appendChild(li);

        // Add a click event listener to the "Delete" button in the "readed" list
        const deleteButton = li.querySelector('.delete-button');
        deleteButton.addEventListener('click', function () {
            deleteBook(index, 'readed');
        });
    });
}

// Function to move a book from "unread" to "readed"
function moveBookToReaded(index) {
    const bookToMove = unreadBooks[index];
    unreadBooks.splice(index, 1);
    readBooks.push(bookToMove);
    saveDataToLocalStorage();
    displayBooks();
}

// Function to delete a book
function deleteBook(index, listType) {
    if (listType === 'unread') {
        unreadBooks.splice(index, 1);
    } else if (listType === 'readed') {
        readBooks.splice(index, 1);
    }
    saveDataToLocalStorage();
    displayBooks();
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nama = document.getElementById('nama').value;
    const date = document.getElementById('date').value;
    const halaman = document.getElementById('halaman').value;

    const dataBook = {
        name: nama,
        date: date,
        halaman: halaman
    };

    unreadBooks.push(dataBook);
    saveDataToLocalStorage();
    form.reset();

    alert('Data telah ditambahkan');
    displayBooks();
});

// Display books on page load
displayBooks();

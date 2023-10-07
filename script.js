const form = document.getElementById('form');
const readBookList = document.querySelector('.readBook ul');
const readedBookList = document.querySelector('.readedBook ul');


const unreadBooks = JSON.parse(localStorage.getItem('unreadBooks')) || [];
const readBooks = JSON.parse(localStorage.getItem('readBooks')) || [];


function saveDataToLocalStorage() {
    localStorage.setItem('unreadBooks', JSON.stringify(unreadBooks));
    localStorage.setItem('readBooks', JSON.stringify(readBooks));
}


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

   
        const doneButton = li.querySelector('.done-button');
        doneButton.addEventListener('click', function () {
            moveBookToReaded(index);
        });

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


        const deleteButton = li.querySelector('.delete-button');
        deleteButton.addEventListener('click', function () {
            deleteBook(index, 'readed');
        });
    });
}


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

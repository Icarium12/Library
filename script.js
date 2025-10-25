const myLibrary = [];
const libraryContainer = document.querySelector(".libraryContainer");
const body = document.body;


function Book(title, author, numOfPages, readStatus) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }

    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.readStatus = readStatus;
    this.id = crypto.randomUUID();
    this.info = function() {
        return (this.title + " by "  + this.author + " with " + this.numOfPages + " pages, "  + this.readStatus);
    }
}

const book1 = new Book("The way of kings", "Brandon Sanderson", 1000, "read");
const book2 = new Book("Regressor's tale of cultivation", "Korean Writer", 10000, "read");

addBookToLibrary(book1);
addBookToLibrary(book2); 

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBook(array, libraryContainer) {
    for(let i = 0; i < array.length; i++) {
        const bookCard = document.createElement('div');
        bookCard.className = 'bookcard';
        libraryContainer.appendChild(bookCard);

        const book = document.createElement('div');
        book.className = 'book';

        const title = document.createElement('div');
        title.textContent = array[i].title;
        book.appendChild(title);

        const author = document.createElement('div');
        author.textContent = array[i].author
        book.appendChild(author);

        const pages = document.createElement('div');
        pages.textContent = array[i].numOfPages;
        book.appendChild(pages);

        bookCard.appendChild(book);

        const status = document.createElement('div');
        status.textContent = `Status: ${array[i].readStatus}`;
        bookCard.appendChild(status);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        bookCard.appendChild(deleteButton);

        bookCard.dataset.id = array[i].id;

        deleteButton.addEventListener('click', () => {
            if(bookCard.dataset.id === array[i].id) {
                const ensure = prompt("Are you sure you want to delete book (Y/N)?")
                if (ensure === 'y' || ensure === 'Y') {
                    libraryContainer.removeChild(bookCard);
                }
                
            }
        })
    }
}

displayBook(myLibrary, libraryContainer);

const addNewBook = document.querySelector('.add');
addNewBook.addEventListener('click', () => {
    const dialog = document.querySelector('dialog');
    dialog.showModal();

    const form = document.querySelector('form');

    const button = document.querySelector(".updatelib");
    button.addEventListener('click', (event) => {
    event.preventDefault();
    if (form.checkValidity()) {
        console.log(form.checkValidity());
        const bookTitle = document.querySelector('#title');
        const bookAuthor = document.querySelector('#author');
        const bookPage = document.querySelector('#page');
        const bookStatus = document.querySelector('#status');
        const newBook = new Book(
            bookTitle.value,
            bookAuthor.value,
            bookPage.value,
            bookStatus.value
        );
        myLibrary.length = 0;
        addBookToLibrary(newBook);
        displayBook(myLibrary, libraryContainer);
        form.reset();
        dialog.close();
    }
    else {
        alert("Please fill out all required fields");
    }
})

});



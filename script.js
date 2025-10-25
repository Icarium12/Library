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

Book.prototype.toggleStatus = function () {
    if (this.readStatus === "Read") {
        this.readStatus = "Not Read";
    }
    else if (this.readStatus === "Not Read"){
        this.readStatus = "Read";
    }
}

const book1 = new Book("The way of kings", "Brandon Sanderson", 1000, "Read");
const book2 = new Book("Regressor's tale of cultivation", "Korean Writer", 10000, "Not Read");

addBookToLibrary(book1);
addBookToLibrary(book2); 

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBook(array, libraryContainer) {
    libraryContainer.replaceChildren();
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

        const cardButtons = document.createElement('div');
        cardButtons.className = 'buttonContainer'

        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        cardButtons.appendChild(deleteButton);

        bookCard.dataset.id = array[i].id;

        deleteButton.addEventListener('click', () => {
            if(bookCard.dataset.id === array[i].id) {
                const ensure = prompt("Are you sure you want to delete book (Y/N)?")
                if (ensure === 'y' || ensure === 'Y') {
                    libraryContainer.removeChild(bookCard);
                }
                
            }
        })

        const changeStatus = document.createElement('button');
        changeStatus.textContent = "Change read status";
        cardButtons.appendChild(changeStatus);
        bookCard.appendChild(cardButtons);

        changeStatus.addEventListener('click', () => {
            array[i].toggleStatus();
            status.textContent = `Status: ${array[i].readStatus}`;
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

        addBookToLibrary(newBook);
        displayBook(myLibrary, libraryContainer);
        form.reset();
        dialog.close();
        console.log(myLibrary);
    }
    else {
        alert("Please fill out all required fields");
    }
})

});



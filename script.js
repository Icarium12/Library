let myLibrary = [];
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

function addBookToLibrary(book) {
    myLibrary.push(book);
}


function displayBook(libraryContainer) {
    // Displays book inside libray on html
    libraryContainer.replaceChildren();
    for(let i = 0; i < myLibrary.length; i++) {
        const bookCard = document.createElement('div');
        bookCard.className = 'bookcard';
        libraryContainer.appendChild(bookCard);

        const book = document.createElement('div');
        book.className = 'book';

        const title = document.createElement('div');
        title.textContent = myLibrary[i].title;
        book.appendChild(title);

        const author = document.createElement('div');
        author.textContent = `By ${myLibrary[i].author}`
        book.appendChild(author);

        const pages = document.createElement('div');
        pages.textContent = `Pages: ${myLibrary[i].numOfPages}`;
        book.appendChild(pages);

        bookCard.appendChild(book);

        const status = document.createElement('div');
        status.textContent = `${myLibrary[i].readStatus}`;
        status.className = 'bookStatus';
        bookCard.appendChild(status);

        const cardButtons = document.createElement('div');
        cardButtons.className = 'buttonContainer'

        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete";
        cardButtons.appendChild(deleteButton);

        bookCard.dataset.id = myLibrary[i].id;

        deleteButton.addEventListener('click', () => {
            myLibrary.forEach(book => {
                if (bookCard.dataset.id === book.id) {
                    const ensure = prompt("Are you sure you want to delete book (Y/N)?")
                     if (ensure === 'y' || ensure === 'Y') {
                        libraryContainer.removeChild(bookCard);
                        myLibrary = myLibrary.filter(book => book.id !== bookCard.dataset.id);
                     }
                }
            });
        })

        const changeStatus = document.createElement('button');
        changeStatus.textContent = "Change read status";
        changeStatus.className = "status";
        cardButtons.appendChild(changeStatus);
        bookCard.appendChild(cardButtons);

        changeStatus.addEventListener('click', () => {
            myLibrary[i].toggleStatus();
            status.textContent = `${myLibrary[i].readStatus}`;
        })
    }
}

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
            displayBook(libraryContainer);
            
            dialog.close();
            form.reset();
        }  
    })
});



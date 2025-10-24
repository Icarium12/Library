const myLibrary = [];
const libraryContainer = document.querySelector(".libraryContainer");


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
console.log(book1.title);

addBookToLibrary(book1);
console.log(myLibrary);

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBook(array, libraryContainer) {
    for(let i = 0; i <= array.length; i++) {
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

        const id = document.createElement('div');
        id.textContent = array[i].id;
        bookCard.appendChild(id);

        const status = document.createElement('div');
        status.textContent = array[i].readStatus;
        bookCard.appendChild(status);
    }
}

displayBook(myLibrary, libraryContainer);




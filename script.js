const myLibrary = [];

function Book() {
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

function addBookToLibrary(book) {
    myLibrary.push(book);
}
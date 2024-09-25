// Book data structure
const books = [];
const history = [];

// DOM elements
const addBookForm = document.getElementById('add-book-form');
const bookList = document.getElementById('book-list');
const searchInput = document.getElementById('search');
const historyList = document.getElementById('history-list');

// Add a new book
addBookForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const category = document.getElementById('category').value;

    const book = { title, author, category };
    books.push(book);

    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('category').value = '';

    displayBooks();
});

// Display books
function displayBooks() {
    bookList.innerHTML = '';
    books.forEach((book, index) => {
        const li = document.createElement('li');
        li.textContent = `${book.title} by ${book.author} (Category: ${book.category})`;
        const borrowBtn = document.createElement('button');
        borrowBtn.textContent = 'Borrow';
        borrowBtn.addEventListener('click', () => borrowBook(index));
        li.appendChild(borrowBtn);
        bookList.appendChild(li);
    });
}

// Borrow a book
function borrowBook(index) {
    const book = books.splice(index, 1)[0];
    history.push(book);
    displayBooks();
    displayHistory();
}

// Display borrowing history
function displayHistory() {
    historyList.innerHTML = '';
    history.forEach((book) => {
        const li = document.createElement('li');
        li.textContent = `${book.title} by ${book.author} (Category: ${book.category})`;
        historyList.appendChild(li);
    });
}

// Search books
searchInput.addEventListener('input', function() {
    const query = searchInput.value.toLowerCase();
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)
    );

    bookList.innerHTML = '';
    filteredBooks.forEach((book, index) => {
        const li = document.createElement('li');
        li.textContent = `${book.title} by ${book.author} (Category: ${book.category})`;
        const borrowBtn = document.createElement('button');
        borrowBtn.textContent = 'Borrow';
        borrowBtn.addEventListener('click', () => borrowBook(index));
        li.appendChild(borrowBtn);
        bookList.appendChild(li);
    });
});
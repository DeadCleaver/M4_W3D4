const booksapi = `https://striveschool-api.herokuapp.com/books`;
let booksGallery = document.getElementById('books-gallery');
    console.log(booksGallery);
let booksArray = [];

function getData() {
    fetch(booksapi)
        .then((response) => response.json())
        .then((json) => {
            booksArray = json;
            startingBooks(booksArray);
            console.log(booksArray);
        })
        .catch((err) => console.log("Error detected: ", err));
};

function startingBooks(books) {
    const booksGallery = document.getElementById(`books-gallery`);

    books.forEach(book => {
        let card = addBookCard(book);
        booksGallery.appendChild(card);
    });
}

function displayBooks(books) {
    booksGallery.innerHTML = "";

    books.forEach(book => {
        const card = addBookCard(book);
        booksGallery.appendChild(card);
    });
}

function addBookCard({ asin, title, img, price, category }) {

    let cardContainer = document.createElement("div");
    cardContainer.classList.add("book-container");

    let card = document.createElement("div");
    card.classList.add("card", "shadow");

    let cardImg = document.createElement("img");
    cardImg.classList.add("card-img-top", "w-100", "img-fluid");
    cardImg.src = img;

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    let bookTitle = document.createElement("h5");
    bookTitle.classList.add("card-title", "fs-6", "fw-bold");
    bookTitle.innerText = title;

    let footContainer = document.createElement("div");
    footContainer.classList.add("d-flex", "align-items-center", "justify-content-between");

    let iconContainer = document.createElement("div");
    iconContainer.classList.add("d-flex", "align-items-center");

    let bookPrice = document.createElement("p");
    bookPrice.classList.add("fs-6", "mb-0");
    bookPrice.innerText = `Price: ${price}`;

    let saveIcon = document.createElement("ion-icon");
    saveIcon.setAttribute("name", "cart-outline");
    saveIcon.classList.add("p-1", "save-button");
    saveIcon.addEventListener("click", () => {
        addToCart(event);
        addBadge(event);
    });

    let skipIcon = document.createElement("ion-icon");
    skipIcon.setAttribute("name", "play-skip-forward-outline");
    skipIcon.classList.add("p-1", "skip-button");

    card.appendChild(cardImg);
    footContainer.appendChild(bookPrice);
    iconContainer.appendChild(saveIcon);
    iconContainer.appendChild(skipIcon);
    footContainer.appendChild(iconContainer);
    cardBody.appendChild(bookTitle);
    cardBody.appendChild(footContainer);
    card.appendChild(cardBody);
    cardContainer.appendChild(card);

    return cardContainer;
};

function addToCart(event) {
    let selectedBook = event.target.closest(".book-container")
    let cartBook = selectedBook.cloneNode(true);

    let saveIcon = cartBook.querySelector(".save-button");
    saveIcon.remove();
    let skipIcon = cartBook.querySelector(".skip-button");
    skipIcon.remove();

    const cartGallery = document.getElementById("cart-gallery");
    cartGallery.appendChild(cartBook);
};


function addBadge(event) {
    let bookCard = event.target.closest(".card")
    bookCard.classList.add("position-relative");

    let badge = document.createElement("span");
    badge.classList.add("position-absolute", "top-0" ,"start-50", "translate-middle", "badge", "rounded-pill", "bg-warning");
    badge.innerText = "added";

    bookCard.appendChild(badge);
};

function filterBooks(event) {
    let searchInput = event.target.value.toLowerCase();
    let filteredBooks;

    if (searchInput.length >= 4) {
        filteredBooks = booksArray.filter(book => {
            return book.title.toLowerCase().includes(searchInput);
        });  
        console.log(filteredBooks);
        displayBooks(filteredBooks);
    };
};

function clearGallery() {
    const booksGallery = document.getElementById(`books-gallery`);
    booksGallery.innerHTML = "";
};

window.onload = function () {
    getData();
    const searchButton = document.getElementById(`search-button`);
    const searchField = document.getElementById(`search-field`);
    searchField.addEventListener(`keyup`, filterBooks);
    
};




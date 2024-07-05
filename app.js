// elementos del libro

// show form for add the books
const add = document.querySelector(".add");
const hide = document.querySelector(".cerrar");
const form = document.getElementById("form");

let my_library_books = [];

function Books(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = false;
}

// Método para alternar el estado de lectura
Books.prototype.toggleRead = function () {
  this.isRead = !this.isRead;
};

Books.prototype.readStatus = function () {
  return this.isRead
    ? "The Book has already been read" 
    : "The Book has not been read";
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;

  my_library_books.push(new Books(title, author, pages, false));

  // show Books
  showBooks(my_library_books);
});

const showBooks = () => {
  const cont_books = document.querySelector(".cont-cards");
  cont_books.innerHTML = "";
  my_library_books.forEach((Books, index) => {
    const libro = `<article class="card" id=${index}>
                <h3 class="title">${Books.title}</h3>
                <p class="author"><b>Author: </b> ${Books.author}</p>
                <p class="pages"><b>Pages: </b>${Books.pages}</p>
                <p class="read-status"><b>Read: </b>${Books.readStatus()}</p>
                <div class="botones">
                <button class="${Books.isRead ? "read green" : "read red"}">Read</button>
                  <button class="delete">Delete</button>
                </div>
              </article>`;
    cont_books.innerHTML += libro;
  });

  // Añadir event listeners a los botones de eliminar
  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = button.parentNode.parentNode.getAttribute("id");
      deleteBook(id);
    });
  });

  // Añadir eventos para los botones de cambiar estado de lectura
  const toggleReadButtons = document.querySelectorAll(".read");
  toggleReadButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      my_library_books[index].toggleRead();
      showBooks();
    });
  });
};

const deleteBook = (id) => {
  my_library_books.splice(id, 1);
  showBooks();
};

add.addEventListener("click", () => {
  const section_form = (document.querySelector(".section-form").style.display =
    "inherit");
});

hide.addEventListener("click", () => {
  const x = (document.querySelector(".section-form").style.display = "none");
});

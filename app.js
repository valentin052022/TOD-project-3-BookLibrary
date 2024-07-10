let my_library_books = [];

class Books {
  constructor(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = false;
  }

  // Método para alternar el estado de lectura
  toggleRead = () => {
    this.isRead = !this.isRead;
  };
  // Método que retorna un string dependiendo si el libro esta leido o no
  readStatus = () => {
    return this.isRead
      ? "The Book has already been read"
      : "The Book has not been read";
  };
}

class library {
  constructor() {
    this.books = [];
    this.init();
  }

  init() {
    document.querySelector(".add").addEventListener("click", this.showForm);
    document.querySelector(".cerrar").addEventListener("click", this.hideForm);
    document.getElementById("form").addEventListener("submit", this.addBook);
    this.renderBooks();
  }

  showForm = () => {
    document.querySelector(".section-form").style.display = "inherit";
  };

  hideForm = () => {
    document.querySelector(".section-form").style.diplay = "none";
  };

  addBook = (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("title").value;
    const pages = document.getElementById("title").value;

    this.books.push(new Books(title, author, pages));
    this.renderBooks();
    this.hideForm();
  };

  renderBooks = () => {
    const cont_books = document.querySelector(".cont-cards");
    cont_books.innerHTML = "";
    this.books.forEach((book, index) => {
      const libro = `<article class="card" id=${index}>
                  <h3 class="title">${book.title}</h3>
                  <p class="author"><b>Author: </b> ${book.author}</p>
                  <p class="pages"><b>Pages: </b>${book.pages}</p>
                  <p class="read-status"><b>Read: </b>${book.readStatus()}</p>
                  <div class="botones">
                  <button class="${
                    book.isRead ? "read green" : "read red"
                  }">Read</button>
                    <button class="delete">Delete</button>
                  </div>
                </article>`;
      cont_books.innerHTML += libro;
    });

    document.querySelectorAll(".delete").forEach((button) => {
      button.addEventListener("click", this.deleteBook);
    });

    document.querySelectorAll(".read").forEach((button, index) => {
      button.addEventListener("click", () => {
        this.books[index].toggleRead();
        this.renderBooks();
      });
    });
  };

  deleteBook = (e) => {
    const id = e.target.parentNode.parentNode.getAttribute("id");
    this.books.splice(id, 1);
    this.renderBooks();
  }
}

const myLibrary = new library();
myLibrary.init();

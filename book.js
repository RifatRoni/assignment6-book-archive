//Global variable decalre
const searchInput = document.getElementById("search-field");
// const searchBtn = document.getElementById("search-btn");

const searchNumberDiv = document.getElementById("search-number-div");
searchNumberDiv.style.display = 'none';
const searchCountNumber = document.getElementById("search-count-number");

const bookContainer = document.getElementById("book-container");

const errorDiv = document.getElementById("error");
const spinner = document.getElementById("spinner");


//Search Button Event listener
const searchBook = () => {
  console.log(spinner);
  //user input
  const searchText = searchInput.value;
  //empty input handling
  if (searchText === "") {
    errorDiv.innerText = "Search field cannot be empty.";
    return;
  }

//Clear
  bookContainer.innerHTML = "";
  //search url
  const url = `https://openlibrary.org/search.json?q=${searchText}`;
  spinner.classList.remove("d-none");
  //Data fetching
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // Set timer, before removing the spinnner and showing data
      setTimeout(() => {
        spinner.classList.add("d-none");
        showData(data.docs);
      }, 1500);
    })
    .finally(() => {
      searchInput.value === "";
    });
};

//Show Data with error handling
const showData = bookArray => {
  // Error Handing, No result
  if (bookArray.length === 0) {
    errorDiv.innerText = "No Result Found";
    searchCountNumber.innerText = bookArray.length;
    
  } else {
    errorDiv.innerText = "";
  }
  searchNumberDiv.style.display = 'block';
  //show 20 Books output and slice
  const first20Books = bookArray.slice(0, 20)
  first20Books.forEach((item) => {
    searchCountNumber.innerText = bookArray.length;
    //create div element to display dynamically
    const div = document.createElement("div");
    div.classList.add("col");
    //set inner html to display result
    div.innerHTML = `   
        <!-- Body -->
        <div class="card h-100">
            <img src="https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg" class="card-img-top img-fluid" alt="image">   
            <div class="card-body">
                <h4>${item.title}</h4>
                <p>Author: ${item.author_name}</p>
                <p>Pubslisher: ${item.publisher}</p>
                <p>First Published: ${item.first_publish_year}</p>
            </div>
        </div>       
      `;
      //append div to the main html book container div
      bookContainer.appendChild(div);
  });
  
}
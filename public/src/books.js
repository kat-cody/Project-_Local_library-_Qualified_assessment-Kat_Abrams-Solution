const { getBooksBorrowedCount } = require("./home");

function findAuthorById(authors, id) {
  
  return _findElementById(authors, id);
}

function findBookById(books, id) {
  
  return _findElementById(books, id);
}

function partitionBooksByBorrowedStatus(books) {
  
  const returned = true;
  
  const borrowed = !returned;
  
  const borrowedBooks = _filterBorrowed(books, borrowed);
  const returnedBooks = _filterBorrowed(books, returned);
  
  return [[...borrowedBooks], [...returnedBooks]];
}

function getBorrowersForBook({ borrows }, accounts) {
  
  const borrowers = [];
  
  for (let record in borrows) {
    
    const borrowId = borrows[record].id;
    const matchingAccount = _findElementById(accounts, borrowId);
    borrowers.push({ ...borrows[record], ...matchingAccount });
  }
  
  return borrowers.slice(0, 10);

  
}

function _findElementById(elements, id) {
  return elements.find((element) => element.id === id);
}


function _filterBorrowed(books, status) {
  return books.filter(({ borrows }) => status === borrows[0].returned);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
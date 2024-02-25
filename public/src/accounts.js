function findAccountById(accounts, id) {
 
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
    const sorted = [...accounts];
  sorted.sort((acnt1, acnt2) =>
    acnt1.name.last.toLowerCase() > acnt2.name.last.toLowerCase() ? 1 : -1
  );
  return sorted;

 }

function getTotalNumberOfBorrows(account, books) {
  
  const accountId = account.id;
  return books.reduce((totalBorrowed, { borrows }) => {
    
    if (borrows.some((record) => record.id === accountId)) totalBorrowed++;
    return totalBorrowed;
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  
  return (
    books
      
      .filter(
        (book) => book.borrows[0].id === account.id && !book.borrows[0].returned
      )
      
      .map((book) => {
        book["author"] = authors.find((author) => author.id === book.authorId);
        return book;
      })
  );
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
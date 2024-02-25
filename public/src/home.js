function getTotalBooksCount(books) {
  //use helperfunction to easily count books
  return arrayItemCount(books);
}

function getTotalAccountsCount(accounts) {
  
  return arrayItemCount(accounts);
}

function getBooksBorrowedCount(books) {
  
  return books.reduce((borrowCount, { borrows }) => {
    
    const mostRecent = borrows[0];
    if (!mostRecent.returned) borrowCount++;
    return borrowCount;
  }, 0);
}

function getMostCommonGenres(books) {
  
  return _sortNSlice(
    books
    
      .reduce((genres, book) => {
        
        const matchingGenre = genres.find((genre) => genre.name === book.genre);
        
        !matchingGenre
          ? genres.push({ name: book.genre, count: 1 })
          : matchingGenre.count++;
        return genres;
      }, [])
  );
}

function getMostPopularBooks(books) {

  return _sortNSlice(
   
    books.map(({ title, borrows }) => ({
      name: title, 
      count: arrayItemCount(borrows),
    }))
  );
}

function getMostPopularAuthors(books, authors) {
  
  return _sortNSlice(
    
    authors.map(({ name: { first, last }, id }) => ({
      name: `${first} ${last}`, 
      count: _authorBorrows(books, id), 
    }))
  );
}


function _sortNSlice(arr, slicer = 5) {
  const newArr = [...arr];
  return newArr
    .sort(({ count: count1 }, { count: count2 }) => count2 - count1)
    .slice(0, slicer);
}


function _authorBorrows(books, id) {
  return books.reduce((totalBorrows, { authorId, borrows }) => {
    if (authorId === id) totalBorrows += arrayItemCount(borrows);
    return totalBorrows;
  }, 0);
}


function arrayItemCount(item) {
  return item.length;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
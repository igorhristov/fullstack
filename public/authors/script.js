const AUTHORS_RUN = async () => {
  const d = document;
  const authors = await getAllAuthors().then(authors => {
    return authors.sort((a, b) => {
      return a.name > b.name ? 1 : -1;
    });
  });

  let currentPage = 0;
  const authorsPerPage = 10;
  const totalPages = Math.ceil(authors.length / authorsPerPage);

  d.querySelector('#root').innerHTML = Mustache.render(authorsTpl, {
    authors: authors.slice(
      currentPage * authorsPerPage,
      authorsPerPage * (currentPage + 1)
    ),
    pages: getPages(currentPage, totalPages),
    pagination: disabledPrevNext(currentPage, totalPages)
  });

  d.querySelector('#root').addEventListener('click', e => {
    if (e.target.matches('.page-numbers')) {
      e.preventDefault();

      currentPage = e.target.getAttribute('data-page') * 1;
      document.querySelector('#root').innerHTML = Mustache.render(authorsTpl, {
        authors: authors.slice(
          currentPage * authorsPerPage,
          authorsPerPage * (currentPage + 1)
        ),
        pages: getPages(currentPage, totalPages),
        pagination: disabledPrevNext(currentPage, totalPages)
      });
    }

    if (e.target.matches('.prev-next')) {
      e.preventDefault();

      e.target.getAttribute('data-prevNext') === 'next'
        ? currentPage++
        : currentPage--;
      document.querySelector('#root').innerHTML = Mustache.render(authorsTpl, {
        authors: authors.slice(
          currentPage * authorsPerPage,
          authorsPerPage * (currentPage + 1)
        ),
        pages: getPages(currentPage, totalPages),
        pagination: disabledPrevNext(currentPage, totalPages)
      });
    }
  });
};

AUTHORS_RUN();

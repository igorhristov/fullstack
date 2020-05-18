const AUTHORS_RUN = async () => {
  const d = document;
  const articles = await getArticles();
  const authors = await getAuthors().then(authors => {
    return authors.sort((a, b) => {
      return a.name > b.name ? 1 : -1;
    });
  });

  const getAuthorsAndArticlesNum = authors => {
    let authorsArr = [];
    for (let i = 0; i < authors.length; i++) {
      const articlesNum = articles.filter(article => {
        return article.authorId === authors[i].id;
      });
      authorsArr.push({
        id: authors[i].id,
        name: authors[i].name,
        avatar: authors[i].avatar,
        email: authors[i].email,
        username: authors[i].username,
        website: authors[i].website,
        bio: authors[i].bio,
        articlesNumber: articlesNum.length + ' ARTICLES'
      });
    }
    return authorsArr;
  };

  let currentPage = 0;
  const authorsPerPage = 10;
  const totalPages = Math.ceil(authors.length / authorsPerPage);

  d.querySelector('#root').innerHTML = Mustache.render(authorsTpl, {
    authors: getAuthorsAndArticlesNum(
      authors.slice(
        currentPage * authorsPerPage,
        authorsPerPage * (currentPage + 1)
      )
    ),
    pages: getPages(currentPage, totalPages),
    pagination: disabledPrevNext(currentPage, totalPages)
  });

  d.querySelector('#root').addEventListener('click', e => {
    if (e.target.matches('.page-numbers')) {
      e.preventDefault();

      currentPage = e.target.getAttribute('data-page') * 1;
      document.querySelector('#root').innerHTML = Mustache.render(authorsTpl, {
        authors: getAuthorsAndArticlesNum(
          authors.slice(
            currentPage * authorsPerPage,
            authorsPerPage * (currentPage + 1)
          )
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
        authors: getAuthorsAndArticlesNum(
          authors.slice(
            currentPage * authorsPerPage,
            authorsPerPage * (currentPage + 1)
          )
        ),
        pages: getPages(currentPage, totalPages),
        pagination: disabledPrevNext(currentPage, totalPages)
      });
    }
  });
};

AUTHORS_RUN();

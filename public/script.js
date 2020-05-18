const urlParams = new URLSearchParams(window.location.search);

const BLOG = async () => {
  const d = document;
  const tags = await getTags();
  const comments = await getComments();
  const authors = await getAuthors();
  const baseUrl = './';
  const articles = await getArticles().then(articles => {
    return articles.sort((a, b) => {
      return b.date > a.date ? 1 : -1;
    });
  });

  d.querySelector('#articlesNum').innerText = articles.length;

  const sortBtn = d.getElementById('sort-btn');
  sortBtn.addEventListener('click', () => {
    if (sortBtn.innerText === 'Sort by name') {
      const sortedByName = getArticleByAuthor(
        articles,
        authors,
        comments,
        tags
      );
      sortedByName.sort((a, b) => {
        return a.name > b.name ? 1 : -1;
      });

      d.querySelector('#root').innerHTML = Mustache.render(
        ARTICLE_CARD(baseUrl),
        {
          articles: sortedByName
        }
      );
      sortBtn.innerText = 'Sort by date';
    } else {
      d.querySelector('#root').innerHTML = Mustache.render(
        ARTICLE_CARD(baseUrl),
        {
          articles: getArticleByAuthor(articles, authors, comments, tags)
        }
      );
      sortBtn.innerText = 'Sort by name';
    }
  });

  let currentPage = 0;
  const articlesPerPage = 10;
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  const artTpl = ARTICLE_CARD(baseUrl);
  d.querySelector('#root').innerHTML = Mustache.render(artTpl, {
    articles: getArticleByAuthor(articles, authors, comments, tags).slice(
      currentPage * articlesPerPage,
      articlesPerPage * (currentPage + 1)
    ),
    pages: getPages(currentPage, totalPages),
    pagination: disabledPrevNext(currentPage, totalPages)
  });

  const tagArrValue = Object.keys(tags).map(x => ({ x, title: tags[x] }));
  d.querySelector('#selectRoot').innerHTML = Mustache.render(tagsBtnTpl('./'), {
    tagArrV: tagArrValue
  });
  d.querySelector('#root').addEventListener('click', e => {
    if (e.target.matches('.page-numbers')) {
      currentPage = e.target.getAttribute('data-page') * 1;
      document.querySelector('#root').innerHTML = Mustache.render(
        ARTICLE_CARD(baseUrl),
        {
          articles: getArticleByAuthor(articles, authors, comments, tags).slice(
            currentPage * articlesPerPage,
            articlesPerPage * (currentPage + 1)
          ),
          pages: getPages(currentPage, totalPages),
          pagination: disabledPrevNext(currentPage, totalPages)
        }
      );
    }

    if (e.target.matches('.prev-next')) {
      e.target.getAttribute('data-prevNext') === 'next'
        ? currentPage++
        : currentPage--;
      document.querySelector('#root').innerHTML = Mustache.render(
        ARTICLE_CARD(baseUrl),
        {
          articles: getArticleByAuthor(articles, authors, comments, tags).slice(
            currentPage * articlesPerPage,
            articlesPerPage * (currentPage + 1)
          ),
          pages: getPages(currentPage, totalPages),
          pagination: disabledPrevNext(currentPage, totalPages)
        }
      );
    }
  });
  const serachButton = d.getElementById('serach-btn');
  const serachBar = d.getElementById('search-bar');
  const serachTitle = d.getElementById('searchTitle');

  serachButton.addEventListener('click', () => {
    const name = authors.find(author => {
      if (author.name.toLowerCase().split(' ').includes(serachBar.value)) {
        return author.id;
      }
    });

    const results = articles.filter(article => {
      if (name) {
        if (article.authorId === name.id) {
          return article;
        }
      }

      const title = article.title.toLowerCase().slice(0, -1);
      if (title.split(' ').includes(serachBar.value)) {
        return article;
      }

      const tagSlug = [...article.tags]
        .map(x => tags[x].toLowerCase())
        .join(' ')
        .split(' ');
      if (tagSlug.includes(serachBar.value)) {
        return article;
      }
    });

    d.querySelector('#root').innerHTML = Mustache.render(
      ARTICLE_CARD(baseUrl),
      {
        articles: getArticleByAuthor(results, authors, comments, tags)
      }
    );

    serachTitle.innerText =
      'Searching found: ' +
      results.length +
      ' articles with ' +
      serachBar.value;
    d.querySelector('#articlesNum').innerText = results.length;
    sortBtn.className = 'invisible';
  });
};
BLOG();

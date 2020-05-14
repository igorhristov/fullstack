const TAG_PAGE_RUN = async () => {
  const d = document;
  const tags = await getTags();
  const comments = await getComments();
  const authors = await getAuthors();

  const articles = await getArticles();
  const urlParams = new URLSearchParams(window.location.search);
  const thisTag = urlParams.get('tag');
  const baseUrl = '../';

  d.querySelector('#tagNameId').innerText = thisTag;

  const tagsArticlesFilter = articles
    .filter(article => {
      if (article.tags.includes(thisTag.toLowerCase().split(' ').join('-'))) {
        return article;
      }
    })
    .sort((a, b) => {
      return b.date > a.date ? 1 : -1;
    });
  const sortBtn = d.getElementById('sort-btn');
  sortBtn.addEventListener('click', () => {
    if (sortBtn.innerText === 'Sort by name') {
      const sortedByName = getArticleByAuthor(
        tagsArticlesFilter,
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
          articles: getArticleByAuthor(
            tagsArticlesFilter,
            authors,
            comments,
            tags
          )
        }
      );
      sortBtn.innerText = 'Sort by name';
    }
  });
  const authors = await getAuthors();
  d.querySelector('#tagsArticlesNum').innerText = tagsArticlesFilter.length;

  let currentPage = 0;
  const articlesPerPage = 5;
  const totalPages = Math.ceil(tagsArticlesFilter.length / articlesPerPage);
  console.log(totalPages);

  const getPages = currentPage => {
    let pages = [];
    for (let i = 0; i < totalPages; i++) {
      pages.push({
        dataPage: i,
        label: i + 1,
        activeClass: currentPage === i ? 'active' : ''
      });
    }

    return pages;
  };
  const disabledPrevNext = currentPage => {
    let prevNextBtn = [
      {
        disabledPrev: currentPage === 0 ? 'disabled' : '',
        disabledNext: currentPage === totalPages - 1 ? 'disabled' : ''
      }
    ];
    return prevNextBtn;
  };

  d.querySelector('#root').innerHTML = Mustache.render(ARTICLE_CARD(baseUrl), {
    articles: getArticleByAuthor(
      tagsArticlesFilter,
      authors,
      comments,
      tags
    ).slice(currentPage * articlesPerPage, articlesPerPage * (currentPage + 1)),
    pages: getPages(currentPage),
    pagination: disabledPrevNext(currentPage)
  });

  const tags = await getTags();
  const tagArrValue = Object.values(tags);
  d.querySelector('#selectRoot').innerHTML = Mustache.render(
    tagsBtnTpl('../'),
    {
      tagArrV: tagArrValue
    }
  );
  d.querySelector('#defTag').innerText = thisTag;
  d.querySelector('#root').addEventListener('click', e => {
    if (e.target.matches('.page-numbers')) {
      currentPage = e.target.getAttribute('data-page') * 1;
      document.querySelector('#root').innerHTML = Mustache.render(
        ARTICLE_CARD(baseUrl),
        {
          articles: getArticleByAuthor(
            tagsArticlesFilter,
            authors,
            comments,
            tags
          ).slice(
            currentPage * articlesPerPage,
            articlesPerPage * (currentPage + 1)
          ),
          pages: getPages(currentPage),
          pagination: disabledPrevNext(currentPage)
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
          articles: getArticleByAuthor(
            tagsArticlesFilter,
            authors,
            comments,
            tags
          ).slice(
            currentPage * articlesPerPage,
            articlesPerPage * (currentPage + 1)
          ),
          pages: getPages(currentPage),
          pagination: disabledPrevNext(currentPage)
        }
      );
    }
  });

  const serachButton = d.getElementById('serach-btn');
  const serachBar = d.getElementById('search-bar');
  serachButton.addEventListener('click', () => {
    const results = tagsArticlesFilter.filter(article => {
      const title = article.title.toLowerCase().slice(0, -1);
      if (title.split(' ').includes(serachBar.value)) {
        return article;
      }
    });

    d.querySelector('#root').innerHTML = Mustache.render(
      ARTICLE_CARD(baseUrl),
      {
        articles: getArticleByAuthor(results, authors, comments, tags)
      }
    );
    d.querySelector('#tagsArticlesNum').innerText = results.length;
    sortBtn.className = 'invisible';
  });
};
TAG_PAGE_RUN();

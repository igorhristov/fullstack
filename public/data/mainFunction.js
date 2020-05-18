const getArticleByAuthor = (articles, authors, comment, tag) => {
  let articlesArr = [];

  for (let i = 0; i < articles.length; i++) {
    j = 0;

    const comments = comment.filter(comment => {
      return comment.articleId === articles[i].id;
    });

    while (j < authors.length) {
      if (articles[i].authorId === authors[j].id) {
        const newDate = new Date(articles[i].date).toDateString();

        const newTags = articles[i].tags.map(x => ({ x, title: tag[x] }));

        articlesArr.push({
          id: articles[i].id,
          date: newDate,
          title: articles[i].title,
          avatar: authors[j].avatar,
          name: authors[j].name,
          authorId: authors[j].id,
          summary: articles[i].summary,
          tags: newTags,
          numberOfComments: comments.length + ' Comments'
        });
      }
      j++;
    }
  }

  return articlesArr;
};

const disabledPrevNext = (cp, tp) => {
  let prevNextBtn = [
    {
      disabledPrev: cp === 0 ? 'disabled' : '',
      disabledNext: cp === tp - 1 ? 'disabled' : ''
    }
  ];
  return prevNextBtn;
};

const getPages = (cp, tp) => {
  let pages = [];
  for (let i = 0; i < tp; i++) {
    pages.push({
      dataPage: i,
      label: i + 1,
      activeClass: cp === i ? 'active' : ''
    });
  }

  return pages;
};

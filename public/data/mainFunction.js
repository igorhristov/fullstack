const getArticleByAuthor = (articles, authors, comminput, tagovi) => {
  let articlesArr = [];

  for (let i = 0; i < articles.length; i++) {
    j = 0;

    const comments = comminput.filter(comment => {
      return comment.articleId === articles[i].id;
    });

    while (j < authors.length) {
      if (articles[i].authorId === authors[j].id) {
        const newDate = new Date(articles[i].date).toDateString();

        const newTags = articles[i].tags.map(x => tagovi[x]);

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

const Mustache = require('mustache');
const saveHtmlPage = require('./saveHtmlPage');
const { articles } = require('../index.js');

const homepageTpl = require('../templates/homepage');

module.exports = async () => {
  const ITEMS_PER_PAGES = 10;
  const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGES);

  const createPagination = (currentPage, totalPages) => {
    const pages = Array(totalPages)
      .fill(0)
      .map((_, ix) => {
        return {
          activeClass: ix === currentPage ? 'active' : '',
          dataPage: ix, // index.html
          pageUrl: ix === 0 ? './' : `page-${ix}.html`,
          label: ix + 1
        };
      });

    return {
      disabledPrev: currentPage === 0 ? 'disabled' : '',
      disabledNext: currentPage === totalPages - 1 ? 'disabled' : '',
      nextHref: `page-${currentPage + 1}.html`,
      prevHref:
        currentPage === 1 ? 'index.html' : `page-${currentPage - 1}.html`,
      pages: pages
    };
  };

  await Promise.all(
    Array(totalPages)
      .fill(0)
      .map((_, ix) => {
        const output = Mustache.render(homepageTpl(), {
          articles: articles.slice(
            ix * ITEMS_PER_PAGES,
            ITEMS_PER_PAGES * (ix + 1)
          ),
          pagination: createPagination(ix, totalPages)
        });

        const filename = ix === 0 ? 'index.html' : `page-${ix}.html`;
        return saveHtmlPage(filename, output);
      })
  );
};

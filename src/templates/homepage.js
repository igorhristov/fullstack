const createHeader = require('./createHeader');
const createFooter = require('./createFooter');
const createArticleCard = require('./createArticleCard');

module.exports = () => {
  const homepageHeader = createHeader();
  const homepageFooter = createFooter();
  const homepageCards = createArticleCard();
  return `
    ${homepageHeader}
    ${homepageCards}

    <div class="container">
        <div class="row">
            <nav class="m-auto">
                <ul class="pagination">
                    {{ #pagination }}
                        <li class="page-item {{ disabledPrev }}">
                            <a class="page-link prev-next" href="{{ prevHref }}" tabindex="-1" data-prevNext='prev'>Previous</a>
                        </li>
                        {{ #pages }}
                            <li class="page-item {{ activeClass }}">
                                <a class="page-numbers page-link" href="{{ pageUrl }}" data-page= {{ dataPage }}>{{ label }}</a>
                            </li>
                        {{ /pages }}
                        <li class="page-item {{ disabledNext }}">
                            <a class="page-link prev-next" href="{{ nextHref }}" data-prevNext='next'>Next</a>
                        </li>
                    {{ /pagination }}
                </ul>
            </nav>
        </div>       
    </div> 

    ${homepageFooter}`;
};

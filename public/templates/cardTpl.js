const ARTICLE_CARD = (urlBase = './') => {
   return `
    <div class="container">
        <div class="row">
            <div class="px-md-4 text-center m-2">
                {{#articles}}
                    <div class="card my-3">
                        <div class="card-body bg-dark text-light border border-info shadow rounded">
                            <p class="text-left">Article:  
                                <span class='text-muted ml-2 ml-md-3'>{{ date }}</span>
                            </p>
                            
                            <a class="card-link text-warning" href="${urlBase}article/?id={{ id }}">
                                <h3 class="text-center mb-4"> {{ title }} </h3>
                            </a>
                            <div class="row">
                                        <div class="col-12  col-md-3 col-xl-3">
                                            <img src="{{ avatar }}" class="rounded-circle" width="90" height="90">
                                        </div>
                                        <div class="col-12  col-md-4 col-xl-3 my-3 my-md-0">
                                            <span class="text-muted text-center">
                                                Author
                                            </span> </br>
                                            <span class="text-center">
                                                <a class="card-link rounded-pill border border-warning text-warning pb-1 px-2" href="${urlBase}author/?id={{ authorId }}">
                                                {{ name }} 
                                                </a>
                                            </span>
                                        </div>
                                        
                                        <div class="col-12  col-md-4 col-xl-3 ml-auto ml-md-0">
                                            <span class="text-muted text-center">
                                                {{ numberOfComments }}
                                            </span> </br>
                                            <a class="card-link rounded-pill border border-warning text-warning pb-1 px-2" href="${urlBase}article/?id={{ id }}#commentReplay"> 
                                                Join Conversation -> 
                                            </a>
                                        </div>
                                </div>
                            <div class="message text-left mt-4 mb-2">                   
                                <p class="card-text">{{ summary }}..</p>
                            </div>
                            <div class="actions mb-4">
                                <a href="${urlBase}article/?id={{ id }}" class="card-link btn btn-outline-warning">Read More >>></a>
                            </div>
                            <div class="row ">
                                <div class="text-center mx-auto">
                                    {{#tags}}
                                    
                                        <a href="${urlBase}tags/?tag={{ . }}" class="card-link rounded-pill border border-info text-info pb-1 px-2 mx-2 ml-md-4"> {{ . }} </a>

                                    {{/tags}}
                                </div>
                            </div>
                        </div>
                    </div>
                {{/articles}}
            </div>
        </div>
    </div>

    <div class="container-fluid">
        <div class="row">
            <nav class="mx-auto">
                <ul class="pagination pagination-sm">

                {{ #pagination }}
                    <li class="page-item {{ disabledPrev }}">
                        <a class="page-link prev-next" href="#" tabindex="-1" data-prevNext='prev'>Previous</a>
                    </li>

                        {{ #pages }}
                            <li class="page-item d-none d-md-block {{ activeClass }}">
                                <a class="page-numbers page-link" href="#" data-page= {{ dataPage }}>{{ label }}</a>
                            </li>
                        {{ /pages }}

                    <li class="page-item {{ disabledNext }}">
                        <a class="page-link prev-next" href="#" data-prevNext='next'>Next</a>
                    </li>
                {{ /pagination }}

                </ul>
            </nav>
        </div>       
    </div>
`
};

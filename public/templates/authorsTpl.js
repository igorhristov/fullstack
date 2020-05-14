const authorsTpl = 
`
    <div class="container-fluid px-5">
        <div class="row">
            {{#authors}}
                <div class="col-12 col-sm-6 col-md-4 col-xl-3">
                    <div class="card my-3 border-0 bg-dark">
                        <div class="card-body text-light text-center border border-info rounded shadow">
                            <img src="{{ avatar }}" class="rounded-circle border border-warning border-top-0" width="128" height="128">
                            
                            <a class="card-link text-warning" href="../author/?id={{ id }}">
                                <h3>{{ name }}</h3>
                            </a>
                            <div class="message">                   
                                <p class="card-text">{{ bio }}</p>
                            </div>
                            <div class="actions">
                                <a href="{{ website }}" class="card-link"><img src="../assets/www.png" width='64'></a>
                                <a href="{{ email }}" class="card-link"><img src="../assets/mail.png" width='32'></a>
                            </div>
                            <p class="my-0"> {{ articlesNumber }}</p>
                            <hr class="w-100 mb-1 mt-0 rounded-pill bg-warning" />
                        </div>
                    </div>
                </div>    
            {{/authors}}
        </div>
    </div>
    <div class="container">
        <div class="row">
            <nav class="m-auto">
                <ul class="pagination">

                    {{ #pagination }}
                        <li class="page-item {{ disabledPrev }}">
                            <a class="page-link prev-next" href="#" tabindex="-1" data-prevNext='prev'>Previous</a>
                        </li>

                        {{ #pages }}
                            <li class="page-item {{ activeClass }}">
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
`;

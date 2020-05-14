const authorTpl = 
`
    {{#author}}
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb bg-dark" style="padding-left: 50px">
                <li class="breadcrumb-item"><a href="../">Home</a></li>
                <li class="breadcrumb-item active" aria-current="page">Author</li>
            </ol>
        </nav>
        <img src="{{ avatar }}" class="rounded-circle border border-warning border-top-0 ml-5 mx-auto" width="128" height="128">
        <h2 class="font-weight-bold text-warning mt-2 mx-auto text-center"> {{name}} </h2>
        <p class="lead text-center mx-auto p-2">{{ bio }}</p>
        <p class="ml-5 text-info my-1 mx-auto">{{ website }}</p>
        <p class="ml-5 text-info my-0 mx-auto">{{ email }}</p>
        <p id="authorNumArticles" class="text-right mr-5 my-0 mx-auto">3 Articles</p>
    {{/author}}
`;
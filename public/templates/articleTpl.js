const artcleTpl = `
    <div class="row col-sm-12">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb bg-dark" >
                <li class="breadcrumb-item"><a href="../">Home</a></li>
                <li class="breadcrumb-item active" aria-current="page">Article</li>
            </ol>
        </nav>
        <hr class="w-100 mb-3 p-1 rounded-pill bg-warning" />
        
        
            
            {{#article}}
            
                <div class="col-sm-12">
                <p class="lead ml-4  position-relative">{{ date }}</p> 
                    <div class="row ">
                    {{#authorAvatarAndName}}
                        <img src="{{ avatar }}" class="rounded-circle border border-warning border-top-0 ml-5" width="80" height="80">
                        <h1 class="display-5 d-inline font-weight-bold text-light mt-3 ml-5"> {{name}} </h1>
                    {{/authorAvatarAndName}}
                    </div>
                
                  
                    <h2 class=" font-weight-bold text-warning font-italic pt-5 mt-18 ml-4"> {{ title }} </h2>
                    <p class="p-3 px-4"> {{{ body }}}</p>
                    <div class="row">
                        {{ #tags }}
                            <a href="../tags/?tag={{ x }}" class=" card-link rounded-pill border border-info text-info  pb-1 px-2 ml-5 mb-2"> {{ title }} </a>
                        {{ /tags }}
                    </div>
                </div>
                <hr class="w-100 mb-3 p-1 rounded-pill bg-warning" />
            </div>
            <div class="container mb-5 mt-5  ">
                <h3 id="commentReplay" class="mb-2 text-warning">Leave replay</h3>
                <form action="/api/comments/?id={{id}}"  method="POST">
                    <div class="form-group mb-4">
                    <label for="name">Enter Name</label>
                        <textarea class="form-control" type="text" name="name" id="name" rows="3" placeholder="New Comment!"></textarea>
                    </div>
                
                    <button type="submit" class="btn btn-warning mb-2 ml-auto font-weight-bold text-dark">Post Comment</button>
                </form>
            </div>        
    
    {{/article}}
    {{#comments}}
        <div class='container'>
        <p><span>{{date}}</span></p>
        <div class="row ml-0 pb-3">
            <img src="{{ avatar }}" class="rounded-circle border border-light border-top-0" width="35" height="35">
            <h4 class="font-italic font-weight-light text-warning ml-2 mt-2  "> {{name}} </h4>
            </div>
            <p>{{{ body }}}</p>
            <hr class="w-100 mb-3 rounded-pill bg-warning" />
        </div>
    {{/comments}}
    
  
`;

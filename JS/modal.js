export class MovieModal{
    constructor(modalContainer,movieCard,eventsMediator){
      this.eventsMediator=eventsMediator
        this.modalContainer =modalContainer
        this.movieCard = movieCard
        this.render()
        this.bindEvents()
    }
    bindEvents(){
      this.eventsMediator.on("MovieCardSelected", this.ChangeMovieInfo.bind(this))
    }
    ChangeMovieInfo(data){
      this.movieCard=data
      this.render()
    }
    render(){
      console.log("modal render" , this.movieCard)
      this.modalContainer.html(`
      <div class="modal fade" id=${ "target" +this.movieCard.id.toString()} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body  my-modal-body container ">
              <div class="row">
                <div class="p-0 m-2 col-lg-5 col-md-10 col-sm-10 col-xs-10"><img src="https://image.tmdb.org/t/p/original${this.movieCard.poster_path}" alt="${this.movieCard.original_title}" class="modal-img"></div>
                <div class="m-2 col-lg-5 col-md-10 col-sm-10 col-xs-10">
                  <h1 class="modal-title"> ${this.movieCard.original_title}</h1>
                  <h3>IMDB Rating : ${this.movieCard.vote_average}/10 (${this.movieCard.vote_count}votes)</h3>
                  <p class="place-description">${this.movieCard.overview}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        `)
    }
}
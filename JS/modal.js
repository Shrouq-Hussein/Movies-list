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
            <div class="modal-body  my-modal-body  ">
                <div class="p-0 me-2"><img src="https://image.tmdb.org/t/p/original${this.movieCard.poster_path}" alt="${this.movieCard.original_title}" class="modal-img"></div>
                <div class=" ms-2 movieInfo">
                  <h4 class=" mb-2"> ${this.movieCard.original_title}</h4>
                  <h5 class="my-2">IMDB Rating : ${this.movieCard.vote_average}/10 (${this.movieCard.vote_count}votes)</h5>
                  <p class="  my-2">${this.movieCard.overview}</p>
                </div>
            </div>
          </div>
        </div>
      </div>
        `)
    }
}
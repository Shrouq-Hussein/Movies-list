import { Stat } from "./stat.js"
import { PopularMoviesPage } from "./popularMovies.js"
import { EventsMediator } from "./mediator.js"


class PopularMoviesController {

    constructor() {
        this.eventsMediatorObj = new EventsMediator()
        this.currentPage = new PopularMoviesPage(this.eventsMediatorObj)
        this.casheElements()
        this.bindEvents()

    }

    casheElements() {
        this.$previousBtn = $(".previousBtn")
        this.$nextBtn = $(".nextBtn")
        this.$lodsRoller = $(".lods-roller-container")
        this.$stats = $("#stats")

    }
    bindEvents() {
        this.$nextBtn.on("click", function () {
            this.currentPage.pageNum+=1
            this.eventsMediatorObj.emit("changePage",  this.currentPage.pageNum )

        }.bind(this))
        this.$previousBtn.on("click", function () {
            if(this.currentPage.pageNum > 1){
            this.currentPage.pageNum-=1
            this.eventsMediatorObj.emit("changePage",  this.currentPage.pageNum )
            }
           
        }.bind(this))

        this.eventsMediatorObj.on("moviesChanged",this.changeState.bind(this))
    }
    changeState(currentPge){
        this.statObj = new Stat(currentPge.pageNum, currentPge.moviesNum,currentPge.topRated)
        this.$stats.html("")
        this.$stats.append(`
        <p>
        Current page: ${ this.statObj._currentPage}<br>
        Number of movies: ${ this.statObj._numMovies}<br>
        Top rated movie: ${ this.statObj._topRatedMovie.original_title}<br>
        Rating: ${ this.statObj._topRatedMovie.vote_average}<br>
        </p>
        `)
        this.$lodsRoller.css("display","none")
    }
}





var obj = new PopularMoviesController()


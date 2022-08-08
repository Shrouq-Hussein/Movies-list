import { MovieModal } from './modal.js'
export class PopularMoviesPage {
    constructor(EventsMediator) {
        // fetch api -> success render
        //cache elements
        //bind events
        console.log("constructor page", EventsMediator)
        this.eventsMediator = EventsMediator
        this.init()
        this.casheElements()
        this.bindEvents()
    }
    init() {
        this.pageNum = 1
        this._moviesList = []
        this._moviesNum = 0
        this.fetchMovies(this.pageNum)
    }
    set moviesList(list) {
        console.log("set")
        this._moviesList = list

    }
    get moviesList() {
        console.log("get")

        return this._moviesList

    }

    set moviesNum(num) {
        this._moviesNum = num

    }
    get moviesNum() {
        return this._moviesNum

    }
    set topRated(top) {
        this._topRated = top
    }
    get topRated() {
        return this._topRated
    }
    set pageNum(num) {
        this._pageNum = num
    }
    get pageNum() {
        return this._pageNum
    }

    fetchMovies(pageNum) {
        console.log("fetch")

        $.ajax(
            {
                type: "GET"
                ,
                url: `https://api.themoviedb.org/3/movie/popular?api_key=6c9c4c56e8227e908b48749ca27f8c65&language=en-US&page=${pageNum}`
                ,
                success: function (data) {
                    console.log("success")
                    this._moviesList = data.results
                    //
                    this._moviesNum = data.results.length
                    this._topRated = this.getTopRatedMovie()
                    this.MovieModal = new MovieModal($("#modalContainer"), this._moviesList[0], this.eventsMediator)
                    //
                    this.eventsMediator.emit("moviesChanged", { pageNum: pageNum, moviesNum: this._moviesNum, topRated: this._topRated, })
                    this.render()
                }.bind(this)
                ,

            }
        )


    }

    getTopRatedMovie() {
        var top = this._moviesList[0]
        for (let movie of this._moviesList) {
            if (movie.vote_average > top.vote_average) {
                top = movie
            }
        }
        return top
    }
    casheElements() {
        this.$moviesContainer = $("#moviesContainer")

    }
    bindEvents() {
        var self = this;
        this.$moviesContainer.on("mouseover", ".card", function () {
            var currentCardId = $(this).attr("id")
            console.log(currentCardId)
            for (let m of self._moviesList) {
                if (m.id == currentCardId) {
                    self.eventsMediator.emit("MovieCardSelected", m)
                    // console.log("---------",self.MovieModal.movieCard)
                }
            }
        })

        this.eventsMediator.on("changePage", this.fetchMovies.bind(this))

    }

    render() {
        this.$moviesContainer.html("")
        for (let movie of this._moviesList) {
            this.$moviesContainer.append(`
        <div class="col-sm-10 col-md-5 col-lg-3 card m-2"  id=${movie.id.toString()} data-bs-toggle="modal" data-bs-target=${"#" + "target" + movie.id.toString()} >
            <img src="https://image.tmdb.org/t/p/original${movie.poster_path}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title ">${movie.original_title}</h5>
                <p class="card-text">${movie.vote_average} </p>
            </div>
        </div>
        `)
        }

    }
   
}


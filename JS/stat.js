export class Stat{
    constructor(currentPage,numMovies,topRatedMovie){
     this.currentPage = currentPage
     this.numMovies = numMovies
     this.topRatedMovie = topRatedMovie
    }
 
    set currentPage(pageNum){
     this._currentPage=pageNum
    }
    set numMovies(num){
     this._numMovies=num
    }
    set topRatedMovie(movie){
     this._topRatedMovie=movie
    }
   
 
    get currentPage(){
     return this._currentPage
    }
    get numMovies(){
     return  this._numMovies
    }
    get topRatedMovie(){
     return this._topRatedMovie
    }
  
 }
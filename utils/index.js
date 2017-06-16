'use strict';
const createResponse = (intent, tvshow) => {
  if(movie.Response === "True"){
    let{
      Title,
      Year,
      Plot,
      Director,
      Actors,
      Poster
    } = tvshow;

    switch(intent){
      case 'tvInfo':{
        let str = `${title} (${Year}). This was directed by ${Director} and starred ${Actors}. ${Plot}`.subString(0,320);
        return{
          text: str,
          image: Poster
        }
      }
    }
  }
  else{
    return{
      text: "I don't seem to understand.",
      image: null
    }
  }
}

module.exports = createResponse;

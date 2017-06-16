'use strict';

const config = require('../config');
const request = require("request");
const getInfo = data => {
  let intent = data.entities.intent[0].value || "tvInfo";
  let tvshow = data.entities.tvshow && data.entities.tvshow[0].value || null;
  let releaseYear = data.entities.releaseYear && data.entities.releaseYear[0]. value || null;
  return new Promise((resolve, reject) => {
    if(tvshow){
      //Fetch from OMDB
      // resolve(`Finding details about ${tvshow}`);
      request({
        uri: "https://api.themoviedb.org/3/search/multi?api_key=92b2df3080b91d92b31eacb015fc5497&",
        qs: {
          query: tvshow
          // plot: "short",
          // y: releaseYear,
          // r: 'json',
          // apiKey: config.OMDB_API_KEY
        },
        method: "GET"
      }, (error, response, body) => {
        if(!error && response.statusCode == 200){
          resolve(JSON.parse(body))
        }
        else{
          reject(error);
        }
      });
    }
    else{
      reject('Entities not found!');
    }
  });
}

module.exports = getInfo;

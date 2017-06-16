'use strict';

const config = require('../config');
const request = require("request");
const createResponse = require("../utils");
const getInfo = data => {
  let intent = data.entities.intent && data.entities.intent[0].value || "tvInfo";
  let tvshow = data.entities.tvshow && data.entities.tvshow[0].value || null;
  let releaseYear = data.entities.releaseYear && data.entities.releaseYear[0]. value || null;
  return new Promise((resolve, reject) => {
    if(tvshow){
      //Fetch from OMDB
      // resolve(`Finding details about ${tvshow}`);
      request({
        uri: "http://www.omdbapi.com",
        qs: {
          t: tvshow,
          plot: "short",
          y: releaseYear,
          r: 'json',
          apiKey: config.OMDB_API_KEY
        },
        method: "GET"
      }, (error, response, body) => {
        if(!error && response.statusCode == 200){
          // var obj = JSON.parse(body);
          // resolve(obj.results[0]);
          resolve(JSON.parse(body));
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

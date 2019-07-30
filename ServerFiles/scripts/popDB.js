const mongoose = require("mongoose");
const db = require("../models");
const axios = require("axios");
const fs = require('fs');
const gamesURL = "https://www.giantbomb.com/api/games/";
const apiKey = "?api_key=" + process.env.BOMBAPI_KEY;
const formatOffset = "&format=json&offset=";
const moment = require('moment');
moment().format();

// URL will be used to store the changing API to get the next page of games
var URL = ""; 

// This file empties the games collection and inserts the giant bomb data below

mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/games", { useNewUrlParser: true });

// get initial JSON from API call
function genApiURL ( offset ) {
  URL = gamesURL + apiKey + formatOffset + offset;
  return URL;
};

//a quick for loop to place all available platforms in an array
function getPlats(doc) {
  const plats = [];
  for (let i = 0; i < doc.data.platforms.length; i++) {
    plats.push(doc.data.platforms[i].abbreviation);
  }
  return plats;
}

async function twitchLookup ( gamename ) {
  twitchURL = "https://api.twitch.tv/helix/streams?giantbomb_id="
  await axios.get(twitchURL, {headers: {"Client-ID": process.env.TWITCH_CLIENT_ID}})
  .then( (response) => {
    console.log(response);
    return response;
  })
};

// makes the API call to GB for each 100 game page of data
async function giantBombAPICall (offset, dataAccum) {
  let URL = genApiURL(offset);
  await axios.get(URL)
  .then( (response) => {
    const maxOffset = response.data.number_of_total_results;
    const currentOffset = response.data.offset
    const offsetStore = response.data.number_of_page_results;
    const limit = response.data.limit;
    // for testing code below changed from < maxOffset - limit to 300 to test popDB with 100 results
    if (currentOffset + offsetStore < maxOffset - limit) {
      bombDB(currentOffset + offsetStore, response, dataAccum);
    } else {
      console.log("Giant Bomb download complete!");
      fs.writeFile("dataAccum.json", JSON.stringify(dataAccum, null, "  "),function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
    }  
  })  
}

// populates database with Giant Bomb DB info
function bombDB ( offset, result, dataAccum) {
  console.log("Getting offset #" + offset);
  dataAccum = [...dataAccum, ...result.data.results]; 
  for (let i=0; i < result.data.results.length; i++) {
    const gbgame = result.data.results[i];
    db.GiantBomb.create({data: gbgame})
    .then(async doc => {

      const nameDoc = {
        hotdropid: doc._id,
        releaseyear: parseInt(moment(doc.data.original_release_date).format('YYYY')),
        gbid: doc.data.id,
        guid: doc.data.guid,
        steamid: "",
        twitchid: "",
        name: doc.data.name,
        aliases: doc.data.aliases,
        tinyimageURL: doc.data.image.tiny_url
      }

      await db.NameID.create(nameDoc);
      const infoDoc = {
        hotdropid: doc._id,
        platforms: getPlats(doc),
        description: doc.data.description,
        releasedate: doc.data.original_release_date,
        imageURL: doc.data.image.medium_url,
        dateupdated: Date.now(),
        releasedate: doc.data.original_release_date,
        comments: []
      }
      console.log(infoDoc.platforms);
      //console.log(infoDoc);
      await db.Info.create(infoDoc);
    })
    .catch(err => {
      console.error(err)
    });
  }
  giantBombAPICall(offset, dataAccum);
}; 

giantBombAPICall(14100,[]);

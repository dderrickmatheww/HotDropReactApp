const mongoose = require("mongoose");
const db = require("../models");
const axios = require("axios");
var fs = require('fs');
const gamesURL = "https://www.giantbomb.com/api/games/";
const apiKey = "?api_key=" + process.env.BOMBAPI_KEY;
const formatOffset = "&format=json&offset=";
// URL will be used to store the changing API to get the next page of games
var URL = ""; 

// This file empties the games collection and inserts the giant bomb data below

mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/games", { useNewUrlParser: true });

// get initial JSON from API call
function genApiURL ( offset ) {
  URL = gamesURL + apiKey + formatOffset + offset;
  return URL;
};

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
    if (currentOffset + offsetStore < 300) {
      bombDB(currentOffset + offsetStore, response, dataAccum);
    } else {
      console.log("Giant Bomb download complete!");
      fs.writeFile("dataAccum.json", JSON.stringify(dataAccum, null, "  "),function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
    }  
  })  
;}

// populates database with Giant Bomb DB info
function bombDB ( offset, result, dataAccum) {
  console.log("Getting offset #" + offset);
  dataAccum = [...dataAccum, ...result.data.results]; 
  for (i=0; i < result.data.results.length; i++) {
    const gbgame = result.data.results[i];
    db.GiantBomb.create({data: gbgame})
    .then(async doc => {
      //console.log(doc.data.name);
      const nameDoc = {
        hotdropid: doc._id,
        gbid: doc.data.id,
        guid: doc.data.guid,
        steamid: "",
        twitchid: "",
        name: doc.data.name,
        tinyimageURL: doc.data.image.tiny_url
      }
      //console.log(nameDoc);
      await db.NameID.create(nameDoc);

      const infoDoc = {
        hotdropid: doc._id,
        description: doc.data.description,
        releasedate: doc.data.original_release_date,
        imageURL: doc.data.image.medium_url,
        aliases: doc.data.aliases,
        dateupdated: Date.now(),
        releasedate: doc.data.original_release_date,
        comments: []
      }
      //console.log(infoDoc);
      await db.Info.create(infoDoc);
    })
    .catch(err => {
      console.error(err)
    });
  }
  giantBombAPICall(offset, dataAccum);
}; 

giantBombAPICall(0,[]);
// if the above screw up use async.each
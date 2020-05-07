const request = require('request');

const geocoding = function(address, callback){

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?limit=1&access_token=pk.eyJ1IjoiZG91bGFoZWxwZXIiLCJhIjoiY2s5aG00eTcxMTA0ZTNrbnczZHB2a2c3MyJ9.dG_Yim6ZBdJnJCVSTbYACw';

    request({url, json: true}, (err, { body }) => {

        if(err){
            callback(`API call filed due error. ${err.code}: ${err.message}`, undefined);

        }else{
            if(body.message){
                callback(body.message, undefined);
            }else if(body.features.length === 0 ){
                callback(`There is no data found for: ${address}`, undefined);
            }else{
                callback(undefined, { 
                    place_name: body.features[0].place_name,
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0], 
                    geometry: body.features[0].geometry,
                    bbox: body.features[0].bbox
                });
            }
        }
    });
}

module.exports = geocoding;
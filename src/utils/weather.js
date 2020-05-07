const request = require('request');

const weather = function(latitude, longitude, callback){

    const url = 'http://api.weatherapi.com/v1/current.json?key=667acd04893144c6a4e30827202704&q=' + latitude + ',' + longitude;

    request({url, json:true}, (err, { body }) => {
        if(err){
            callback(`Weather API call filed due error. ${err.code}: ${err.message}`, undefined);
        }else{
            if(body.error){
                callback(`${body.error.code}: ${ody.error.message}`, undefined);
            }else if(body.current.length === 0 ){
                callback(`There is no data found for: ${latitude}, ${longitude}`, undefined);
            }else{
                callback(undefined, {
                    name: body.location.name,
                    region: body.location.region,
                    country: body.location.country,
                    time_zone: body.location.tz_id,
                    temp_c: body.current.temp_c,
                    temp_f: body.current.temp_f,
                    humidity: body.current.humidity,
                    precip_mm: body.current.precip_mm,
                    precip_in: body.current.precip_in,
                    wind_dir: body.current.wind_dir
                });
            }
        }
    });
}

module.exports = weather;
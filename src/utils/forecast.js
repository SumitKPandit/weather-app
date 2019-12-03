const request = require('request');

const forcast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/8916bddcfd09ed40bf61517301491b2a/' + latitude + ',' + longitude + '?units=si';
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined);
        } else if(body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + Math.round(body.currently.temperature) + ' degrees out. There is a ' + Math.round(body.currently.precipProbability * 100) + '% chance of rain.' + 'The high today is ' + Math.round(body.daily.data[0].temperatureHigh) + ' with a low of ' + Math.round(body.daily.data[0].temperatureLow) + '.');
        };
    });
};

module.exports = forcast;
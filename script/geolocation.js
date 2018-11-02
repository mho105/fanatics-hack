const nodeGeocoder = require('node-geocoder');
const parseString = require('xml2js').parseString;
const csv = require("fast-csv");
const fs = require('fs');

let json = [];

function getGeoLocation(addresses) {
    var options = {
        provider: 'here',

        appId: 'xXk9XTGXpGB4Nrv7b1Zk',
        appCode: 'ccQxGFU4LIjaKBj8NfZMmg',
        formatter: 'gpx'
    };

    var geocoder = nodeGeocoder(options);

    // for (let address of addresses) {

    //     geocoder.geocode(address)
    //     .then(function(res) {
    //         parseString(res, function (err, result) {
    //             let geolocation = result.gpx.wpt[0].$;
    //             json.push({
    //                 'lat': geolocation.lat,
    //                 'lng': geolocation.lon
    //             });
    //         });
    //     })
    //     .catch(function(err) {
    //     console.log(err);
    //     });
    // }
    let promises = [];
    for (let address of addresses) {
        promises.push(geocoder.geocode(address));
    }

    Promise.all(promises)
        .then(function (res) {
            for (let r of res) {
                parseString(res, function (err, result) {
                    let geolocation = result.gpx.wpt[0].$;
                    json.push({
                        'lat': geolocation.lat,
                        'lng': geolocation.lon
                    });
                });
            }
            console.log(json)
        });
};

function convertCsv() {
    var stream = fs.createReadStream("data.csv");
    let lines = [];

    csv
        .fromStream(stream, { headers: false })
        .on("data", function (data) {
            lines.push(data[0]);
        })
        .on("end", function () {
            console.log("done reading csv file");
            getGeoLocation(lines);
        });
}

convertCsv();
//module.exports = getlaLon




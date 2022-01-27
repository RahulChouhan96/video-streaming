// - `name` : *string*
// - `url` : *string*
// - `thumbnailUrl` : *string*
// - `isPrivate` : *boolean*
// - `timesViewed` : *int*

const fs = require("fs");

module.exports.createData = function () {
    const data = [];

    for (let num = 1; num <= 1000; num++) {
        data.push({
            name: "video" + num,
            url: "https://tldv.com/video" + num,
            thumbnailUrl: "https://tldv.com/thumbnail/video" + num,
            isPrivate: (num % 2 == 0) ? true : false,
            timesViewed: num,
        });
    }

    fs.writeFileSync("data.json", JSON.stringify(data));
}
let url = "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match/";
console.log(url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)[0] == url);
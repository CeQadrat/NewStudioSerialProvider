const getPage = require('./getPageRequest');
const serialListParser = require('./parsers/newStudioSerialListParser');
const searchParser = require('./parsers/newStudioSearchParser');

// getPage('http://newstudio.tv/').then((body) => {
//     for(let serial of serialListParser.parse(body)){
//         console.log(serial);
//     }
// });

getPage('http://newstudio.tv/viewforum.php?f=394').then((body) => {
    console.log(searchParser.parse(body));
});
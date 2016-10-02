const getPage = require('./getPageRequest');
const serialListParser = require('./parsers/newStudioSerialListParser');
const searchGenerator = require('./generators/newStudioSearchGenerator');
const  co = require('co');

// getPage('http://newstudio.tv/').then((body) => {
//     for(let serial of serialListParser.parse(body)){
//         console.log(serial);
//     }
// });

co(searchGenerator('http://newstudio.tv/viewforum.php?f=394')).then((episodes) => {
    console.log(episodes);
}).catch(console.error);

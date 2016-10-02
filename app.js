const getPage = require('./getPageRequest');
const serialListParser = require('./parsers/newStudioSerialListParser');
const searchGenerator = require('./generators/newStudioSearchGenerator');
const episodeGenerator = require('./generators/newStudioSeriesGenerator');
const episodeParser = require('./parsers/newStudioEpisodeParser');
const co = require('co');

// getPage('http://newstudio.tv/').then((body) => {
//     for(let serial of serialListParser.parse(body)){
//         console.log(serial);
//     }
// });

co(searchGenerator('http://newstudio.tv/viewforum.php?f=394')).then((episodes) => {
    let generator = episodeGenerator(episodes);
    generator.next().value.then((ep) => {
        console.log(ep);
        generator.next().value.then((ep) => {
            console.log(ep);
        });
    });
}).catch(console.error);

// getPage('http://newstudio.tv/viewtopic.php?t=20761').then((body) => {
//     console.log(episodeParser.parse(body));
// });

const getPage = require('./getPageRequest');
const searchParser = require('./parsers/newStudioSearchParser');

getPage('http://newstudio.tv/').then((body) => {
    console.log(searchParser.parse(body));
});
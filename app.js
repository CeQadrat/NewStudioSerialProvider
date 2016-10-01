const getPage = require('./getPageRequest');

getPage('http://newstudio.tv/').then((body) => {
    console.log(body);
});
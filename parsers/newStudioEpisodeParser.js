const htmlParser = require('htmlparser2');

module.exports = {
    parse(page){
        return this._parse(page);
    },
    _parse(page){
        let enableParseText = false;
        let enableParseSerialName = false;
        let enableParseSeason = false;
        let enableParseSeries = false;
        let enableParseName = false;
        let enableParseInfo = false;
        let episode = {};
        episode.torrentLinks = [];
        let torrent = {
            link: '',
            info: ''
        };
        let parser = new htmlParser.Parser({
            onopentag: (name, attribs) => {
                if (name == 'var' && attribs.class == 'postImg' && !episode.serialCover) {
                    episode.serialCover = attribs.title;
                }
                if (name == 'span' && (attribs.class == 'post-b' || attribs.class == 'post-u')) {
                    enableParseText = true;
                }
                if (name == 'a' && attribs.class == 'seedmed') {
                    torrent.link = 'http://newstudio.tv/' + attribs.href;
                    episode.torrentLinks.push(torrent);
                    torrent = {};
                }
            },
            ontext: (text) => {
                if (enableParseSerialName) {
                    episode.serialName = text;
                    enableParseSerialName = false;
                }
                if (enableParseText && text == 'Сериал:') {
                    enableParseSerialName = true;
                }
                if (enableParseSeason) {
                    episode.season = text.slice(1, -2);
                    enableParseSeason = false;
                }
                if (enableParseText && text == 'Сезон:') {
                    enableParseSeason = true;
                }
                if (enableParseSeries) {
                    episode.series = text.slice(1);
                    enableParseSeries = false;
                }
                if (enableParseText && text == 'Серия:') {
                    enableParseSeries = true;
                }
                if (enableParseName) {
                    episode.name = text.slice(1);
                    enableParseName = false;
                }
                if (enableParseText && text == 'Название серии:') {
                    enableParseName = true;
                }
                if (enableParseText && text == 'Релиз группы') {
                    enableParseInfo = false;
                }
                if (enableParseInfo) {
                    torrent.info += text + ' ';
                }
                if (enableParseText && text == 'Файл') {
                    enableParseInfo = true;
                }
            },
            onclosetag: (tagname) => {
                if (tagname == 'span' && enableParseText) {
                    enableParseText = false;
                }
            }
        }, {decodeEntities: true});
        parser.write(page);
        parser.end();
        return episode;
    }
};

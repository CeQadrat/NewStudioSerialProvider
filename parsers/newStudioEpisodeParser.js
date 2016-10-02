const htmlParser = require('htmlparser2');

module.exports = {
    parse(page){
        return this._parse(page);
    },
    _parse(page){
        let enableParse = false;
        let enableParseText = false;
        let enableParseSerialName = false;
        let episode = {};
        let parser = new htmlParser.Parser({
            onopentag: (name, attribs) => {
                if(name == 'var' && attribs.class == 'postImg'){
                    enableParse = true;
                    episode.serialCover = attribs.title;
                }
                if(name == 'span' && attribs.class == 'post-b' && enableParse){
                    enableParseText = true;
                }
            },
            ontext: (text) => {
                if(enableParseSerialName){
                    episode.serialName = text;
                    enableParseSerialName = false;
                }
                if(enableParseText && text == 'Сериал:'){
                    enableParseSerialName = true;
                }
            },
            onclosetag: (tagname) => {
                if(tagname == 'span' && enableParseText){
                    enableParseText = false;
                }
            }
        }, {decodeEntities: true});
        parser.write(page);
        parser.end();
        return episode;
    }
};

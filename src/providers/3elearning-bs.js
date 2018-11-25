bt.addSource("BS", function () {
    var bs = "http://bitspyder.net/browse.php?incldead=1&scope=0&search={query}";

    return {
        url: {
            all: bs,
            elearning: bs,
            docs: bs + "&c42=1",
            abooks: bs + "&c40=1",
            mags: bs + "&c57=1",
            ebooks: bs
        },
        onParse: {
            row: "tr.alt1,tr.alt2",
            link_prepend: "http://bitspyder.net/",
            sel: [
                {text: "a.altlink6"},
                {text: "> td:eq(2)"},
                {
                    text: "font[color='#A52A2A']:eq(0)",
                    link: function(context){
                        var link = context[0].firstElementChild.nextElementSibling.firstElementChild;
                        var id = link.getAttribute("href").split("id=")[1].split("&")[0];
                        return "download.php/" + id + "/" + link.textContent.trim().replace(bt.spacesRegex, "%20") + ".torrent";
                    }
                }
            ]
        },
        onPrepareQuery: function (context) {
            context.query = context.query.split(' ');
            for (var i = 0, l = context.query.length; i < l; i++) {
                context.query[i] = encodeURIComponent('+') + context.query[i];
            }
            context.query = context.query.join('%20');
        },
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC8UlEQVQ4jY2TS2hUdxSHzzAMQxAJIS0uXLkSXLjJwkUrpbiaRRdBLkokCRY7NFgIpe2mNpSAAW0RRMEHKhIhRAouxEdpRAzBjEnzaJtJnExyX//7njv3Pffeco3ycxENPhBcHM45cL4PzoFDRJQjolylUmljjPVrmjakKMoAY6yXMcZJknRIkqR+xtigLMsjoigen5+fb3/N0evCNLUvkzRdz7LMT9P/zSRJ1TiOWavVYkEQqEEQNFzXDZvNpq7KwsH3BZXbF7ONF9jQ63hem0K2/jeSNEUcx4iiCEEQwPd9NL0A0vTd8bcE6yUqrs0/rmYbz5E+GUNy7xTif+4hThJEUYQwDOH7PlzXRdP1sDL3WFc5atsSNAd37a6t1pFlGWpXy1g+2w19ehxRGL4FO44D225iuc5DGvp835bA+XHPPkFmyLJnaNRnYCxPIgx8hGGIIAjged4r2Eaj0UBNYFj77eDmHcBR3vl57wFJ0ZGmKeIkQasVfxC2LAtrsoanZ/oHwFGewFHeGv7iK1mzkCQJWq3WB2HTNGEYBnimo3pu4CeUqUDgKK+e7j4i6Y2PgnVdh6CaWLrw/TBKVCRwlGdnD39Tl1Q4jgPP8+D7m/tHUYQoiraOaNs2LMvCqsCwcPXE7+CojVCmgnj52x+WVnmIogie38yKokBVVWiaBlVVwRiDJEngeR5z/y5h9vrJi1YvbSOUqFgb/eXXxWoNPM9DlmWoqgrDMGCaJizLgmVZMAwDmqZBEATMzC1gauz8eNBDHYQSFdcufTe4WF2BICtQdBNGw4btuHA8H64fwvUD2I4H025CUjTMLv6HmRunrnllaid0USEa/GR3ffzkeeHO5QfCxOgcP3mrKlTur4uzE0ye/UuSZ/6sy9N3qvLDmwvi/SuPlsdGRpWhz/ajREUiohy6qIBe2oYytaOHOtBHnfEx2oE+2ok+2omj9Cn6qBM91IEe6sDXtB1dVABHeXrjKXJElANH+Tfjj3f6d+dfAuBCuhI2QTSDAAAAAElFTkSuQmCC"
    };
});

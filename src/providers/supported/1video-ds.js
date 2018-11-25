bt.addSource("DS", function () {
	// NB: Search in multiple categories at once doesn't work
    var ds = "https://www.dvdseed.eu/browse2.php?wheresearch=1&incldead=1&search={query}";

    return {
        url: {
            all: ds,
            movies: ds,
            movies_1080: ds + " 1080p&kopia_reencode=1",
            movies_720: ds + " 720p",
            movies_bluray: ds + "&pkat_bd25=1&pkat_bd50=1&kopia_clone=1&kopia_modify=1&kopia_custom=1",
            movies_dvd: ds + "&pkat_dvd5=1&pkat_dvd9=1&kopia_clone=1&kopia_modify=1&kopia_custom=1",
            tv: [ ds + "&c74=1", ds + "&c31=1" ],
            mvids: [ ds + "&c6=1", "https://www.dvdseed.eu/browse.php?id=3&t=3&c5=1&wheresearch=1&incldead=1&search=" ],
            docs: ds + "&c69=1",
            abooks: ds + "&c98=1",
            apps_win: ds + "&c27=1",
            music: ds + "&c91=1",
            music_flac: ds + "&c91=1",
            xxx: ds + "&c9=1"
        },
        onParse: {
            row: "#torrentable tr:gt(0)",
            link_prepend: "https://www.dvdseed.eu/",
            sel: [
                {
                    text: "a[href*='details.php']:eq(0)",
                    freeleech: "meta[src*='/free.png']"
                },
                {text: "> td:eq(6)"},
                {text: "> td:eq(5)", link: "a[href*='download.php']:eq(0)", noblank: true}
            ]
        },
        onFilter: function (data, response) {
            if (["movies","movies_1080","movies_720","movies_bluray","movies_dvd","tv"].indexOf(response.context.category) !== -1) {
				var stoplist = ["dtsflac","3d1.png","audiobook","music.png","porn.png"];
				var stoplistLength = stoplist.length;
	            return data.filter(function(){
					var html = this.innerHTML;
					for (var i = 0; i < stoplistLength; i++) {
						if (html.indexOf(stoplist[i]) !== -1) {
							return false;
						}
					}
	                return true;
	            });
			} else {
				return data;
			}
        },
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADYElEQVQ4jZXTzU+TBwCA8TcZ9ON9W1r5yACHglABEfmmfCgiieKmuFnoLKW80FqIbM7FjMOyiTDcYXWJh2FxTqqFQCUM2ehaKK5I8DA34/y4sECG240hySK4ZM5Jnh2227LDDr88f8EjrD6F8J15co55/5fwnXlWn4KwvPo7/cGbvNbWSUbpftLKTaTusrBll+Wf1pNSYSF+dyti1Sni6j4hXvbyfu8odxcfIXy3sERlez+R+TLV+6vp93q56ruKz+fD5xvENzTE4OAA3d1n2FFYhq68Damun/TmC3R4phDe9HyPovYKytwjWK1Wrk9dZ3JygkDQz/R0mOXlZdb/XGf18WNcLhdxydkoTR4iLMMY3gogqBv8KF79lHijGVuDDddHZ6mtqyOr7BWKqm18fO48KysrPHv2B8FggLQd5Yi1l1FYx1BaxxAkx9coq06z5+VabkzfYGF+gQabDY3xGOq8Jsy2Fn5cXGR1bY3OD7p4MS0PsW4ApW0clc2PoJEDiMY2jh518uS3J9y/f4/qfftQJOZiKKqmp/ciS78scfvb2+SVViBVvIOm8SvU8gSqxgCCZBkmpuB1ujq7eL7+nIc/PeSzvj5cLhfXRkfxeC4jN8mUlpQhanREJBWjKLCjOtiDujGAIJr6MJTU4Ha7mZv7gXsPHvDNrVvMzs7iOuvCad7JlfYsJs5sI/RhBuNdmbQ35xJV2IDa5kdItFwgLz+L1IztZOeXkJ1vJDvfyPbcQuITNnLxxBbGTxuoMcZQvFVDYWYMW41VaM1etI4wgt4RIsbqRTp8Ca3pElEmD1GH+9Ad6iEyIYcv3k1muH0TOSkq4nQRxMTGIuWZEetH0DpnEDTOGf42i67lJhtaZ9E7w+hlP+oCO8dNBsIdScyc2kj4vUSunXwJc2UKUnEzkn0KIaFlDI0jjNYxjdYxg9Y5jd4+ib5hFHFvNxsyKylM12Mxamjdo2XkjWjGT8SiS9qGyjKCcPzcKInOL5HkIFJzCMkeQiv70daPoCpqJTkllZwkFQVJL7DboKDXIjLojCJ6cxab7EMIcz8vcdIdIK55BLHRj9joR2MdQzriIzL9AG/vjWZAVjHcpMInq3FbRGpKN1NS48TtCyEAeEN3/3PbhJ3yv6SZOjnU8TmPfl3jL7D9OQgYKA4vAAAAAElFTkSuQmCC"
    };
});

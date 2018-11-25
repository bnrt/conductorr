bt.addSource("Spotify", function () {

    var marketKey = "Spotify_Market";
    var marketValue = bt.getPersistentValue(marketKey, "");

    return {
        url: {
            music: "https://api.spotify.com/v1/search?type=artist,album&limit=50&q={query}"
        },
        onEnable: function () {
            if (bt.customCSS.text().indexOf(".panel-src-Spotify") !== -1) return;

            bt.customCSS.append("\
				.panel-src-Spotify > .panel-body a {\
					border:0;\
					border-radius:6px;\
					position:relative;\
					display:inline-block;\
					margin:0 8px 4px 0;\
					overflow:hidden;\
					color:#fff;\
					padding:20px 10px;\
					text-align:center;\
					font-size:90%;\
					font-weight: 600 !important;\
					background-repeat:no-repeat;\
					background-size:cover;\
					color:#fff;\
					width:150px;\
					height:150px;\
					min-height:150px;\
					word-break:normal !important;\
				}\
				.panel-src-Spotify > .panel-body a:hover {\
					text-decoration:none;\
				}\
				.panel-src-Spotify > .panel-body span {\
					padding:3px 5px;\
					background-color:rgba(0,0,0,0.6);\
					border-radius:5px;\
				}\
				.panel-src-Spotify > .panel-body a:hover span {\
					background-color:rgba(0,0,0,0.8);\
				}\
				.panel-src-Spotify > .panel-body a:focus {\
					outline:none;\
				}\
				.panel-src-Spotify > .panel-body a:hover > span {\
					bottom:2px;\
				}\
			");
        },
        onPrepareQuery: function (context) {
            bt.extractYear(context);
            var market = bt.getPersistentValue(marketKey, "");

            if (market !== "") {
                for (var i = 0, l = context.url.length; i < l; i++) {
                    context.url[i] += "&market=" + market;
                    console.log(context.url[i]);
                }
            }
        },
        onParse: function (response) {
            try {
                var data = JSON.parse(response.responseText);
            } catch (e) {
                console.error("Unexpected Spotify response", response.responseText);
                bt.showFailAlert(response, "unexpected response");
                return null;
            }

            if (!('albums' in data) && !('artist' in data)) {
                bt.showFailAlert(response, "unexpected data");
                return null;
            }

            response.context.searchUrl = "https://play.spotify.com/search/" + encodeURIComponent(response.context.query);

            return data;
        },
        onFilter: function (data) {
            var filter = ["karaoke", "reproduction", "in the style of", "lullaby versions of", " tribute to "];
            var filterLen = filter.length;
            data.albums.items = data.albums.items.filter(function (album) {
                var a = album.name.toLowerCase();
                for (var i = 0; i < filterLen; i++) {
                    if (a.indexOf(filter[i]) !== -1) {
                        return false;
                    }
                }
                return true;
            });

            return data;
        },
        onRender: function (data, table) {
            var dataTypes = ["albums", "artists"];

            var releaseTypes = {
                artist: "Artists",
                album: "Albums",
                single: "Singles",
                compilation: "Compilations"
            };

            for (var i = 0, l = dataTypes.length; i < l; i++) {
                $.each(data[dataTypes[i]].items, function (index, item) {
                    if (!("images" in item)) return;
                    var trhead, td;

                    var type = item.type === "album" ? item.album_type : item.type;

                    td = $(".spotify-type-" + type, table);

                    if (td.length === 0) {
                        var typeTitle = type in releaseTypes ? releaseTypes[type] : type;

                        trhead = bt.tr.clone().append(bt.td.clone().addClass("tr-title").text(typeTitle));

                        (type === "album" || type === "artist") ? trhead.prependTo(table) : trhead.appendTo(table);

                        td = $(bt.trtd.clone().insertAfter(trhead)[0].firstChild).addClass("spotify-covers spotify-type-" + type);
                    }

                    var link = bt.ab.clone()
                        .attr("href", item.external_urls.spotify)
                        .appendTo(td);

                    if (item.images.length === 0) {
                        link.css("border", "1px solid #ccc");
                    } else {
                        var img = item.type === "artist" ? 2 : 1;
                        link.css("backgroundImage", "url(" + item.images[img].url + ")");
                    }

                    bt.span.clone()
                        .text(item.name)
                        .appendTo(link);

                });
            }

        },
        config: function () {
            var markets = ["AD", "AR", "AU", "BE", "BG", "BO", "BR", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "IE", "IS", "IT", "LI", "LT", "LU", "LV", "MC", "MT", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "RO", "SE", "SG", "SI", "SK", "SV", "TR", "TW", "UY"];

            var select = $('<select class="form-control btn btn-xs"><option value="">Any</option></select>')
                .on("change", function () {
                    bt.setPersistentValue(marketKey, $(this).val());
                });

            var current, opt = $(document.createElement('option'));

            for (var i = 0, l = markets.length; i < l; i++) {
                current = opt.clone().text(markets[i]).appendTo(select);
                if (markets[i] === marketValue) {
                    current.prop("selected", 1);
                }
            }

            return $('<div class="form-inline">Select your country:</div>').append(' ', select);
        },
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACiElEQVQ4jW2Ty0vUcRTFPwOtWkSblq0iaFOroCBrrEWQPahFtchFhbSQkAgqXaSlNs5vZtTB52ho5QNUwtGZdB6/eeQrm2bS1KjILBLmvxg5Lb4DpXTg8P1yOffec78P2IHW9K7S3owj3Jd15PtzbPXn2OrLOvK9GUe4Nb2rdKd+GzoXHKmBNTT0CY2soNerhqMraHgFDa6hzgVH6r/J7bNs9n9Er7JoZBkF19DUF8OJNTS6jAZy6MUS6phnc1uyf4bU8yx6mUMjq2jiK4quI/snsjdQ5Dsa/4yGl1B/Bj3PIv8MxoknjjOQQ52z6F4LulqJSi+hY6fRibOo7DqqqEZP+9Cr92aU3kXUk0WeOE58ScKBDCqvRmB45DgqvYhOnUcHD/+NAzp5EVkTqHsR+ZKEsWzybbOoex51JFBwHYV+oMlvaHoDRX+hqQ0UsFHFY1Nk7z4UyCBPkjyeOAV/2ti6VoX2H9jeEdCZK+hhGxpaQi8+oNYYanuLvHEKuKMUmpOoawGV3UR36tHTQdQ8idxj6GE7ulzxt9hdL+peQC0pZMUo4IqS9yWQP4V6FpE7iB51oSoPuu9HjcPmaodXUaUb3apF7bOoOYGaouRpnCbkTSD/W3TuJtq9B5VcMm7O3kCHjprOJReQFUIdc6jZRt4EaowQon4cpzeNrCjyp42ga84camAe9bxDHTOovAaV3TYaK4Z8aVQ/jhOAhjBJy0buCPLGkC+OWmzD1uLqT5m53RFk2aghTHLba3wS4ndTDLmmi6II8kSNMytiYq5p5I6jJyF+//c/1E2SdNtG6JpCz96Y1TWFXMXOdZM7Ou/EgzGctUFCdRPka4MUaoMUivtQzVhx5n/wB92/wL8+YspgAAAAAElFTkSuQmCC"
    };
});

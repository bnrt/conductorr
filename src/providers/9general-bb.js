bt.addSource("bB", function () {
    var bb = "https://baconbits.org/torrents.php?action=basic&searchstr={query}";

    return {
        url: {
            all: bb,
            music: bb + "&filter_cat[1]=1",
            music_flac: bb + "&filter_cat[1]=1",
            movies: bb + "&filter_cat[9]=1",
            movies_1080: bb + "&filter_cat[9]=1",
            movies_720: bb + "&filter_cat[9]=1",
            docs: bb + "&filter_cat[9]=1&filter_cat[10]=1",
            tv: bb + "&filter_cat[10]=1",
            apps_win: bb + "&filter_cat[2]=1",
            mags: bb + "&filter_cat[6]=1",
            games_pc: bb + "&filter_cat[11]=1",
            comics: bb + "&filter_cat[7]=1",
            ebooks: bb + "&filter_cat[3]=1",
            abooks: bb + "&filter_cat[4]=1",
            fiction: bb + "&filter_cat[3]=1",
            elearning: bb + "&filter_cat[3]=1&filter_cat[4]=1&filter_cat[5]=1&filter_cat[6]=1&filter_cat[7]=1&filter_cat[13]=1&filter_cat[14]=1"
        },
        onParse: {
            cleanup: [".tags"],
            row: "#torrent_table tr.torrent",
            link_prepend: "https://baconbits.org/",
            sel: [
                {
                    cleanup: ["> td:eq(1) > span:eq(0)"],
                    text: "> td:eq(1)",
                    link: "a[title='View Torrent']:eq(0)"
//                    freeleech: "strong:contains('Freeleech!')"
                },
                {text: "> td:eq(7)"},
                {text: "> td:eq(4)", link: "a[href*='action=download']:eq(0)", noblank: true}
            ]
        },
		resolution: null,
        onPrepareQuery: function(context){
            var year = bt.extractYear(context);

            if (year) {
                for (var i = 0, l = context.url.length; i < l; i++) {
                    context.url[i] += "&action=advanced&torrentname={query}&filelist=" + year;
                }
            }

			context.src.resolution = bt.extractResolution(context);
        },
        onFilter: [bt.filter3dMovies, function (data, response) {
			if (response.context.category === "music_flac") {
				data = data.filter(function(){
					return this.textContent.indexOf('FLAC') !== -1;
				});
			}

			if (response.context.category === "movies_1080") response.context.src.resolution = "1080p";
			if (response.context.category === "movies_720") response.context.src.resolution = "720p";

			if (response.context.src.resolution) {
				response.context.query += " " + response.context.src.resolution;
				response.context.src.resolution = null;
				return bt.requireAllWords(data, response);
			} else {
				return data;
			}
		}],
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAkUlEQVQ4jaWSMRLEMAgDlZ/zNEr/SinuGIMCyd2kUIENKxgAyeONkAMDmPUXwABSdAcJE0zFGaIgS38oxWtVNSCTtw1YizSrEgjFbAO64gxR0Dd/AzQ51IHSewV07T50Vke4mbXtptvC5ZCmDXVbMIDuXvR0H+7+AUSg1xYQBeV8ROJ0srmbzgxT4QRSs58Bk06645TcxPnwywAAAABJRU5ErkJggg=="
    };
});

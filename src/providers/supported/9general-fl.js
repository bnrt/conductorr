bt.addSource("FL", function () {
    var filelist = "https://filelist.ro/browse.php?searchin=1&sort=0&incldead=1&search={query}";

    return {
        url: {
            all: filelist,
            music: filelist + "&cat=11",
            music_flac: filelist + " FLAC&cat=11",
            movies: filelist,
            movies_bluray: filelist + "&cat=20",
            movies_remux: filelist + " REMUX",
            movies_1080: [filelist + " 1080p&cat=4", filelist + " 1080p&cat=19", filelist + " 1080p&cat=15"],
            movies_720: [filelist + " 720p&cat=4", filelist + " 720p&cat=19", filelist + " 720p&cat=15"],
            movies_dvd: [filelist + "&cat=2", filelist + "&cat=3"],
            docs: filelist + " documentary&searchin=0",
            ebooks: [filelist + "&cat=16", filelist + "&cat=18"],
            mags: filelist + "&cat=16",
            tv: [filelist + "&cat=15&sort=2", filelist + "&cat=21&sort=2", filelist + "&cat=14&sort=2"],
            elearning: filelist,
            apps_win: filelist + "&cat=8",
            mvids: filelist + "&cat=12",
            xxx: filelist + "&searchin=0&cat=7"
        },
        onParse: {
            row: ".torrentrow",
            link_prepend: "https://filelist.ro/",
            sel: [
                {
                    text: "a[href*='details.php?id=']:eq(0)",
                    freeleech: "meta[alt='FreeLeech']"
                },
                {text: "> .torrenttable:eq(8)"},
                {text: "> .torrenttable:eq(6)", link: "a[href*='download.php']:eq(0)", noblank: true}
            ]
        },
        onFilter: [bt.filter3dMovies, function(data, response){
			if (response.context.category === "movies_bluray") {
				return data.filter(function(){
					return this.textContent.toLowerCase().indexOf('remux') === -1;
				});
			} else {
				return data;
			}
		}],
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAUUlEQVQ4jWPQaVn6nxLMoNOy9L+Orj55eBgaoOkT/V9+0VUUDBMjyQBkRRQboJZSQ7wBMMXIzifJAOXqeRiKsYnhjQVsitEDdhCngwE0gAIMAOcx0Mby0F1/AAAAAElFTkSuQmCC"
    };
});

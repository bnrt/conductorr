bt.addSource("PS", function () {
    var ps = "https://polishsource.cz/browse.php?incldead=1&scene=0&pl=0&sub=&search_in=title&search={query}";

    return {
        url: {
            all: ps,
            movies: ps + "&c12=1&c11=1&c4=1&c43=1",
            movies_1080: ps + " 1080&c11=1",
            movies_720: ps + " 720p&c11=1",
            movies_remux: ps + " REMUX&c43=1",
            movies_bluray: ps + "&c43=1",
            movies_dvd: ps + "&c4=1",
            docs: ps + "&sub=Documentary",
            music: ps + "&c42=1",
            music_flac: ps + " FLAC&c42=1",
            //		music_mp3: ps + "+MP3&c42=1",
            mvids: ps + " x264&c42=1",
            tv: ps + "&c39=1",
            elearning: ps + "&c5=1",
            ebooks: ps + "&c5=1",
            abooks: ps + " audiobook&search_in=both&c5=1",
            mags: ps + "&c5=1",
            apps_win: ps + "&c18=1",
            games_pc: ps + "&c8=1",
            xxx: ps + "&c13=1"
        },
        onParse: {
            row: "#restable tr:gt(0)",
            link_prepend: "https://polishsource.cz/",
            sel: [
                {text: "a[href*='details.php']:eq(0)"},
                {text: "> td:eq(7)"},
                {text: "> td:eq(4)", link: "a[href*='downloadssl.php']:eq(0)", noblank: true}
            ]
        },
		onFilter: function(data, response){
			if (response.context.category === "movies_bluray") {
				return data.filter(function(){
					return this.textContent.toLowerCase().indexOf('remux') === -1;
				});
			} else {
				return data;
			}
		},
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7klEQVQ4jc2SoQvCQBjFv//H/2H2/QHrWzEIi0OwLM0gWETbhmHpMDqLQVhcOQwXxCCXNpYGGyw+0x3oubK0B6+9+937+D4iIvJWKcaY1GPLiUZ5Nl9gQoDN8QIu5JfX2zMsJ4IXxHi9KyhxIU1AwnIAQNv1X2FneUBZNwCAsm7AhURZN8MARVfywxRt1wMA9qfb8AgK8HpXukHb9Xo8pYTl/wF58dQBLiSu9we8INZhL4h1E5YVJoALafxgORFsdwfb3RlNDICq/QvwwxS/GtxCwnL4oXkXLCv0allW6EYTu8TRACKi2XyBMSYi+gCLK3pfts+WcAAAAABJRU5ErkJggg=="
    };
});

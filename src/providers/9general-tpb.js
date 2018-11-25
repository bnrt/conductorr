bt.addSource("TPB", function () {
    var q = "https://thepiratebay.org/search/{query}";

    return {
        url: {
            all: q,
            music: [ q + "/0/99/101", q + "/0/99/104" ],
            music_flac: q + "/0/99/104",
            movies: [q + "/0/99/201", q + "/0/99/202"],
            movies_bluray: q + " avc/0/99/200",
            movies_remux: q + " remux/0/99/200",
            movies_1080: q + " 1080p/0/99/207",
            movies_720: q + " 720p/0/99/207",
            movies_dvd: q + "/0/99/202",
            tv: [q + "/0/3/205", "/0/3/208"],
            docs: q,
            mvids: q + "/0/3/203",
            apps_win: q + "/0/3/301",
            games_pc: q + "/0/3/401",
            elearning: q,
            ebooks: q + "/0/99/601",
            abooks: q + "/0/99/102",
            fiction: q + "/0/99/601",
            mags: q + "/0/3/601",
            comics: q + "/0/3/602",
            xxx: q + "/0/3/500"
        },
        onParse: {
            row: "#searchResult > tbody > tr",
            link_prepend: "https://thepiratebay.org",
            sel: [
                {text: "a[href*='/torrent/']:eq(0)"},
                {text: "> td:eq(-2)"},
                {
                    text: function(context){
                        var details = context.find(".detDesc").first();
                        if (details.length === 1 && ~details.text().indexOf(", Size ")) {
                            return details.text().split(", Size ")[1].split(",")[0].trim();
                        } else {
                            return $(context[0].lastElementChild.previousElementSibling.previousElementSibling);
                        }
                    },
                    link: "a[href^='magnet:']:eq(0)",
                    noblank: true
                }
            ]
        },
        onFilter: [bt.filter3dMovies, function (data, response) {
            if (response.context.category === "movies_bluray") {
	            return data.filter(function(){
                    return this.textContent.toLowerCase().indexOf("remux") === -1;
	            });
			} else {
				return data;
			}
        }],
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACLklEQVQ4jZWTMUiqYRSGT/04haTpEoEagYLhWgRJ+je5hmC/DtbgFoEuQmOBGIFrDbmphVKSg9AQkSC0KkI0uAjSEoS4qfjcIe5fN4t77wsvfPCd7zmc850jfNF4PP6rP0t+H56enggEAvj9fjY3N7+1qqqoqsrl5eUkoFQqISL/5GAwOAkol8t6gMFgYHp6GovFgslkQlEUFEVhamoKESEcDv8M8Hg8NJtNotEolUqF5+dnYrEYlUqFdDqNiKBp2iTg+voaEWFlZYVut4umadjtdlwuF0tLSzQaDVKpFCJCKBSaBJyfn+slzM7OTtRtNBpRFEVPMhgMfgaICHa7nZmZGUQEp9OJwWDQ75aXlz8ArVaLeDzO2dmZnmF1dZVgMMjCwgIiQjQaZX19HbPZjIjg9/sZj8eMRiPk/v4eEeHw8JBMJkM+n6darVIsFikUCuTzeXK5HFdXV5TLZW5ubuh2u5yenhKJRJCDgwOdurGxwc7ODplMhkajwXA41Jv19vZGvV4nm81ydHSExWLB5/Mht7e37O3t4fP5uLi4IJlMYrVaERGsVitra2ssLi4yPz+P1+tF0zRUVcXtduNyud6b+PLygslkwuFwoKoqoVCIWCzGyckJx8fHbG1t4Xa78Xq97O/vY7PZ2N3d5eHh4R3Q7/eZm5sjkUjQ6/W+7hcAvV6PWq3G9vY2IsLj4+PHN45GI+7u7nh9ff328Wd1Oh0CgQDtdvvPOfgffV7pXz5OoYc083dvAAAAAElFTkSuQmCC"
    };
});

bt.addSource("BlueBird", function () {
    var bird = "http://bluebird-hd.org/browse.php?incldead=1&stype=and&search={query}";

    return {
        url: {
            all: bird,
            movies: bird + "&c1=1&c2=1",
            movies_1080: bird + "&c1=1&c2=1&cr3=1&cr5=1",
            movies_720: bird + "&c1=1&c2=1&cr4=1&cr6=1",
            movies_remux: bird + "&c1=1&c2=1&cr2=1",
            movies_bluray: bird + "&c1=1&c2=1&cr1=1",
            music: bird + "&cr7=1",
            music_flac: bird + "&cr7=1",
            tv: bird + "&c6=1",
            mvids: bird + "&c4=1",
            docs: bird + "&c3=1",
            xxx: bird + "&c7=1"
        },
        onParse: {
            cleanup: ["a[href*='&snatched']"],
            row: "#highlighted > tr",
            link_prepend: "http://bluebird-hd.org/",
            sel: [
                {text: "a[href*='details.php']:eq(0)"},
                {text: "> td:eq(-3)"},
                {text: "> td:last", link: "a[href*='download.php']:eq(0)", noblank: true}
            ]
        },
        onPrepareQuery: function (context) {
            var i,
				len = context.url.length,
				year = bt.extractYear(context, true);

            if (year && year.length === 4) {
                for (i = 0; i < len; i++) {
                    context.url[i] += "&dsearch=" + year;
                }
            }

            var res = bt.extractResolution(context);

            if (res === "720p") {
                for (i = 0; i < len; i++) {
                    context.url[i] += "&cr4=1&cr6=1";
                }
            } else if (res === "1080p" || res === "1080i") {
                for (i = 0; i < len; i++) {
                    context.url[i] += "&cr3=1&cr5=1";
                }
            }
        },
        onFilter: bt.filter3dMovies,
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC20lEQVQ4jY3IS0zTdwDA8Z+LO3gZiUumiS8ooqWlhE2lrDWxlocmUBSjpfpnUdSAAVFidOWPKxYw5VUKRmtbCxUwlgJFYbUKCOhkPoIv4pOoyWJ2miZbNEu223cHk2WLienhc/mI0OVRjM4z6D196NzBmOg9Ida5AvgHhxG6Y63kvPiT7Nn3ZD9/F6P3bHj1F2vbAojU6ib0E0/JiN4n43KMovfRjT/h29YOhLq8Ck3HEBpvmFTf4EfUngGS3f2oTn+g9gyg8Q6SFoiwqroBkbSjhG8afay0uVDIzSjkln8lVDWTYj9BeqOXNQ1e0ht9pNWfIsHaRHy1k5SSQ4jUwmKsF8ZZf8zJfEspC4vKWVhUzgKpjK+kMuqvTNE/+ytdM69w33qMPTrFns4Bkg/8gKJAQqRttnD04iT6ChmRtpa5WiNz0418ttrA5xmZeH9+yPmZl+xp97PL5aPU3Y1taIJSf4jEnE0IVbaJushP7D3RSc5BmXxrLQVyPdtsDeRUWAk+mKUlMoFYvAKhSEEkqNlwUMYxehvtFgmhysyl5sI4zePTdNx9Tt+z10R/ecvN3/+m98Es/hv3ONoTRixOYk5iCmLRcpR5Zhyjt9EX7kSk5m3FNjRJgd1J4mYJpbkYpbkYlWU38SYLS3LNxJsszDfk8uX6PBZkbUJqcmMbvsbqrUWIVduLsYbHMMgO5m00E5cvEZcv8UXeDuJMEnLfJfy3HtF69Q51w5PIAyNUha9ibu9EYSpEaL7bx66eYXTHT7GoooZllbUsq6xlaaWdpZV29g+OUT8xzfc/Xqeif4R9wSgFniCJRxwod5YhlCWHUJ/sJbmtB1X7uf9rO8cKZxcrnV0oW7tJdvWgdHWT1HIW9clevj5ch9AcOY42Ms2a8NQn3PiPD6eNTKNtOI1Ir3GS9eQPjDNvMD78LWZZz96hawsgvP0XyfT1YQiNYQiOxCY0hjEwhOPsef4BcnJ19Gval0YAAAAASUVORK5CYII="
    };
});

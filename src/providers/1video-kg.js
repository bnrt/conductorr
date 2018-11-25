bt.addSource("KG", function () {
    var kg = "https://karagarga.in/browse.php?search_type=title&incldead=&search={query}";

    return {
        url: {
            all: kg,
            movies: kg + "&cat=1",
            movies_1080: kg + "&hdrip=2",
            movies_720: kg + "&hdrip=1",
            movies_bluray: kg + "&hdrip=3",
            movies_dvd: kg + "&dvdr=1",
            docs: kg + "&genre=20",
            music: kg + "&cat=2",
            elearning: kg + "&cat=3",
            ebooks: kg + "&genre=41",
            abooks: kg + "&genre=40",
            comics: kg + "&genre=42"
        },
        onParse: {
            cleanup: ["#browse tr:has(a[href*='down.php']) span:not(:first-child)"],
            row: "#browse tr:has(a[href*='down.php'])",
            link_prepend: "https://karagarga.in/",
            sel: [
                {
                    text: function (context) {
                        var cols = context.children();
                        var year = cols.eq(3);
                        var genre = cols.eq(0).find("meta");

                        if (genre.length === 2) {
                            var src = genre.eq(1).attr('src');
                            if (~src.indexOf('hdrip720')) year.append(' [720p]');
                            else if (~src.indexOf('hdrip1080')) year.append(' [1080p]');
                            else if (~src.indexOf('dvdr')) year.append(' [DVD-R]');
                            else if (~src.indexOf('bluray')) year.append(' [Blu-ray]');
                        }

                        return cols.slice(1,4);
                    },
                    link: "a[href*='details.php']:eq(0)",
                    freeleech: function(context){
                        return context.hasClass("featuredrow");
                    }
                },
                {text: "> td:eq(12)"},
                {text: "> td:eq(10)", link: "a[href*='down.php']:eq(0)", noblank: true}
            ]
        },
        onPrepareQuery: function (context) {
            var i,
				len = context.url.length,
				year = bt.extractYear(context, true),
				res = bt.extractResolution(context);

            if (res === "720p") {
                for (i = 0; i < len; i++) {
                    context.url[i] += "&hdrip=1";
                }
            } else if (res === "1080p" || res === "1080i") {
                for (i = 0; i < len; i++) {
                    context.url[i] += "&hdrip=2";
                }
            }

            context.query = context.query.trim().split(' ');
            for (i = 0, len = context.query.length; i < len; i++) {
                context.query[i] = encodeURIComponent('+') + context.query[i];
            }
            context.query = context.query.join('%20');

            if (year) {
                context.query += "%20" + year;
            }
        },
//		onFilter: bt.requireAllWords,
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACoElEQVQ4jeWSXUiTcRjF/5PCi0F00Wpgr1t7dR84F5MitQVddDFlOpTUGiRR4cqREKTJmLA1FssKTZ2hNslkaxJTl9MYKyd+ZMtZutShJI3elabvmm2jRSpPNyaJRHTduX7Oj/NwDkL/h8Lh8B6dVtsgl8u7xsbGcv/J7PF4dspkMg+VSoX4+HhISEgAuVzu9ng8BX/zUkiS5CkUCheGYUCn04FCoYBAIFjHcRxEoqNrDoejdPNarVbHTU9Oik3t7VUqpdKWm5P7KTU1FXAcBwaDATQaDdKPpBORSIQWCoWY0Wh0XygU2o0QQmhubk6Sn5f3gcPhAJvDBhaLBUwmE5hMJmAYBomMROByuaDX643bcvb09FTIZLJZoVAIPB4P+Hw+sFgswDAMMAwDPAmH5ORkYLPZ6/Pz84e2AcRi8deUlBRIS0sDiUSyrFKpeo+JRKt8Ph8yMzPWCgsLvUqlstPn8x3v6rDUkCTJIwhC7JuaylGr1XEoKysrJpVKCYfDcTkYDO5CCCGn06kymUx3zWazESFE6evurnvS2alpa22ubze2ND1oaWoJBAIHEUII9dntOoIgkn4likQiNIPB0GW1WnUWi6WuvrbWVHzq5GdD7Z2nVou5dXRo6Nq3YHA/Qoiy5ZXFxUWqy+XasdG9TFlZOSqVZH8/V3zGv7CwcHgDvtfneyvp7bGVT3u9W3cw7naXB/z+jMGB55eqKsr788UnfjQ3NjwkSZL7p50ghBB6/MikL5NfcJ89XfClrOT8uyulJVPGe4aOaq1mcNjlkndotc77Ot0zb//AzfcTE0Xh5WV2LBZL3ARkCgWrt29ct0WXlui/41dWVg68evni6uuRkbJGjWa439ja9nF2tmjcbtfZqm+98c/MZNdcVLh+As9+Owd6H2u5AAAAAElFTkSuQmCC"
    };
});

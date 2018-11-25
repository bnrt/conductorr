bt.addSource("HDB", function () {
    var hdb = "https://hdbits.org/browse.php?descriptions=0&search={query}";

    return {
        url: {
            all: hdb,
            movies: hdb + "&c1=1",
            movies_remux: hdb + "&c1=1&m5=1",
            movies_bluray: hdb + "&c1=1&m1=1",
//			movies_hd: hdb + "&c1=1&m4=1&m3=1&m6=1",
            movies_720: hdb + "+720p&c1=1&m4=1&m3=1&m6=1",
            movies_1080: hdb + "+1080p&c1=1&m4=1&m3=1&m6=1",
            tv: hdb + "&c2=1",
            mvids: hdb + "&c4=1",
            xxx: [hdb + "&c7=1", hdb + "&descriptions=1&c7=1"],
            docs: hdb + "&c3=1"
        },
        onParse: {
            row: "#torrent-list > tbody > tr",
            link_prepend: "https://hdbits.org",
            sel: [
                {
                    text: "> td:eq(2) a:eq(0)",
                    freeleech: "a.fl"
                },
                {text: "> td:eq(7)"},
                {text: "> td:eq(5)", link: "a[href*='download.php']:eq(0)", noblank: true}
            ]
        },
        onFilter: bt.filter3dMovies,
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACHklEQVQ4jaXK30tacRjH8e+/pxd5sysFJe2mq3MCNdpFKAOz4ao1KtlKS5JOVh7H1DUNsUiLmtEWrV21iwYL8tfxR7CVvHexw2ltYzddvPg8z/N5RKr0iYcQa8Vj1oofuMs/5/8T8dwhDyGi6RJLmTJK/pBoeldXQskfspgps5gps16osF6ooGwdEE2X7hHhjQKpYgWtc014o2DQOtekiu9JFSvc3N5ycVnjstpE61zztvzR+BNT8SyJ3B7Ndpfn8SxTuma7SyK3RyK3T7PdNe5r+X2+/7gh+rrIVDyLGI+oLKe3abQ6jEdUXZJGq8Nyevt+t6ASjKicnX9l9+iM8QUV4Z9dIZLM0+v1qGttQ6/XI5LME0nmqWtt/LMrhuLBCcefz/HPriBGnkUJKxlqjRYjE1FDrdEirGT+2ZWOTtk9OmVkIooYCswxHVOp1jWGAnOGal1jOqb+1XmevqTa0HiVyDIUmEMMjk4Sml/lqtZkcHTScFVrEppfJTS/SqvTZTH5DiVd4MvFN0qVE+NPOL1B3IEZYslNnMNj9A8H6R8OEktu4g7M4A7MoOZ2UHM7KG+2ePJiCac3iNM7Rr83iLDKPmyyD5vsxyr7sEl+bJIPq+zHKul3fbfJ/l+/ks9I8WjwMQ8hLC43fTrLgJ4uD30uD3edx2AZ0PsBNxaXG2F2yJgdMia7hNkhY7brs13G7JAwGTcZk0PCbJcw/eYnDKTjHv2fDS0AAAAASUVORK5CYII="
    };
});

bt.addSource("TGZ", function () {
    var tgz = "https://thegeeks.click/browse.php?incldead=1&nonboolean=1&titleonly=1&search={query}";

    return {
        url: {
            all: tgz,
            elearning: tgz,
            docs: tgz + " -pdf -ebook -mp3 -m4a -aac",
            ebooks: tgz + " -xvid -pdtv -hdtv -avi -mp4 -wmv -mkv -dvd",
            abooks: tgz + " AND (audiobook OR mp3 OR m4a OR aac OR flac OR ogg)&nonboolean=3"
        },
        onParse: {
            row: "tr.ttable",
            link_prepend: "https://thegeeks.click/",
            sel: [
                {
                    text: "a[href*='details.php']:eq(0)",
                    freeleech: "font[color='blue']:contains('FREE')"
                },
                {text: "> td:eq(8)"},
                {text: "> td:eq(6)", link: "a[href*='download.php']:eq(0)", noblank: true}
            ]
        },
        onPrepareQuery: function (context) {
            if (context.category === "abooks") {
                context.query = context.query.split(' ').join(' AND ');
            }
        },
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAwUlEQVQ4jdWSvWoCURBGT1zSiJUmzfbiU6QOkt4qkFcQ3ymdWq4h2ucFRAI+hEsarTw2t7gs+3NJZ/E133xzhrlzAUyRDWICxoqbYr8RUDWyhKl3BCjAKfgc/EcwB2fgPgXQpgF4SAHk4DdYgltwGNU+UgCrSn0DfoLH1BXK4F/Bc0WXOoBgLzQ/RN5PzTtkTYBRFDr9B/AWhZZ1t+8CFJUrfIF/4C84TwEILjr+AeBLG0BwDb6CT2FaHxyD7+AuZG4TCI/1JWS7dwAAAABJRU5ErkJggg=="
    };
});

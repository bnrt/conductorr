bt.addSource("RarBG", function () {
    var rarbg = "https://rarbg.to/torrents.php?search={query}";

    return {
        url: {
            all: rarbg,
            movies: rarbg + "&category=14;48;17;44;45;42;46",
            movies_1080: rarbg + "&category=44",
            movies_720: rarbg + "&category=45",
            movies_bluray: rarbg + "&category=42",
            movies_remux: rarbg + "&category=46",
            tv: rarbg + "&category=41",
            docs: [rarbg + " documentary&category=movies", rarbg + "&category=18;41"],
            music: rarbg + "&category=23;25",
            music_flac: rarbg + "&category=25",
            //		music_mp3: rarbg + "&category=23",
            elearning: rarbg + "&category=35",
            ebooks: rarbg + "&category=35",
            xxx: rarbg + "&category=4",
            games_pc: rarbg + "&category=27;28",
            apps_win: rarbg + "&category=33"
        },
        onParse: {
            row: ".lista2t tr.lista2",
            link_prepend: "https://rarbg.to",
            sel: [
                {text: "td:eq(1) a:eq(0)"},
                {text: "> td:eq(4)"},
                {
                    text: "> td:eq(3)",
                    link: function (context) {
                        var link = context[0].firstElementChild.nextElementSibling.firstElementChild;
                        var id = link.getAttribute("href").split("/").pop();
                        return '/download.php?id=' + id + '&f=' + encodeURIComponent(link.textContent.trim()) + '.torrent';
                    },
                    noblank: true
                }
            ]
        },
        onValidate: function (response) {
            return response.finalUrl.indexOf('/bot_check.php') === -1 ? true : "captcha";
        },
		onFilter: bt.requireAllWords,
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABs0lEQVQ4jYWTP4jXMBiGK3IIde5cHG6wi1MRp04u2TNKxoNsQjaR4HAIhduy3FREDqFznBwyZxSyOBXH4CBC4RCR54a2P+9PDwPv8r0fT96PLymAB0ANvAHeA6c7OgGO194bKoAXwBf+f34Bb4Gj24DXwM+QMtJEpL0pZSPGJULKG+hsF+BjplWBTgdata8xZIBL4OndBDHT6YDQAdMnQsyEmDEuIfQCVjYyLylOdgHCBIQJuDFtcf/mDNJGhAlIG8nLJO92AdIE5C3ANM0ou9R1f0ig7gfYgHWREDM+TJg+Io2nU57Bp20bT+4BeKTxCD3SyGGRWGRd3FKd7m8hTDTCUXc9rXQINVB3PXXX0wjHNM3b7ce7gNEnysZQNgZtRwC0HSkbQ9UahB62BJ+BRzuASNloylqhzdI8zzOtsP/qK/j6GNcAgaKWFJVEGQfwB7iMaaJqFOXqucFvEAUcHQDDGCjKjqLskLoH+MHywX67wVNUi1dUAh8iwHfgVQG8BGLOMzEmQkxMUwb4usY8A4gpHfyUJoBvgCzWpmfAOXABfAQ+AM9X7/H68j6t3gUwrP7DKzy0Ezk+OKScAAAAAElFTkSuQmCC"
    };
});

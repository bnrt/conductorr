bt.addSource("Shellife", function () {
    return {
        url: {
            music: "http://shellife.eu/browse.php?search=",
            music_flac: "http://shellife.eu/browse.php?search="
        },
        onParse: {
            cleanup: ["div[id]", ".grey"],
            row: "tr.torrent_row",
            link_prepend: "http://shellife.eu/",
            sel: [
                {
                    text: "> td:eq(1) > a:lt(2)",
                    link: function (context) {
                        var id = $("a[href*='download.php']:eq(0)", context).attr("href").split("id=")[1];
                        return "details.php?id=" + id;
                    }
                },
                {text: "> td:eq(6)"},
                {text: "> td:eq(4)", link: "a[href*='download.php']:eq(0)", noblank: true}
            ]
        },
        onFilter: bt.requireAllWords,
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACa0lEQVQ4jX3T30+ScRTHcf+o5u9ya866q5gXrhunde9aaTNbd66L/FUiQ6eVzhzamKDiRK1Jlg9oGCCoCPLIo/gAGvAYukH5fXfVhRM71+e8trPzOUUUKCEE+Xwet3sdk2mCgYEhNE0r1EpRoWFJcmIyTbAirbIdDPHd7cG9/gMhxP+BbDbLyPAoTpebeOKIVDpDKpUhmTzGH9gim81eDeRyOfr6jHxZlpD3FNJpjUzmBE37RSZzgqIckMvlCgNCCEymCRYWlwjuhNnwbxI7VPmZypBOp0mnNaLK/tUrRKMKwyNjyHsKscM4oXAEjzfAQUwlkTxG3lNQ1fjVgNk8iXvdgxpPsn9wyHYwxIrkwuPdQI0nicXUgsMARUII3r0fIbwrE08cEZGj+DYCLH+V0OuNtLW9QK83sLW1RT7/uzDQ0fkaf2CbiBwlFI7g9fnp6emlquom1dU19BmMLMx/xuFY5vz8z2Wgq/sNG/5NdkK7bAdDeH1+GhoeUFlxndKScpqaHrG25mbGNkckIl9Yp0gIweDgWzxeP8GdMPKeQnhXprHxIeVllRRfK6Gy4gazs3PYbHP4fP6LAIDVOsWMzU5EjnKoJlDjSdrbX1JeWkFpcRl379zD4VjGbv+E07l6+QqadsLjJy309w/xbcWFohzQ3PyUWzW30elq6XjVhX1+Eat1mkBgs3CQJEmiru4+Ol0t9fUNtD57Tq/ewPDIKBMfzZjNFiyWac7Ozi4D/xCXy0VraxsGwwDNLa306g10dHbzYWycmZlZolHlUh4uPJMQAk3TMJsnGRsbx2AwYrFOsbTk4PT0tGCY/gKeZ3zk0q3/+QAAAABJRU5ErkJggg=="
    };
});

bt.addSource("WFL", function () {
    var wfl = "https://www.waffles.ch/browse.php?q={query}";

    return {
        url: {
            all: wfl,
            music: wfl + ' (FLAC OR MP3 OR AAC)',
            music_flac: wfl + ' FLAC',
            fiction: wfl + "&c86=1",
            mags: wfl + "&c87=1",
            ebooks: wfl + "&c86=1&c87=1",
            abooks: wfl + "&c89=1&c90=1",
            comics: wfl + "&c88=1",
            apps_win: wfl + "&c83=1",
            elearning: wfl + "&c89=1&c90=1&c88=1&c86=1&c87=1&c93=1"
        },
        onParse: {
            row: "#browsetable > tbody > tr:not(:first-child)",
            link_prepend: "https://www.waffles.ch",
            sel: [
                {text: "> td:eq(1) a[href*='/details.php']:eq(0)"},
                {text: "> td:eq(7)"},
                {text: "> td:eq(5)", link: "a[href*='/download.php']:eq(0)", noblank: true}
            ]
        },
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAP0lEQVQ4jWNgGF5g3969/9ExSZqxAaINgRlQU1UFxzADCLoMl+34AIoh2GzHh3EaMOoCClwAM4QUTFTiogsAAK9ZxAOBV0RTAAAAAElFTkSuQmCC"
    };
});

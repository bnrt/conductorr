bt.addSource("BHD", function () {
	// NB: Spaces should be replaced with % signs, otherwise search works for an exact phrase

    var bhd = "https://beyond-hd.me/browse.php?incldead=1&searchin=title&search={query}";

    return {
        url: {
            all: bhd,
            movies: bhd + "&c50=1&c77=1&c75=1&c49=1&c94=1&c61=1&c78=1&c86=1&c37=1&c54=1&c17=1",
            movies_1080: bhd + "&c50=1&c77=1&c86=1&c94=1",
            movies_720: bhd + "&c75=1&c78=1&c54=1",
            movies_remux: bhd + "%25remux&c50=1&c77=1&c75=1&c49=1&c94=1&c61=1&c78=1&c86=1&c37=1&c54=1&c17=1",
            movies_bluray: bhd + "&c37=1",
            docs: bhd + "&c50=1&c83=1&c77=1&c75=1&c49=1&c94=1&c61=1&c78=1&c86=1&c37=1&c54=1&c17=1",
            tv: bhd + "&c40=1&c44=1&c48=1&c89=1&c46=1&c45=1",
            mvids: bhd + "&c55=1&c56=1&c42=1",
            music: bhd + "&c36=1&c69=1",
            music_flac: bhd + "&c36=1"
        },
        onParse: {
            row: "table.torrenttable > tbody > tr:gt(0)",
            link_prepend: "https://beyond-hd.me/",
            sel: [
                {text: "a[href*='details.php']:eq(0)"},
                {text: "> td:eq(9)"},
                {text: "> td:eq(7)", link: "a[href*='download.php']:eq(0)", noblank: true}
            ]
        },
		onPrepareQuery: function(context){
            context.query = context.query.replace(bt.spacesRegex, "%25");
		},
		onFilter: bt.filter3dMovies,
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB5ElEQVQ4jYWTz2sTQRTH39mDqCdB8P/wVjJDsTeP4g+I6M7OFKGBXqqnYjKrp0JPUgv2oj2EzKSlWsjBQmcOi2KaQ0sDgrSyxdimdNEqKUnj8+LG7A/pg3eb7+c78+Z9ARI1kl+4kHNUnjjq1dj48jcubZNL+9ot2nu3p1fPJ8/HijJ1izD1mTKNlGmkbrUnpOkJz6LwLHLPBFyam5ninKOKA+HfHnWrJ88WNk4jQNRuyRZTzkkxZRrliw/dmh/0kwDhWXSluQMAANfuly8RplpZgLdm9/Qw7PzOAghpDtj0yjkgTLlZYso0Hv/qIiLi05eNNMCzyKXJA3H0EmUabxRWcP3jHta397G+vY+fdkOMqh12sLkTDjoCcmkqQBwVRI4R5H/1pXUcuw2Xpg5Z759XWymxbbRwcsZPzME2gDh6NQl4Mvc+Baj5QXoGnlmG3ANVSALemB1ERNxoHvRrftCP5pABEDCSL1+mTB8NA762f+K82sJRt3oipOnNLm5iO+zEf0Pa72LKXgQAAOKo8Uh893ENhVwbbGK0ypMzPs4ubv5zL5mH8W109POsVR7OwpD7XGYeiFOZIEwfDkG68TDZH6JkCmcksnyVssoUYWrtulg64tLucWnWXWke8dK7K8nzfwBqE0A4H4ujDAAAAABJRU5ErkJggg=="
    };
});

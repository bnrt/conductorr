bt.addSource("HDS", function () {
    var hds = "https://hdsky.me/torrents.php?incldead=0&spstate=0&inclbookmarked=0&search_area=0&search_mode=0&search={query}";

    return {
        url: {
            all: hds,
            movies: hds + "&cat401=1&cat410=1&cat405=1",
            movies_1080: hds + "&cat401=1&cat405=1&medium7=1&medium5=1&medium11=1&standard1=1&standard2=1",
            movies_720: hds + "&cat401=1&cat405=1&medium7=1&medium5=1&medium11=1&standard3=1",
            movies_remux: hds + "&cat401=1&cat405=1&medium3=1",
            movies_bluray: hds + "&cat401=1&cat405=1&medium1=1&medium12=1",
            movies_dvd: hds + "&cat401=1&cat405=1&medium6=1",
            docs: hds + "&cat404=1",
            tv: hds + "&cat402=1&cat403=1",
            mvids: hds + "&cat406=1",
            music: hds + "&cat408=1",
            music_flac: hds + "&cat408=1&audiocodec1=1&audiocodec2=1"
        },
        onParse: {
            row: "table.torrents tr.progresstr",
            link_prepend: "https://hdsky.me/",
            sel: [
                {
                    text: "> td:eq(1) a:eq(0)",
                    freeleech: ".pro_free"
                },
                {text: "> td:eq(5)"},
                {text: "> td:eq(4)", link: "a[href*='download.php']:eq(0)", noblank: true}
            ]
        },
		onFilter: bt.filter3dMovies,
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADEElEQVQ4jYXT3U+bBRTH8aNu082XVXhKWTcYbJPS0lf68rRlA+xITEbihYkx8QXBrTOVDkrfaeimnQM13mniXOTG6IgyYHSFvoAt6xAMQ/13vPt64QxsF3qSc3k+OeckP5HH64CIHPqfPigiTz0xJwffdjQOzAeNf1Ui3VSjbu7HnBTDVjZiTspjVu5eNlD4yMjdkJmv32z9XkRe3A+Zb18yMR80sB51UYt7qCfclMZsbKZVVsNW8iEDK6NmlkNmFi6b+PKtzjkReVZE5NBFf+Pnc0ETC6EuqgkPazEX9ZSHalylnvJQidgpjBopjlnIhy0sjzpYHlcREZ2IyOFhr+6728EulkbNVJMqtaRKPe2hlvKymfGxFu2mNG6hPGHl5+Aplq84uDfhRURaRUSODPt0s3MfmlkcNdJ89AU2p85Sz6i0NLzEN0MW2rUvc7pJw08hKz8M6ylEnKzE/YjIyX8Av272TtjKUriLNkXDr9letq+eo6NZ4dsRGxMX2rk3bsFwTKEU62Y16mI1eXYPGPHrZheu2MiPmWlTNLyia+CMrgGjXsuti3Yig+2Uozb6OnWsZ9wUY26K6XP7gF7d7HzYRj5ipU3RsJPrZ+vjPjqaFW6OWIi9bqASt2NrVVhNmKkkVMqTTwB3xmwUojbaFA0PbwzwW66fjmaFW5fs9JlOEDA1YdRrKUTNlONOiinf48BixMFq3M6PoTP88cUgO5++Sj7dw8aUj6WYm6Wog/tZlbWUi1LCzUrSswcEe/WzixEHhaiVStLM7sxr7NwIsPVJH7vTAepZP7+kuqlf9bKe8bCW9lHK7D3x8BsO7Vf5uItiwsFG1sv29QEeTgfYyvWzOxOgnu2hOunkwTUf5aSd9UwPK5O9iEiLiMgzInIhH3NSSrnYuh5gZ3qA3ZkA27l+fv/sPBtTXmqTTh5c87ISN1Gb6qP3lFIXEc2/WdA2PXcgN2hsZEg9wZDawvvqcd7zHOcD/0nedR1jWNUz4tXzjltPl/bInyLSJSJP70/k849uMohI53/0aRFRHm0ufwPkeZfm3qXqFQAAAABJRU5ErkJggg=="
    };
});

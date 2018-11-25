bt.addSource("AvaxHome", function () {
    var q = "http://avxsearch.se/search?q={query}";

    return {
        url: {
            all: q,
            movies: q + "&c=54",
            movies_1080: q + " 1080p&c=54",
            movies_720: q + " 720p&c=54",
            movies_remux: q + " remux&c=54",
            movies_bluray: q + " m2ts&c=54",
            movies_dvd: [q + " DVD&c=54", q + " DVD5&c=54", q + " DVD9&c=54"],
            music: [q + " mp3&c=2", q + " flac&c=2", q + "&c=568"],
            music_flac: [q + " flac&c=2", q + " flac&c=568"],
            mvids: [q + " video&c=2", q + "&c=54"],
            docs: q + " documentary",
            games_pc: q + "&c=3",
            apps_win: q + "&c=10",
            elearning: q,
            ebooks: q + "&c=5",
            fiction: q + "&c=5",
            abooks: q + " mp3&c=5",
            comics: q + "&c=665",
            mags: [q + "&c=6", q + "&c=151"]
        },
        onParse: {
            row: ".article",
            sel: [
                {text: "a.title-link:eq(0)"}
            ]
        },
        onFilter: [bt.filter3dMovies,bt.requireAllWords],
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABRElEQVQ4jbWTsc2DMBBGPQCIElHQIFEwAKJgBmTJe4DEFImURYA1PAJM4A2c0s37K5+SEKQ0vyWL6t4933co9U8HpRTzNHIcO8exY63lOHZ+Ks7SBKUU3j/lOucE9FNxCAHvn9IZwDmHtfYSQpYmAgDw/klTVxg9EEIAEMAJkqUJTV3R1NUboO9amrrCOUcI4dKCssgxepAC75+ifRz711nIUMsip+9a5mmk71qyNBHtqA6Iwckidn/cb/RdS1nkxCcZPTBPI9ZagcThngDbumD0QFnkcuNgszRhnkYx+oyUpq7Y1oV5GmnqirLI5fsK2tZFAG+LFTt8WkRohBg9SEJvMTZ1RZYmPO43HvcbRg8S37YuYhABzrnzMsUu8zQyTyNGDxJtWeQopdjWhRDC9TpHk7hQr6kYPZzVLw6vN+7It3/gD44Pszjh7GJmAAAAAElFTkSuQmCC"
    };
});

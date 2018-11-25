bt.addSource("TL", function () {
    var tl = "https://www.torrentleech.org/torrents/browse/index/query/{query}";

    return {
        url: {
            all: tl,
            movies: tl + "/categories/1,8,9,10,11,12,13,14,15,29,35",
            movies_1080: tl + " 1080p/categories/13,14,35",
            movies_720: tl + " 720p/categories/13,14,35",
            movies_bluray: tl + " (AVC OR VC-1 OR BD25 OR BD50 OR COMPLETE OR M2TS OR ISO) -x264 -re-encode -re-encoded -bdremux -remux -3D -720p/categories/13,14,35",
            movies_remux: tl + " (REMUX OR BDREMUX)/categories/13,14,35",
            movies_dvd: tl + "/categories/12",
            docs: tl + "/categories/29",
            tv: tl + "/categories/27,32,35",
            mvids: tl + "/categories/16",
            elearning: tl + "/categories/5",
            games_pc: tl + "/categories/17",
            apps_win: tl + "/categories/6,23,33",
            ebooks: tl + "/categories/5"
        },
        onParse: {
            row: "#torrenttable > tbody > tr",
            link_prepend: "https://www.torrentleech.org",
            sel: [
                {text: "a:eq(1)"},
                {text: "> td:eq(6)"},
                {text: "> td:eq(4)", link: "a[href*='/download/']:eq(0)", noblank: true}
            ]
        },
        onValidate: function (response) {
            return response.responseText.indexOf('/user/account/signup') === -1 ? true : "login needed";
        },
        onFilter: [bt.requireAllWords, bt.filter3dMovies, function (data, response) {
            if (["elearning", "ebooks"].indexOf(response.context.category) !== -1) {
                return data;
            } else {
                return bt.requireAllWords(data, response);
            }
        }],
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACfUlEQVQ4jaXST0jTcRjH8edQaWB5EG+GkhCY6aFmp2Qzm6bhRZBE0BnRoUsGm3oYLNOyCZqVKRNBMEHm9OBaEoontUMF9kcwEiwmsgIHkr9995sb/N4dRhODvPTAc/nA8+Lh4RH+s+TvwOv1UlVVhdPpTGU+nw+32017ezsWiwWHwwGAYRj7gN/vZ2BgALfbja5HycrKSgEul4vlnWFmt1082DiLiBAKhVBK7QN9fX3EE3H24ntEdYXI/nJ2u53X2528CDVxcz4DEWFxcZFwOJwEvF4vHR0dxON7xPZiRJSGiJCWlobH48FmszEesvHw2zmuPjqOiDA1NcXW1lYSqK2tRY/p6DGdqK5Y+7LG5KSXpeUl8vLyqKioYHCzEsfXk1y6m4aIMDY2RjAYTAIFBQWoaAQVjfDjZwh3j5v6+uvYHXZEhKKiIp4Gy/4NtLa2kp2dTURpvHv/lsamRkQEEaGuro78/HyeBM3/BgByc3OJKI3V1c8poK2tjZ2dHQoLC3kWvHw4YDKZUFHFrvaLrq5ORISFhQUASktLeb5ZcThQUlJCNKqIKI2XAT8igqZpANTU1DC0WX04kJOTQ0RpaJFdlt8spW7Q399PeXk5Pd/Pc2shgwu2Y4gIo6OjBwER4eOnD8z4Z/AMe3jc38er2QAiQmZmJreXT3DlXjqnLUcQEUZGRvaBRCJBQ0MDIkJLyx2qr1VTVlZG843m1CbW++mcqTzKqYtJYHx8PPlIhmGg6zrr6+tYrdbUwJ82mUyYzeYDWXFxMfPz88lXNgyDRCJBOBxmZWWFiYkJuru7cTqd9Pb24vP5mJubY3p6msHBQYaGhggEAmxsbKCU4jcmF8IcHBr/0wAAAABJRU5ErkJggg=="
    };
});

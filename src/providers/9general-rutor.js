bt.addSource("Rutor", function () {
    var rutor = "http://live-rutor.org/search/";

    return {
        url: {
            all: rutor,
            movies: [rutor + "0/1/100/0/", rutor + "0/5/100/0/", rutor + "0/7/100/0/"],
            movies_1080: rutor + "0/0/100/0/1080p ",
            movies_720: rutor + "0/0/100/0/720p ",
            movies_remux: rutor + "0/0/300/0/remux|bdremux ",
            movies_bluray: rutor + "0/0/310/0/bdinfo -bdremux -remux -hdtv -bdrip ",
            movies_dvd: rutor + "0/0/300/0/dvd|dvd5|dvd9|dvdr ",
            music: rutor + "0/2/100/0/",
            music_flac: rutor + "0/2/100/0/FLAC ",
            mvids: rutor + "0/2/300/0/-mp3 -flac -ape -aac -alac ",
            tv: rutor + "0/0/300/0/720p|1080p ",
            docs: [rutor + "0/12/100/0/", rutor + "0/6/100/0/"],
            games_pc: rutor + "0/8/100/0/",
            apps_win: rutor + "0/9/100/0/",
            elearning: rutor,
            ebooks: rutor + "0/0/300/0/pdf|epub|fb2|djvu|chm|mobi|doc ",
            fiction: rutor + "0/0/300/0/pdf|epub|fb2|djvu|chm|mobi|doc ",
            abooks: rutor + "0/11/300/0/flac|mp3 ",
            comics: rutor + "0/0/300/0/CBZ|CBR ",
            mags: rutor + "0/0/100/0/PDF "
        },
        onParse: {
            row: "#index > table:eq(0) > tbody > tr:gt(0)",
            link_prepend: "http://live-rutor.org",
            sel: [
                {text: "a[href*='/torrent/']:eq(0)"},
                {text: "> td:last > span:eq(0)"},
                {text: "> td:eq(-2)", link: "a[href*='/download/']:eq(0)", noblank: true}
            ]
        },
        onFilter: [bt.filter3dMovies,bt.requireAllWords],
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAClklEQVQ4jZXSS0hUcRTH8TPXe//Xmes0apqWJQxZDBUFhhSUEbRoFUUSRBC0CFr0WLWqRWLtgloKRVowBJq06IFOr+mhmTXKWD6oHHMcNJsevmbGx9W+LVyEaEW/9TkfDoefyF+S+lrF9Iifv838MTPxo0TqSoje2cJU/Nj/IdOxrby/6KbK48Cfo9Fx3ondv/HfiD1awVjIonm/cFd0gpJGeEcmnWc20HTI4HvAxB4+vjg0k9zHjxfCgw0aDZJOdLeTb2UGoVyd8NFCYrVFBIoN4nVCIrp+PoJdyqca4Y5X8VQMBk654ItirN4kmmvwUoTBGg/RCxnUmorOCg17IH8OmZ1ZRbhS8CuNp6IRO2GBrZgd0xm65OKHOBgRjXe7FKlXbhpNHb84aD6rwcQyJPW5mHC5okYUbQ6TN8VOItezebxHMfnRYuqIyZRoxHwGY+0eWpeb1IlOuNwi1rNu7orBKoN7mk6XQ6NL0mgUk5AYhEoV9ocMEmUmQ6UuUs8tWrJ0HiqDVP2S33+YaMzjkVejRRQD+YrEfkVyu4uPotNels7IEzfJF06+XLMIaornawwSrTnzH9l12qRedAYrPNjTGUwOWcxUKnoPOhjtdgEGHSctGkSn7YDO61DJfGA44KJpbzrDb3K4u80kWGrSX69I9Cq6rpq0XXQxHc0jsNpFX2XWwi6Mfs6hr8Hi1mYnD0XntaQTEJ0GQ+O+GNwSRXO5l07/JuKhpQuBxp6dPDtncEXSeCYGraLzVoQ2EVpFCIrOZdG4cbiAie7cxdsYb/FQvcLi9ko3jwo9BAszCXpzeVKUx/21BVT7VtJ+08f4vVWLA3Z/JqmIm+T7bJKRfMYjhUxFVzMRLSLV52NywMfP70Xzln8BusiizCnLlwcAAAAASUVORK5CYII="
    };
});

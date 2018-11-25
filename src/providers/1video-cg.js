bt.addSource("CG", function () {
    var cg = "https://cinemageddon.net/browse.php?search={query}";

    return {
        url: {
            all: cg,
            movies: cg,
            movies_1080: cg + " 1080",
            movies_720: cg + " 720p",
            movies_remux: cg + " REMUX",
            movies_bluray: [cg + " BD25", cg + " BD50"],
            movies_dvd: cg + " DVD-R",
            docs: cg + "&c15=1",
            music: cg + "&c11=1",
            elearning: cg + "&c19=1&c5=1",
            ebooks: cg + "&c19=1"
        },
        onParse: {
            cleanup: [".torrenttable span"],
            row: ".torrenttable:last > tbody > tr",
            link_prepend: "https://cinemageddon.net/",
            sel: [
                {text: "a[href*='details.php']:eq(0)"},
                {text: "> td:eq(6)"},
                {text: "> td:eq(4)", link: "a[href*='download.php']:eq(0)", noblank: true}
            ]
        },
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACkklEQVQ4jX2Ty0tUcRTHz3V0dBrvXB29M5RajulcnFuTw/WnXAkryFdFiWGhQQgFwdCDCKJatAgjcRHVKsqGpOxB9F70AF0Y9QdEi6JdEFS0CqLXvXxajGWhtfhuzoEP53vO+Yr/LMvQxhXUmCbdSv1Wh+OgLAvTMFgaEyZ2CV5ursS/ncZ/lmWwZxnxeBzXdXFdl5aWFhobGzEMA7tKuLXnHwAvJ/h3mvj+NMtAt/0bopTCsix0XUclhIcH/gPwchr+3cxfEKUUyWSScDhMW70wulV4cVz4OjYvYBby42mWwR6bAk2jrq4OXdeJhIS1tnBovfDggPDl/LyAWcjbm70Y4UIqSjUGVscYXBMnWlpAbaVwcJ3w5Ijw+ZzwamQOQPCumOzbVEVVucarEcG/p/An+/jwcCf24hKc2vwkI/3C5ub5APfbqF8UYke78Hx4pnYxiP+ok6nTnRRowuIKIVAghMPhuRa+P95IVbSIHe3C9OE/elfjvBxfSyAQwDRNEokEqVRqFvBtTHh/RvBuJMgsEZxaYWSL8Ho079fLaVzYvZBIJEI6ncZxHFpbW5FPZ/PnuZ4V9nYI3cuFUDA/4sqksL9LGN2S9xwJabSlyonFYjiOg+u6yLE+YUOTEA0LwWAQwzAwTRPDMAgGgxQXCWULhMpIgOFtMfzJPoazq4hGo3kLhYWF6LpOdXU1lmVh2zYNDQ2YpkltpTCxp4ybR5v4eMnCGy/Bu1GHP72dayd6KQ0VIQ319di2TSaTQSmFUopUKoVhGHQuE96dEbzLZXg5bXah1xbiT/UzPbYNaZlZxq8Q/Xrh4uJihlYKb07OnwFvIor/uAfpaW6mQym6ZtSeTpOsqaGkSDg1+PfbztF4iJ/rnQNd64LE/gAAAABJRU5ErkJggg=="
    };
});

bt.addSource("Genesis_Fiction", function () {
    var genf = "http://gen.lib.rus.ec/foreignfiction/?s=";

    return {
        url: {
            all: genf,
            elearning: genf,
            ebooks: genf,
            fiction: genf
        },
        onParse: {
            row: "tr:has(a[href*='foreignfiction/ads.php'])",
            sel: [
                {text: "> td:eq(0), > td:eq(2)"},
                {text: "a[href*='/ads.php']:eq(0)", link: "a[href*='/ads.php']:eq(0)", noblank: true}
            ]
        },
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABh0lEQVQ4jY2SoYvUQRiGP5bjwiGyiBhETIssDPx+M88DhxgMIodcMBhNBoNc8i8QDCKHwWAQMZjEICIGg+G4dEkOEcMhYhARk4gsIrLIWmZlXXfX+2DSzPvOM++8EQumlHIaaCJiadG5maNeVkfqCBgAW8CNnPO6enihuJRyXh2ODaYX8EvdA279I845n1K/q9tt254ALgC31d0qnDR6No3dV7/UA2/Vm+par9c7WM276ou6/yqldGAS+6j6YQ72UN1VH1eKj8A59e4Yuwu8nvfmKexBzjkDV4GXkVJaVrf3I1aHOef1iAjgnvom1Gv7FI9KKVdqVhfVIXAm1D31obqhPlW/zUHfjIho23ZV/aFuREUZjLEiIlJKy7WBm+NcgEcR0Wma5hjw6U941WAHeBARnVmlaprmSEQsqSu1C1sxWe22bVeBr+pn9X5t4cqUT6d+4buU0qFZ7esCl4AnwKC+8XnN5Xgp5Xq9pD+L8q+p37oG3FHf1wx+llLO/lc8a9Q+cHLe/m9CrdD4hthLEQAAAABJRU5ErkJggg=="
    };
});

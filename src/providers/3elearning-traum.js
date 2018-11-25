bt.addSource("Traum", function () {
    var traum = "http://lib.it.cx/?find=";

    return {
        url: {
            all: traum,
            elearning: traum,
            ebooks: traum,
            fiction: traum
        },
        onParse: {
            row: "tr:has(a[href*='epub']):not(:has('tr'))",
            link_prepend: "http://lib.it.cx",
            sel: [
                {text: "a:eq(0)", noblank: true},
                {text: "> td:last"}
            ]
        },
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAM0lEQVQ4jWPo3v7gPyWYoXv7g/9y2ZvJwoPIAGwYm2KsYYAN4DIAq+JRA0YNoKkBxCZbAF6fe55MSrHNAAAAAElFTkSuQmCC"
    };
});

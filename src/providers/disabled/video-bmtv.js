bt.addSource("BMTV", function () {
    var q = "https://www.bitmetv.org/browse.php?incldead=1&search={query}";

    return {
        url: {
            all: q,
            tv: q,
            docs: q + "&cat=101"
        },
        onParse: {
            row: "form[action*='/browse.php']:last ~ table:last > tbody > tr:gt(0)",
            link_prepend: "https://www.bitmetv.org/",
            sel: [
                {text: "> td:eq(1) a[href*='details.php']:eq(0)"},
                {text: "> td:eq(8)"},
                {text: "> td:eq(6)", link: "a[href*='download.php']:eq(0)", noblank: true}
            ]
        },
        onFilter: bt.requireAllWords,
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACgklEQVQ4jW2TP2gjRxTGF7NccQgX4nBxmFQprzpMikO4CCKFESlCquAqiCvMVsGkOBYVZiuxpDBLikOoCIMLs1xhBhfL4MIMLsTi4lhciEGFGLY4BhVicWEEvytG3gshxceb9/H+z3tBPM749bchw5OIyVSQjDPS8wxxmSMLhbz2ULea8nOFKhTiIic9z0jGKcHph5jh+4jTDzHJOENcCO9YKOSNQs9KzMLSrBvcymEWFlkoxGVOPEoIhienxKOE9Dwjv5I+Y+Edbe1o1g3No4f94rC1xcwNslBMpoJgMhXoWUn1YKg+V1Rzg1s5mscNm6cNzdOzbLx8DlZb9J0miE4iwp3wf7H/3X77jkcxqlCt3tntYOaGIBkl9N8dsN99RbgT8monpPf2gMFhj+j345Y7/mVA9lfa6oPDHmZhCfRdia0tx4c93rwIefMiRN8omseG8ka13PFhj+wsbvXkjwi3cgTqVlM9GKIfewxehgxehpSFYrPt/ZmLfjhg8udpq8vpBFtbgudppz/1iXZDol0foHn0Q0veHbT8f218BTcaMzeIoz5pt0Pa7VAVcvsTDfJk2PL/tnErh11agvyTxCwt6qiP6HYQ3Q7mWuLWDc26ofo7bXn59vtWunWDrZ3fg+rBoI766L0Oes8HsLXF1hZ3q1pedL0sj/q4lfN7kH2coO801c99qtfewG4DuLXfRL3XoXr9DeYsRs9K9KwkSMcp4iKnnJXYpfW91RazsNilv4HN06bt2cwN5X3lK1xafwuTqSD7OPGrvIVZ+BbM0lLeV8hCkV9JynufSPyTM3wfEcRnCfEoQVzkvpKts5kb1K0m/yQRl98qlFdye7kp+bXiK0Aav3PRm9FxAAAAAElFTkSuQmCC"
    };
});

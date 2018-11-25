bt.addSource("AHD", function () {
    var domain = 'https://awesome-hd.me/';
    var ahd = domain + "torrents.php?action=advanced&order_by=time&order_way=desc&groupname={query}";

    return {
        url: {
            all: ahd,
            movies: ahd,
            movies_1080: ahd + "&filter_cat[1]=1&resolution=1080p",
            movies_720: ahd + "&filter_cat[1]=1&resolution=720p",
            movies_remux: ahd + "&filter_cat[1]=1&media=Blu-ray",
            tv: ahd + "&filter_cat[2]=1",
            docs: ahd
        },
        onPrepareQuery: [
            bt.extractGazelleYear,
            bt.extractGazelleResolution,
        ],
        onParse: {
            row: "tr:has(a[href*='action=download'])",
            link_prepend: domain,
            sel: [
                {
                    text: function (context) {
                        if (context.hasClass('torrent')) {
                            var td = context.find('td:eq(2)').children().first().nextUntil('.tags');
                            return td.append(' ').text().trim();
                        } else {
                            return '<b>' + context.prevAll(".group").first().find("a[href*='id=']").first().text() + '</b> / ' + $("a[href*='torrentid=']:eq(0)", context).text();
                        }
                    },
                    link: function (context) {
                        if (context.hasClass('torrent')) {
                            return context.find("a[title='View Torrent']");
                        } else {
                            return context.prevAll(".group").first().find("a[href*='id=']").first();
                        }
                    },
                },
                {
                    text: "> td:eq(-2)",
                },
                {
                    text: "> td:eq(-4):contains('.')",
                    link: "a[href*='action=download']:eq(0)",
                    noblank: true
                }
            ]
        },
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADQElEQVQ4jWVTzU8iBxydW7P7LyjE00IQ2dXElfbS1thGo+tuovFiNV4k7mqtSlFXERawig6gkQ9nBhE7I6PyYQtoXNPwbeSgBw5GDiR7IWL0YuJhQzDm9dAsWe1L3u29l/zye48gHiGXy9WFw2EHy7JZt9tddLvdRZZls+Fw2JHL5eoe68vI5/NPfD7f6uLiYonjOEQiEYRCIQSDQUQiEWxubmJhYaHk8XhW8/n8kwfmQqHwlGGYGEmS4DgOqVQK29vb4Hm+zKOjI3g8HphMJlit1lihUHhaDggEAg6SJO83NjYQj8exv78Pl8uFeDyO4+NjrK2tYW9vD4lEAizLwmQy3W9tbTnKN8/NzZVomsbBwQFSqRQcDgf8fj/u7u5QKpUQDAZht9uRSCRweHgIhmEwOztbOj8/ryN2d3dtS0tL8Pl8SKfTsNvtoCgKNzc3uLy8xMXFBW5vb+F0OmG1WpFOpxEIBLC8vIydnR0bYbFYshRFIRKJwOl0giRJnJ2d4fr6GisrKzCbzbi6ukI2m4XJZAJFUYhGo2AYBkajMUsMDAwUjUYjeJ6HRqOB1+tFKpVCLBYDz/PgOA7RaBTJZBJ+vx9arfbLR6BQKIpEa2trsb+/H2azGTRNg6ZpGAwGqNVq6HQ66HQ6TE9PQ6/Xg6Io0DQNi8UChUKB5ubmItHZ2Znt6OjA8PAwvF4fRkdH0dfXh7fv3sFmd0Cr/QCaccK1vg5+axt/siwGh4bQ3t6Otra2LKFSqWwymQwtLS04OPwHPT096OnthVL5O/4OhTE4NIRp9QxUqnGMj0/gr2AI3d2/QCQSYWxszEacnJzUVlVVlSQSCShmDa/fvAFpXoLVvgrGtY6J91OYeD+F+vp6yGQy6P+YR9NPP6OioqJ0enr6X7WVSqVNIpHca2fnUVNTA7FYjO9/+BFTGh26e/swqdZiYHAYb3/9DVrDPBrk8vuRkRHH1wP6pqur6+PLBjnEYjFEIhGqq6vxskGOF7W1kH/7XZmy58/x6tXrh1X+EjI5ObkoFAo/CwQCCIXCBxQIBKisrPysVKmW/zemr5HJZJ5pNBp9Y2NjUiqVfpJKpZ+ampqSMzMzhkwm8+yx/l/wGTPXxmfuPQAAAABJRU5ErkJggg=="
    };
});

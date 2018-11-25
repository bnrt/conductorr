bt.addSource("BIB", function () {
    var domain = 'https://bibliotik.me';
    var bib = domain + '/torrents/?search=@title%20{query}';

    return {
        url: {
            all: bib,
            elearning: bib,
            ebooks: bib + "&cat[]=2&cat[]=5",
            mags: bib + "&cat[]=6&cat[]=7",
            apps_win: bib + "&cat[]=1",
            abooks: bib + "&cat[]=3",
            comics: bib + "&cat[]=4"
        },
        onParse: {
            cleanup: ['time', '.taglist'],
            row: "#torrents_table > tbody > tr",
            link_prepend: domain,
            sel: [
                {text: "> td:has(a[href*='/torrents/']):eq(0)", link: "a[href*='/torrents/']:eq(0)"},
                {text: "a[href*='peers']:eq(0)"},
                {
                    text: function (context) {
                        return $("> .t_files_size_added", context).text().split(',')[1].trim();
                    },
                    link: "a[href*='download']:eq(0)",
                    noblank: true
                }
            ]
        },
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACBElEQVQ4jc3S/0sacRzHcf9JaQsysASLQXSjCUkM+mE0yV+MNO4c2qF2cp5CzptekF4fd2eepR4M2hiFI2Kt7W947qeofaX9the8fnw/fnjzCgT++6iqSqGgYhgGrVaL0cjnwcc7Oxmyioym1ajVqnQ6bZrNFt5xj0O7S7FY/D0mywqyrKAoCrValXK5jG23aTRes18/otsVpNMZWtbBj4DVttlMJEhvp1FkGcOoYpoNhBA4jovrOgwGHoVCAdvuIIS4A/b2NDY2XpBMJslms+TzeTRN40jY1Ot1TNNkNBqhqipCHOG6Ls4bh8Dx6ZiVpxKpVIpKxWC/XqfRaJDP5yiVSlQqbYQQjMdjXmWz5HI5+v0+hqHjeR6BWCzG7GyIUChENBolHo9jWRYnJx4Vo4qulxkOh2xtpdjdzeM4DrquU6tWORkMCFxc3XAoerxMJJmenmZmKsjCwgKbmwk+vP/I6XBIs9mk1bJwHZfJZILv+/i+j2maBM4vv3DbdxeX7BY1wnNzLEXnKZU20PUykiQRi8WQliXiq6tkMhl6vR7X19d3T7wPTa6+YrUFU48eEwwGkSSJSCRCJBJhfi7Ms5UVnq+tsb6+/usO7kMXVzd44zM6b/uUtApb29uEw2EiszM8WVxkeWnp76u8j9320+dvjM/OOeh0KRvGw2f9J/SfgZ/zHe4g1eDb0gaxAAAAAElFTkSuQmCC"
    };
});

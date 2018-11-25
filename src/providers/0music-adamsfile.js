bt.addSource("Adamsfile", function () {
    var adam = "http://adamsfile.com/search.php?s_string={query}&s_year=&albumsSearchSubmit=&s_genre=&s_mediatype=&s_type=";

    return {
        url: {
            all: adam,
            music: adam,
            music_flac: adam
        },
        onParse: {
            cleanup: [".alb_data", ".urating"],
            row: ".albums > tbody > tr",
            link_prepend: "http://adamsfile.com/",
            sel: [
                {text: "> td:eq(0)", link: "a[href*='details.php']:eq(0)"},
                {text: "> td:eq(1)", link: "a[href^='ftp://dl.adamsfile.com/']:eq(0)", noblank: true}
            ]
        },
        onFilter: bt.requireAllWords,
        onValidate: function (response) {
            return response.responseText.indexOf('auth_window') === -1 ? true : "login needed";
        },
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABLklEQVQ4jbWTvYrCUBBGJ2tlsWxvQItUFkKKbRfyHCGFASGiIKRbbuNtLX2PFDb3AUKQFKl9AYtgk7CWVmcLUcTssvizA8M3DMzhm4EREVmLCHfmWkSEj/Sd7rDTUGihtdXQr5cWn5Z1ggjdYYc397WhWlt4ntXQKxdPAPz7Cn8c8gmAB1OwbZuiKDgcDiRJgjHmNkAcxxRFQbvdZrFY3Abo9/ucYrfbobU+A/I8B6Cua4IgQERYLpfUdc1+v2cymRwdXA5d1vP5HKUUWZZhjCEMQ8qyxHVdBoMBtm3/DhiNRpRlyXQ6ZbPZYIxBKUWaps0b/ASIooiqqtBas91uMcbgOA5VVbFarUiShPF4fAR4nofv+1zXYRiilCKKonOv1+sxm82I4xjHcZBH3/kbU+6yqUfzIN0AAAAASUVORK5CYII="
    };
});

bt.addSource("MAM", function () {
    var mam = "https://www.myanonamouse.net/tor/js/loadSearch2.php?tor[text]={query}&tor[srchIn]=0&tor[fullTextType]=old&tor[author]=&tor[series]=&tor[narrator]=&tor[searchType]=all&tor[searchIn]=torrents&tor[cat][]=0&tor[hash]=&tor[sortType]=default&tor[startNumber]=0";

    return {
        url: {
            all: mam,
            elearning: mam,
            abooks: "https://www.myanonamouse.net/tor/js/loadSearch2.php?tor[text]={query}&tor[srchIn]=0&tor[fullTextType]=old&tor[author]=&tor[series]=&tor[narrator]=&tor[searchType]=all&tor[searchIn]=torrents&tor[cat][]=39&tor[cat][]=49&tor[cat][]=50&tor[cat][]=83&tor[cat][]=51&tor[cat][]=97&tor[cat][]=40&tor[cat][]=41&tor[cat][]=106&tor[cat][]=42&tor[cat][]=52&tor[cat][]=98&tor[cat][]=54&tor[cat][]=55&tor[cat][]=43&tor[cat][]=99&tor[cat][]=84&tor[cat][]=44&tor[cat][]=56&tor[cat][]=137&tor[cat][]=45&tor[cat][]=57&tor[cat][]=85&tor[cat][]=87&tor[cat][]=119&tor[cat][]=88&tor[cat][]=58&tor[cat][]=59&tor[cat][]=46&tor[cat][]=47&tor[cat][]=53&tor[cat][]=89&tor[cat][]=100&tor[cat][]=108&tor[cat][]=48&tor[cat][]=111&tor[cat][]=126&tor[cat][]=0&tor[hash]=&tor[sortType]=default&tor[startNumber]=0",
            ebooks: "https://www.myanonamouse.net/tor/js/loadSearch2.php?tor[text]={query}&tor[srchIn]=0&tor[fullTextType]=old&tor[author]=&tor[series]=&tor[narrator]=&tor[searchType]=all&tor[searchIn]=torrents&tor[cat][]=60&tor[cat][]=71&tor[cat][]=72&tor[cat][]=90&tor[cat][]=73&tor[cat][]=101&tor[cat][]=62&tor[cat][]=63&tor[cat][]=107&tor[cat][]=64&tor[cat][]=74&tor[cat][]=102&tor[cat][]=76&tor[cat][]=77&tor[cat][]=65&tor[cat][]=103&tor[cat][]=115&tor[cat][]=91&tor[cat][]=66&tor[cat][]=78&tor[cat][]=138&tor[cat][]=67&tor[cat][]=80&tor[cat][]=92&tor[cat][]=118&tor[cat][]=94&tor[cat][]=120&tor[cat][]=95&tor[cat][]=81&tor[cat][]=82&tor[cat][]=68&tor[cat][]=69&tor[cat][]=75&tor[cat][]=96&tor[cat][]=104&tor[cat][]=109&tor[cat][]=70&tor[cat][]=112&tor[cat][]=0&tor[hash]=&tor[sortType]=default&tor[startNumber]=0",
            mags: "https://www.myanonamouse.net/tor/js/loadSearch2.php?tor[text]={query}&tor[srchIn]=0&tor[fullTextType]=old&tor[author]=&tor[series]=&tor[narrator]=&tor[searchType]=all&tor[searchIn]=torrents&tor[cat][]=79&tor[cat][]=0&tor[hash]=&tor[sortType]=default&tor[startNumber]=0",
            fiction: "https://www.myanonamouse.net/tor/js/loadSearch2.php?tor[text]={query}&tor[srchIn]=0&tor[fullTextType]=old&tor[author]=&tor[series]=&tor[narrator]=&tor[searchType]=all&tor[searchIn]=torrents&tor[cat][]=60&tor[cat][]=71&tor[cat][]=72&tor[cat][]=90&tor[cat][]=61&tor[cat][]=73&tor[cat][]=101&tor[cat][]=62&tor[cat][]=63&tor[cat][]=107&tor[cat][]=64&tor[cat][]=74&tor[cat][]=102&tor[cat][]=76&tor[cat][]=77&tor[cat][]=65&tor[cat][]=103&tor[cat][]=115&tor[cat][]=91&tor[cat][]=66&tor[cat][]=78&tor[cat][]=138&tor[cat][]=67&tor[cat][]=79&tor[cat][]=80&tor[cat][]=92&tor[cat][]=118&tor[cat][]=94&tor[cat][]=120&tor[cat][]=95&tor[cat][]=81&tor[cat][]=82&tor[cat][]=68&tor[cat][]=69&tor[cat][]=75&tor[cat][]=96&tor[cat][]=104&tor[cat][]=109&tor[cat][]=70&tor[cat][]=112&tor[cat][]=0&tor[hash]=&tor[sortType]=default&tor[startNumber]=0",
            comics: "https://www.myanonamouse.net/tor/js/loadSearch2.php?tor[text]={query}&tor[srchIn]=0&tor[fullTextType]=old&tor[author]=&tor[series]=&tor[narrator]=&tor[searchType]=all&tor[searchIn]=torrents&tor[cat][]=61&tor[cat][]=0&tor[hash]=&tor[sortType]=default&tor[startNumber]=0"
        },
        onParse: {
            cleanup: ["a[href*='filelistLink']"],
            row: "tr:gt(0)",
            link_prepend: "https://www.myanonamouse.net",
            sel: [
                {text: "a.title:eq(0)"},
                {text: "> td:eq(6) > p:eq(0)"},
                {
                    text: function(context){
                        return $("> td:eq(4)", context).text().replace('[', '').replace(']', '').trim();
                    },
                    link: "a[href*='download.php']:eq(0)",
                    noblank: true,
                }
            ]
        },
        onValidate: function (response) {
            response.context.searchUrl = response.finalUrl.replace("/tor/js/loadSearch2.php", "/tor/browse.php");
            return true;
        },
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADWUlEQVQ4jQXBW2hbZQDA8aPrJXVr7VBonZ3Tdr2lJ4m1N18E9VEQZE70wVdfh/jmg/gggsqGq+KYax3VydqC9uLWNnR26dbck+Z2cjvJSWbZGAWFbUhnzvd9yd/fTxN7OnbhJHZpAHvPiV0dxjb6aGy2QbCVRrQNtdNCzd+FsNyIshORG6LmPYLYdKDVtp/B3mrH9rVTM/qQezoYXTxeb+XhdgckNUhr2P6j2KYLabmwI8cRNxzIUBuauOFABh2ocDP1UCfs9eNbfIPZL99i7rsPWL7yEXf93ZBx0Ci7qZdc2OEe5K0m6ulmNLXTjEo0g6VxEO1k/sd3WZg9xQP/cWo7GquXxjh37iy710Y5MHrAGkDkdOxwFyLahqbiXRyE2lm73M2V798keO11uNtLw3qB8OopAr7ficaz+EMZNq9PU93WoTqILHoQWTeaqHgQJZ2/dz38mx2Bvwag2svuxjtEEvcoV+5jmiamWaZUfcif3gX2fT00TBcq50ETphNR1sEahrKTRsnJo5vteFdnSBlVisUi+Xwe0zQxDAN/pEL86msQfxZZHEcT20cQ0WMoU0eVXGCcoDzfwfnz01y4OMPS0hKVSoVAIMDMzAzTF66yPPs2jWgrsvAqmtrVEPHDiLwbWdSh8Dxb8++zthknmUyysrJCLBbD6/USCoUIR9P8Ovct/+z00CiPoQnjGKLQjyy4kMURKPcRWXuPSOI+1Tt7lEolDMPANE0sq0z5zgO8f1ziUXSQRsGDJoseZNGFNN3InI7Ku3mcHuTWb6eJxjPc3glgGBl8vpuks1W8Kz9wb9sNBQ8qM4qmCjqy6MaOvIi92Y699TSN9CC11HNcn/+Yi7NLWJbF8uo6c78skF5xQe4kMjqMzIyjqcIoIuXE9rYh/S2o8CFUsJP9oIvFs918cuZDvvj6Mp9+9g2fn9FJLJ7gP18HKniIWqwXTRVeQSSd2FsOVKIJlXsCtduOnRrH2hjCXOvn568m2PpJp7IxwP6tl1GxbkSmAzs9giazHmR2FDvyEiJ6GJF5CpEZop4dp26MQ6gH/E0QdKBiQzSMSVRqApmaRKWm0GzDhTI81PNTiPQYIj2BMqZQxhgq4cJeb0EGWlDhJxG3j6LSU9STE9STk9QTE/wPUBjwW9wnwmsAAAAASUVORK5CYII="
    };
});

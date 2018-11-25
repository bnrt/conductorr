bt.addSource("AVG", function () {
    var q = "https://avg.club/tracker.php?max=1&to=1&nm={query}";

    return {
        url: {
            all: q,
            games_pc: q,
        },
        onParse: {
            row: "#tor-tbl > tbody > tr",
            link_prepend: "https://avg.club/",
            sel: [
                {
                    text: "a.tLink",
                },
                {
                    text: "td.seedmed",
                },
                {
                    text: "a.tr-dl",
                    noblank: true,
                }
            ]
        },
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADMklEQVQ4y02TvW8bBRyGn/OdP+7OZ/vsnO3YTvwRY9I2pE2ISlsQEJBQW6iEqEBMTBQJdv4JFkbEwACCATGwgahUUKFqqZCiCAR0wClOmw/SOHYc2/d9x4Ar+kq/4R2en97lEfk/AhADDGDpmdXSuwcH9lNKIDy3KAfnt1wswAFcIHgISY/AUSAN1N+4Un/nyVOF1fHRHCtnVgTjqw/DepTSl30+AnzgEPCAUJrAIpAEaucu5d4+djJ3IZVMZwLfFpvHjqPPz/paZ+vlI893vhnyMXAXGAC+BEQABZhpPZ94q74gv5LPaxnVSYhRyWU4GFAuFUQ1IujL/uYl2w9H10w+mSwYSZPpucIylyst6dVCMZNVIqqoJhRicQdzPEbL6xAXxYbrTnn+zmumH3ZvOnwOOBIgA/WpFueNmWRBk5JSSlFJ+nFi8TiWaZLMZRFiUcYjT2p5TtGme/Hmdvgj0JcATS3yhJYTa6loUlQVhYwio/gJZPm/B+mWTjSVYGR54FhSZWQ1qnvDEx2PdgTIpKospbR4MpXQIkZaZdpQ2dwcktZk8C3uDRyqzTKlGQOtZAjTlYJ2sqguAboILFVO83qtoVeaxalI1JW5fSNgbT1J3igSi8tc/22bv3e7zOYVDE0RIkHAyLTdn+4PfhFjGS7UznCxljO0YacgOPuLDA4KmL0hu+YGbjAmFy2w4ypcXfuL/njEwmxGSBEI32/s/S5mm1yOKSycLV7RZOuU0P9nwK93bhE7LbDw3nHU5QwP9vcxSFIu1Pn5/ojrf9wNswn/yHRoi65NZkF/caqiPta8+u3XYjffo/rmPOUX5ul3IxyNRIJqlm1vSOC4nC030MtN79Nrt3+4t7P3nQDMAc8+/tLy+6Vzc43a6mLU7NuCeegLthni+eAEAk4ghkM3CK07W64xDtu3vvjsA+CGBHTzK/VO9ukT64Gu8+dab8oJJMXzIpLrCBHbAdMOA9OyPM+yx7YVf7DR765TLnfY2uo+NFADiqISq8ayekPSc00hm6v7ano68CE47O943f2NsNdrB4NeG8fpALvAUHhEpvjkZECd+BGf2GoDI2AMmJNuA/6/zbtG/3JswZgAAAAASUVORK5CYII="
    };
});

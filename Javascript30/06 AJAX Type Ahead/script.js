window.addEventListener("load", handleSite);

function handleSite() {
    const searchBar = document.querySelector(".search-bar");
    const aheadList = document.querySelector(".ahead-list");
    searchBar.addEventListener("input", function(event) {
        const searchedString = event.target.value; 
        if ( searchedString.length > 2 ) {
            const link = "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
            const xhr = new XMLHttpRequest()
            xhr.open("GET", link);
            xhr.send();
            xhr.addEventListener("load", function() {
                const citiesArr = JSON.parse(this.responseText);
                aheadList.innerHTML = makeAheadStr(citiesArr);
            });
        } else {
            aheadList.innerHTML = '';
        }
    });

    function findMatches(pattern, cities) {
        return cities.filter(function (city) {
            const [cityName, stateName] = [city.city.toLowerCase(), city.state.toLowerCase()];
            pattern = pattern.toLowerCase();
            return cityName.includes(pattern) || stateName.includes(pattern);
        })
    }
    function makeAheadStr(citiesArr) {
        const searchBar = document.querySelector(".search-bar");

        const foundCities = findMatches(searchBar.value, citiesArr);
        let returnHTML = "";
        const regEx = new RegExp(searchBar.value, "gi");
        foundCities.forEach(element => {
            let cityHlEl = element.city.match(regEx);
            cityHlEl = cityHlEl ? cityHlEl[0]: ""; 
            let stateHlEl = element.state.match(regEx);
            stateHlEl = stateHlEl ? stateHlEl[0]: ""; 
            const cityName = element.city.replace(regEx, `<span class="hl">${cityHlEl}</span>`);
            const stateName = element.state.replace(regEx, `<span class="hl">${stateHlEl}</span>`);
            const population = element.population;
            returnHTML +=  `<li class="ahead-el">
                                <p class="full-name">
                                    <span class="city-name">${cityName}</span><span class="state-name">${stateName}</span>
                                </p>
                                <p class="city-population">
                                    pop: ${population}
                                </p>
                            </li>`
        }); 
        return returnHTML;
        
    }

}

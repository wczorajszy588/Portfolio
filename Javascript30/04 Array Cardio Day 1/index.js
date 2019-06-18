    // Get your shorts on - this is an array workout!
    // ## Array Cardio Day 1
    // Some data we can work with
    const inventors = [
      { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 }, //76
      { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 }, //84
      { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 }, //78
      { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 }, //67
      { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 }, //59
      { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 }, //70
      { first: 'Max', last: 'Planck', year: 1858, passed: 1947 }, //89
      { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 }, //81
      { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 }, //37
      { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 }, //50
      { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 }, //90
      { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 } //80
    ];
    const people = ['Beck, Glenn', 'Becker, Carl', 'Beckett, Samuel', 'Beddoes, Mick', 'Beecher, Henry', 'Beethoven, Ludwig', 'Begin, Menachem', 'Belloc, Hilaire', 'Bellow, Saul', 'Benchley, Robert', 'Benenson, Peter', 'Ben-Gurion, David', 'Benjamin, Walter', 'Benn, Tony', 'Bennington, Chester', 'Benson, Leana', 'Bent, Silas', 'Bentsen, Lloyd', 'Berger, Ric', 'Bergman, Ingmar', 'Berio, Luciano', 'Berle, Milton', 'Berlin, Irving', 'Berne, Eric', 'Bernhard, Sandra', 'Berra, Yogi', 'Berry, Halle', 'Berry, Wendell', 'Bethea, Erin', 'Bevan, Aneurin', 'Bevel, Ken', 'Biden, Joseph', 'Bierce, Ambrose', 'Biko, Steve', 'Billings, Josh', 'Biondo, Frank', 'Birrell, Augustine', 'Black, Elk', 'Blair, Robert', 'Blair, Tony', 'Blake, William'];
    
    // Array.prototype.filter()
    // 1. Filter the list of inventors for those who were born in the 1500's
    const in1500Born = inventors.filter(isBornIn1500);
    
    function isBornIn1500(person) {
        return ( person.year >= 1500 && person.year < 1600 );
    }
    console.log("Inventors born in 1500's\n", in1500Born);

    // Array.prototype.map()
    // 2. Give us an array of the inventors' first and last names
    const inventorsFullName = inventors.map(getFullName);
    
    function getFullName(person) {
        return person.first + " " + person.last;
    }
    console.log("All inventors full name\n", inventorsFullName);

    // Array.prototype.sort()
    // 3. Sort the inventors by birthdate, oldest to youngest
    const inventorsByAge = inventors.sort(sortByBirthdate).slice();
    
    function sortByBirthdate(curr,next) {
        return (function IIFE(curr) {
            return curr.year - next.year;
        })(curr);
    }
    console.log("Inventors sorted by birthdate\n", inventorsByAge);

    // Array.prototype.reduce()
    
    // 4. How many years did all the inventors live?
    const sumLifespan = inventors.reduce(addLifeSpan, 0);
    
    function addLifeSpan(sum, curr) {
        return (function IIFE( sum ) {
            return sum + curr.passed - curr.year;
        })(sum);
    }
    console.log(`All inventors lived  ${sumLifespan} in total`);
    
    // 5. Sort the inventors by years lived
    const inventorsByLifespan = inventors.sort(sortByLifespan).slice();

    function sortByLifespan(curr, next) {
        return (function IIFE( curr ) {
            return ( curr.passed - curr.year ) - ( next.passed - next.year );
        })(curr);
 
    }
    console.log("Inventors sorted from shorest living to longest\n",inventorsByLifespan);

    // 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name
    // https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris
    /*const elementsList = Array.from(document.querySelectorAll(".mw-category li"));
    const boulevards = elementsList
            .map((boulevard)=> {
                return boulevard.textContent;
            })
            .filter((boulevard) => {
                if (boulevard.match(/de/g)) {
                    return true;
                }
            })
    */
    
    // 7. sort Exercise
    // Sort the people alphabetically by first name
    const sortedByLastName = people.sort(sortByLastName);
    
    function sortByLastName(curr, next) {
        curr = getLastName(curr);
        next = getLastName(next);
        return (function IIFE(curr) {
            if (curr < next) 
            return -1;
            if (curr > next)
            return 1
            if (curr == next)
            return 0;
        })(curr);

        function getLastName(fullName) {
            return fullName.split(", ")[1];
        }
    }
    console.log("People sorted by first name\n", sortedByLastName);

    // 8. Reduce Exercise
    // Sum up the instances of each of these
    const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck' ];
    const transport = data.reduce( 
                            sumTypes, 
                            {
                                car: 0,
                                van: 0,
                                truck: 0,
                                bike: 0,
                                walk: 0
                            });
    
    function  sumTypes(objectWithTypes, curr) {
        return (function IIFE(objectWithTypes) {
            objectWithTypes[curr]++;
            return objectWithTypes;
        })(objectWithTypes);
    }
    console.log("Number of transport posibilities\n", transport);
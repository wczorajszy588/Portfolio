window.addEventListener("load", handleSite);

function handleSite() {
    var imgs = document.querySelectorAll(".img");
    var checkPosition = bridle();

    document.addEventListener("scroll", function(e) {
        imgs.forEach(checkPosition);
    } );

    function bridle() {
        //function should run 4 times, and after that must pass 50 milisec to again run 4 times;
        var noOfTimes = imgs.length;
        var count = 1;
        return function checkPosition( img ) {
            if ( count <= noOfTimes ) {
                console.log("run");
                count++;
                setTimeout(()=> {count = 1}, 50);
                var halfOfImage = img.offsetTop + img.height / 2;
                var windowTop = window.scrollY;
                var windowBottom = window.scrollY + window.innerHeight;

                if ( windowBottom > halfOfImage && windowTop < halfOfImage ) {
                    img.classList.add("run");
                }
                else {
                    img.classList.remove("run");
                }
            }
        };
    }
}
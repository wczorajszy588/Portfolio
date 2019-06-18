window.addEventListener("load", handleSite);

function handleSite() {
    var imgs = document.querySelectorAll(".img");
    var checkPosition = bridle();

    document.addEventListener("scroll", function(e) {
        imgs.forEach(checkPosition);
    } );

    function bridle() {
        var noOfTimes = imgs.length;
        var count = 1;
        return function checkPosition( img ) {
            //if statement block should run X times (once for each img element), and after that must pass at least 50 milisec to again run X times;
            if ( count <= noOfTimes ) {
                count++; //count number if block executions
                setTimeout(()=> {count = 1}, 50);
                var halfOfImagePositionY = img.offsetTop + img.height / 2;
                var windowTop = window.scrollY;
                var windowBottom = window.scrollY + window.innerHeight;

                if ( windowBottom > halfOfImagePositionY && windowTop < halfOfImagePositionY ) {
                    img.classList.add("run");
                }
                else {
                    img.classList.remove("run");
                }
            }
        };
    }
}

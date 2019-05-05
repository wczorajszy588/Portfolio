window.addEventListener("load", animation);

function animation() {

    const sunCanvas = document.getElementById('sunCanvas');
    sunCanvas.width = 760;
    sunCanvas.height = 760;
    const ctx = sunCanvas.getContext('2d');
    //gerenalTimeRatio secDuration in milisec: 1000 = real time;
    const generalTimeRatio = { secDuration: 1, speedUp: 200 };
    const time = { period: 0, second: 0, minute: 0, hour: 0, day: 0 };
    setInterval( ()=> {
      humanMinute(time, generalTimeRatio.speedUp);
    }, generalTimeRatio.secDuration);
    setInterval(drawScene, 30);
    
    function drawScene() {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, sunCanvas.width, sunCanvas.height);
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText(('0' + time.hour).slice(-2) + ":" + ('0' + time.minute).slice(-2) + ":" + ('0' + time.second).slice(-2) + ' Dzień ' + time.day, 20, 20);
        ctx.stroke();
        ctx.strokeStyle = 'green';
        ctx.beginPath();
        const earth = { radius: 20, angularVelocity: 0.00007292115011111, distanceFromSun: 310, orbitAngularVelocity: 0.000000196462726632 };
        const sun = { radius: 30 };
        earth.x = 0 + earth.distanceFromSun * Math.sin(time.period * earth.orbitAngularVelocity);
        earth.y = 0 + earth.distanceFromSun * Math.cos(time.period * earth.orbitAngularVelocity);
        const moon = { radius: earth.radius * 0.2727, angularVelocity: 0.0000026603631310949, distanceFromEarth: 60/*earth.radius * 30.16818395856224*/, orbitAngularVelocity: 0.0000026603631310949 };
        moon.x = 0 + moon.distanceFromEarth * Math.sin(time.period * moon.orbitAngularVelocity);
        moon.y = 0 + moon.distanceFromEarth * Math.cos(time.period * moon.orbitAngularVelocity);

        ctx.translate(sunCanvas.width / 2, sunCanvas.height / 2);
        ctx.strokeStyle = 'green';
        ctx.arc(earth.x, earth.y, earth.radius, -time.period * earth.angularVelocity, -time.period * earth.angularVelocity + 360); //Earth
        ctx.lineTo(earth.x, earth.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = '#1c1c1c';
        ctx.arc(0, 0, earth.distanceFromSun, 0, 360); // Earth orbit;
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = '#1c1c1c';
        ctx.arc(earth.x, earth.y, moon.distanceFromEarth, 0, 360); // Moon orbit;
        ctx.stroke();

        ctx.beginPath();
        ctx.translate(earth.x, earth.y);
        ctx.strokeStyle = 'silver';
        ctx.arc(moon.x, moon.y, moon.radius, -time.period * moon.angularVelocity, -time.period * moon.angularVelocity + 360); //Moon
        ctx.lineTo(moon.x, moon.y);
        ctx.stroke();
        ctx.translate(-earth.x, -earth.y);

        ctx.beginPath();
        ctx.strokeStyle = 'yellow';
        ctx.fillStyle = 'yellow';
        ctx.arc(0, 0, sun.radius, 0, 360); //Sun
        ctx.fill();
        ctx.translate(-sunCanvas.width / 2, -sunCanvas.height / 2);
    }
  
  function humanMinute(time, speedUp) {
    for ( let i = 0; i < speedUp; i++ ) {
        time.period++;
        time.second++;
        if ( time.second > 59 ) {
            time.second = 0;
            time.minute++;
            if ( time.minute > 59 ) {
                time.hour++;
                time.minute = 0;
                if ( time.hour > 23 ) {
                    time.hour = 0;
                    time.day++;
                }
            }
        }
    }
  }
}
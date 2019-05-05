window.onload = function() {
    const container = document.querySelector('.container');
    const calculator = {
        memoryForValue: 0,
        memoryForCalculation: ''
    }
    container.addEventListener('click', function(event) {
        clickEventHandler(event, calculator);
    });
}
function add(x, y) {
    return x * 1 + y * 1;
}
function substract(x, y) {
    return x - y;
}
function multiply(x, y) {
    return x * y;
} 
function divide(x, y) {
    return x / y;
}
function calculate(x, y, callback) {
    return callback(x, y);
}
function clickEventHandler(event, calcObj) {
    console.log(calcObj);
    const display = document.querySelector('.display');
    const eventClasses = event.target.classList;
    if (eventClasses.contains('digitBtn')) {

        if (display.textContent === '0') {
            display.textContent = event.target.textContent;
        }
        else {
            display.textContent += event.target.textContent;
        }
    }
    if (eventClasses.contains('cancelBtn')) {
        display.textContent = 0;
        display.setAttribute('memory', display.textContent);
    }
    if (eventClasses.contains('backBtn')) {
        if ( display.textContent !== '0' ) {
            if (display.textContent.length > 1) {
                display.textContent = display.textContent.substr(0, display.textContent.length -1);
            }
        }
    }
    if (eventClasses.contains('calcBtn')) {
        if (!eventClasses.contains('resultBtn')) {
            display.setAttribute('memory', display.textContent);
            if (document.querySelector('.active') !== null) {
                document.querySelector('.active').classList.remove('active');
            }
            event.target.classList.add('active');
            display.textContent = 0;
        }
        else {
            if (document.querySelector('.active') !== null) {
                let calcType;
                const active = document.querySelector('.active');
                if (active.classList.contains('addBtn')) {
                    calcType = add;
                }
                else if (active.classList.contains('substrBtn')) {
                    calcType = substract;
                }
                else if (active.classList.contains('multiplyBtn')) {
                    calcType = multiply;
                }
                else if (active.classList.contains('divideBtn')) {
                    calcType = divide;
                }
                display.textContent = calculate(display.getAttribute('memory'), display.textContent, calcType);
                display.setAttribute('memory', display.textContent);
                document.querySelector('.active').classList.remove('active');
            }
        }
    }
}
window.addEventListener("load", siteHandler);

function siteHandler() {
    const form = document.querySelector(".form");
    upgradeFormWithShift(form);
}

function upgradeFormWithShift(form) {
    let prevClicked = 0;
    form.addEventListener("click", selectMultipleCheckboxes);
    function selectMultipleCheckboxes(event) {
        if (event.target.dataset.no) { //if clicked element is an input

            if (event.shiftKey) { //if shift was pressed
                let nowClicked = event.target;
                nowClicked.checked = !nowClicked.checked;

                if (!prevClicked) {
                   nowClicked.checked = true;
                }
                else {
                    let allInputs = Array.from(form.querySelectorAll("input[type=checkbox]"));
                    const selectedInputs = gatherInputsToShift(allInputs, nowClicked, prevClicked);

                    const isSomeUnchecked = selectedInputs.some(function(input) {
                        return !input.checked;
                    })
                    if ( isSomeUnchecked ) {
                        selectedInputs.forEach( function(input) {
                            input.checked = true;
                        } )
                    } 
                    else {
                        selectedInputs.forEach( function(input) {
                            input.checked = false;
                        } )
                    }
                }
            }
            
            const classToRemove = form.querySelector(".last-clicked");
            if (classToRemove) { 
                classToRemove.classList.remove("last-clicked");
            }

            prevClicked = event.target;
            prevClicked.parentNode.classList.add("last-clicked");
        }
    }
}
//function takes all inputs and return only those that should be shifted
function gatherInputsToShift(all, curr, prev) {
    const firstToShift = curr.dataset.no * 1 < prev.dataset.no * 1 ? curr : prev; 
    const lastToShift = curr.dataset.no * 1 < prev.dataset.no * 1 ? prev : curr;
    const firstIndex = all.findIndex( function (input) {
        return input == firstToShift;
    });
    const lastIndex = all.findIndex( function (input) {
        return input == lastToShift;
    });
    const selectedInputs = all.slice(firstIndex, lastIndex + 1);
    return selectedInputs;
}
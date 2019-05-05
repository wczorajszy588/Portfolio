window.onload = function() {
    const labels = document.querySelectorAll("input");
    console.log(labels);
    labels.forEach(function(label) {
        label.addEventListener("mousemove", updateElement);
        label.addEventListener("change", updateElement);
        
    })
    function updateElement() {
        const dataUnit = this.dataset.unit || ""; 
        document.getElementsByTagName("html")[0].style.setProperty(`--${this.id}`, `${this.value}` + dataUnit);
    }
}
window.addEventListener("load", function () {
    const listOfBreed = fetch('https://dog.ceo/api/breeds/list/all');
    listOfBreed.then( function(response) {
        return response.json();
    }).then( function(value) {
        const addDogBtn = document.querySelector('.addDogBtn');
        const form = document.querySelector('.addDogForm');
        const select = document.createElement('select');
        form.appendChild(select);
        form.insertBefore(select, addDogBtn);
        for (let breed in value.message) {
            const option = document.createElement('option');
            option.innerText = breed;
            select.appendChild(option);
        }
        addDogBtn.addEventListener('click', () => {
            showDog(select.value);
        });
    } );

});

function showDog(breed) {
    const url = `https://dog.ceo/api/breed/${breed}/images`;
    const breedImage = fetch(url)
    .then( function(response) {
        const result = response.json();
        return result;
    })
    .then( function(image) {
        const imgNumber = Math.floor(Math.random(image.message.length) * image.message.length);
        const img = document.createElement('img');
        img.src = image.message[imgNumber];
        img.alt = 'Some dog image';
        img.className = 'dogImage';
        document.querySelector('.imageContainer').appendChild(img);
    })
}
console.log("hola")

let lastSearch = '';

const init = async(page) => {

    try 
    {
        // Iteramos
        const charContainer = document.getElementById("char-container")

        charContainer.innerHTML = ''
        

        //llamar a la api
        const response = await fetch("https://rickandmortyapi.com/api/character/?page=" + page)

        //transformar la info a json
        const data = await response.json()

        data.results.forEach( (element) => {
            charContainer.innerHTML += `<div class="char-card">
            <img class="char-img" src="${element.image}" alt="char-image">
            <div class="char-info-container">
                <div class="char-info">
                    <p class="text-white">${element.name}</p>
                    <p class="text-white">${element.status} - ${element.species}</p>
                </div>
                <div class="char-info">
                    <p class="text-white">Last Known Location:</p>
                    <p class="text-grey">${element.location.name}</p>
                </div>
                <div class="char-info">
                    <p class="text-white">First Seen In:</p>
                    <p class="text-grey">${element.origin.name}</p>
                </div>
            </div>
        </div>`
        });
            

        const prevButton = document.getElementById("prev-button")

        const nextButton = document.getElementById("next-button")

        const currPageText = document.getElementById("curr-page-text")


        if (data.info.next == null)
        {
            nextButton.style.visibility = "hidden";
        }
        else
        {
            nextButton.style.visibility = "visible";
        }

        if (data.info.prev == null)
        {
            prevButton.style.visibility = "hidden";
            currPageText.innerHTML = '1'
        }
        else
        {
            prevButton.style.visibility = "visible";
            const replaced = data.info.prev.replace('https://rickandmortyapi.com/api/character/?page=', '');
            currPageText.innerHTML = parseFloat(replaced) + 1
        }

        // Mostramos Dinamicamente
        console.log("init")

    } 
    catch (error) 
    {
        console.error(error)
    }
}



const searchCharacter = async(character) => {

    try 
    {

        //llamar a la api
        const response = await fetch("https://rickandmortyapi.com/api/character/?name=" + character)

        //transformar la info a json
        const data = await response.json()

        // Iteramos
        const charContainer = document.getElementById("char-container")

        charContainer.innerHTML = ''


        if (data.error)
        {

            alert("No Se Encontró Ningún Resultado")
            charContainer.innerHTML = ''

        }
        else
        {

            data.results.forEach( (element) => {
                charContainer.innerHTML += `<div class="char-card">
                <img class="char-img" src="${element.image}" alt="char-image">
                <div class="char-info-container">
                    <div class="char-info">
                        <p class="text-white">${element.name}</p>
                        <p class="text-white">${element.status} - ${element.species}</p>
                    </div>
                    <div class="char-info">
                        <p class="text-white">Last Known Location:</p>
                        <p class="text-grey">${element.location.name}</p>
                    </div>
                    <div class="char-info">
                        <p class="text-white">First Seen In:</p>
                        <p class="text-grey">${element.origin.name}</p>
                    </div>
                </div>
            </div>`
            });


            const prevButton = document.getElementById("prev-button")

            const nextButton = document.getElementById("next-button")

            const currPageText = document.getElementById("curr-page-text")


            if (data.info.next == null)
            {
                nextButton.style.visibility = "hidden";
            }
            else
            {
                nextButton.style.visibility = "visible";
            }

            if (data.info.prev == null)
            {
                prevButton.style.visibility = "hidden";
                currPageText.innerHTML = '1'
            }
            else
            {
                prevButton.style.visibility = "visible";
                const test = data.info.prev.replace('https://rickandmortyapi.com/api/character/?page=', '');
                const replaced = test.slice(0, test.indexOf('&'));
                currPageText.innerHTML = parseFloat(replaced) + 1
            }

            

            // Mostramos Dinamicamente
            console.log("init")

        }

    } 
    catch (error) 
    {
        console.error(error)
    }
}




const btnSearch = document.getElementById("search-btn")

if (btnSearch) {
    btnSearch.addEventListener("click", function() {

        const inputSearch = document.getElementById("search-input")

        if(inputSearch.value.length == 0)
        {
            init()
            lastSearch = inputSearch.value
        }
        else
        {
            searchCharacter(inputSearch.value)
            lastSearch = inputSearch.value
        }

    })
}




const prevButton = document.getElementById("prev-button")

if (prevButton) {
    prevButton.addEventListener("click", function() {

        if(lastSearch == '')
        {

            const currPageText = document.getElementById("curr-page-text")

            init(parseFloat(currPageText.innerHTML) - 1)

        }
        else
        {

            const currPageText = document.getElementById("curr-page-text")

            searchCharacter(lastSearch + '&page=' + (parseFloat(currPageText.innerHTML) - 1))

        }

    })
}




const nextButton = document.getElementById("next-button")

if (nextButton) {
    nextButton.addEventListener("click", function() {

        if(lastSearch == '')
        {

            const currPageText = document.getElementById("curr-page-text")

            init(parseFloat(currPageText.innerHTML) + 1)

        }
        else
        {

            const currPageText = document.getElementById("curr-page-text")

            searchCharacter(lastSearch + '&page=' + (parseFloat(currPageText.innerHTML) + 1))
            
        }

    })
}




init(1)
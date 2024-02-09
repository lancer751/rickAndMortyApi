const dropdowns = document.querySelectorAll('.dropdown');
const drops= document.querySelectorAll('#drop');
const sectionCard = document.querySelector('#sectionCard');
const searchBar = document.querySelector('#searchBar');
let apiUrl = 'https://rickandmortyapi.com/api/character/?';
let currentPage = 1;
let totalPages;
let contPages = 0;

const filterToSelect = {
    page: '',
    name : '',
    gender : '',
    species : '',
    status : '',
}


// mostrando los datos cuando cargue el contenido
document.addEventListener('DOMContentLoaded', ()=>{
    requestData();
})

// Abrir y cerrar dropdowns
dropdowns.forEach((dropdown, dropdownIndex) => {
    dropdown.addEventListener('click', e=>{
        document.querySelectorAll('#drop').forEach((drop, dropIndex) => {
            dropIndex !== dropdownIndex? drop.classList.add('hidden') : true;
        })
        dropdown.parentElement.querySelector('#drop').classList.toggle('hidden');
    });
});

// mostrar y esconder drops
// select filter
drops.forEach(dropItem => {
    dropItem.addEventListener('click', e=>{

        const textValue = e.target.textContent;
        dropItem.offsetParent.querySelector('p').textContent = textValue;
        dropItem.offsetParent.querySelector('#drop').classList.add('hidden');
        currentPage = 1;
        generateURLSelect(textValue.trim().toLowerCase(), dropItem);  
        filtrarBusqueda(filterToSelect);
        console.log(filterToSelect)
        // requestData(apiUrl+generateURLSelect(textValue.trim().toLowerCase(), dropItem));
    })
})

// searchbar filtrado

searchBar.addEventListener('keyup', e=>{
    e.preventDefault();

    const inputContent = e.target.value.trim().toLowerCase();
    
    // requestData(apiUrl+generateURLName(inputContent));
    currentPage = 1;
    generateURLName(inputContent);
    filtrarBusqueda(filterToSelect);
})


// generando url de busqueda en el searchBar
function generateURLName(inputText){
    let wordsName = inputText.split(' ');
    const nameURL = `name=${wordsName.join('%20')}`;
    filterToSelect.name = nameURL;
}

// generando string de busqueda para los selects
function generateURLSelect(selectText, dropItem){
    const nameGetted = dropItem.previousElementSibling.getAttribute('name');
    
    dropdowns.forEach(dropdown => {
        const selectName = dropdown.getAttribute('name');

        if(selectName === nameGetted && selectText !== 'ninguno'){
            const strFilter = `${nameGetted}=${selectText}`; 
            
            selectName === 'gender' ? filterToSelect.gender = strFilter : true;
            selectName === 'species' ? filterToSelect.species = strFilter : true;
            selectName === 'status' ? filterToSelect.status = strFilter : true;
            
            return;
        }
        if(selectText === 'ninguno'){
            filterToSelect[nameGetted] = '';
            return;
        }
    })
}

function generatePage(pageToGo){
    filterToSelect.page = `page=${pageToGo}`;

    console.log(filterToSelect)
}

function filtrarBusqueda(filterToSelect){
    let urlRequest = Object.values(filterToSelect).filter(filterValue => filterValue !== '').join('&');
    console.log(urlRequest)

    requestData(apiUrl.concat(urlRequest));
}

// realizar el request
async function requestData(apiURLRequest = 'https://rickandmortyapi.com/api/character/?'){
    console.log(apiURLRequest);

    try{
        const response = await fetch(apiURLRequest);
        const dataContent = await response.json();
        console.log(dataContent);
        showData(dataContent);
    }catch{
        console.error();
    }
}

function showData(data){
    filterToSelect.page = '';
    data.error ? showNoResults(data.error): true;
    totalPages = !data.info.pages ? 0 : data.info.pages;
    console.log(totalPages)
    console.log(currentPage)
    let cardContent = '';

    data.results.forEach(characterData => {
        const {id, image, created, gender, name, location, species, status} = characterData;
        let statusColor = '';

        switch(status.toLowerCase()){
            case "alive":
                statusColor = 'bg-green-400';
                break;
            case "unknown":
                statusColor = 'bg-gray-400';
                break;
            case "dead":
                statusColor = 'bg-red-400';
                break;
            default:
                console.log("No reconozco esta fruta.");
        }

        cardContent += `
        <article class="card-description" data-id="${id}">
                <div class="relative">
                    <img src="${image}" class="w-full h-full object-cover object-center">
                    <p class="absolute text-white text-lg top-0 right-0 m-2 ${statusColor} py-2 px-4 font-semibold rounded-2xl sm:text-sm sm:px-6 sm:py-1">${status}</p>
                </div>
                <div class="p-5 md:p-3 pb-7">
                    <p class="text-sm text-gray-400">Created: <span>${created}</span>
                    </p>

                    <div class="space-y-4 mt-3">
                        <h3 class="text-lg font-bold text-blue-800">${name}</h3>
                        <p class="font-semibold">Last Known Location: <span class="text-slate-400 font-light">${location.name}</span></p>
                        <p class="font-semibold">Specie: <span class="text-slate-400 font-light">${species}</span></p>
                        <p class="font-semibold">Gender: <span class="text-slate-400 font-light">${gender}</span></p>
                    </div>
                </div>
            </article>
        `;
    });

    sectionCard.innerHTML = cardContent;
    document.querySelector('#numberResults').textContent = `${data.info.count} results`;
    document.querySelector('#numberPages').textContent = `${data.info.pages} pages`;
    console.log(currentPage)
    showPagination(totalPages, currentPage);
}


function showNoResults(message){
    const textNoResults = document.createElement('P');
    textNoResults.textContent = message;
    textNoResults.classList.add('text-center', 'col-span-full')
    sectionCard.innerHTML = '';
    sectionCard.appendChild(textNoResults)
    document.querySelector('#numberResults').textContent = `0 results`;
    document.querySelector('#numberPages').textContent = `0 pages`;

    filterToSelect.page = '';
    showPagination(0, 0);
    return;
}
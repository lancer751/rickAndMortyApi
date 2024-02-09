const pgtnElement = document.querySelector('#paginator');
const startBtn = document.querySelector('#startBtn');
const endBtn = document.querySelector('#endBtn');
const prevNext = document.querySelectorAll('.prevNext');
const numbersPage = document.querySelectorAll('.link-page');


function showPagination(totalPages, pageActual){
    pgtnElement.innerHTML = '';
    let beforePages = pageActual-1;
    let afterPages = pageActual+1;
    
    const isStart = pageActual <= 1;  
    const isEnd = pageActual >= totalPages;

    startBtn.classList.toggle('btn-disabled', isStart);
    endBtn.classList.toggle('btn-disabled', isEnd);
    prevNext[0].classList.toggle('btn-disabled', isStart);

    prevNext[1].classList.toggle('btn-disabled', isEnd);

    for(let pageLengt = beforePages; pageLengt <= afterPages; pageLengt++){
        if(pageLengt > totalPages || pageLengt <= 0){
            continue;
        }

        const isActive = pageLengt === pageActual;
        const numLink = document.createElement('a');
        numLink.classList.add('link-page');
        numLink.classList.toggle('active-page', isActive);
        numLink.textContent = pageLengt;

        pgtnElement.appendChild(numLink);
    }
}


prevNext[0].addEventListener('click', () => {
    let prevPage = currentPage-=1;
    generatePage(prevPage);
    filtrarBusqueda(filterToSelect);
    showPagination(totalPages, prevPage);
});

prevNext[1].addEventListener('click', () => {
    let nextPage = currentPage+=1;
    generatePage(nextPage);
    filtrarBusqueda(filterToSelect);
    showPagination(totalPages, nextPage);
});

startBtn.addEventListener('click', ()=>{
    currentPage = 1;
    generatePage(currentPage);
    filtrarBusqueda(filterToSelect);
    showPagination(totalPages, currentPage);
})

endBtn.addEventListener('click', ()=>{
    currentPage = totalPages;
    generatePage(currentPage);
    filtrarBusqueda(filterToSelect);
    showPagination(totalPages, currentPage);
})

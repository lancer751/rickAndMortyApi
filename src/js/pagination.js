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


// const startBtn = document.querySelector('#startBtn');
// const endBtn = document.querySelector('#endBtn');
// const prevNext = document.querySelectorAll('.prevNext');
// const boxPages = document.querySelector('#paginator');
// let pageDisposes;
// let pagCurr = 1;
// const countExample = {
//     "count" : 48,
// }
// let currentPage = 0;

// showNumbersPagination(20, 1);

// function showNumbersPagination(totalPages, pageActual){
    
//     let contPages;
//     pagCurr = pageActual;
//     pageDisposes = totalPages;

//     for (let i = pageActual; i <= totalPages; i++) {
//         const numberPage = document.createElement('A');
//         numberPage.classList.add('link-page');
//         numberPage.textContent = `${i}`
//         boxPages.appendChild(numberPage);

//         // Actualiza la selección de .link-page después de agregar un nuevo elemento
//         contPages = document.querySelectorAll('.link-page');
//         contPages[0].classList.add('active-page');

//         if (contPages.length >= 3) {
//             break;
//         }
//     }
//     console.log(contPages)
//     selectPage(contPages);
//     moveNextPrevPage(contPages);
//     moveToStartEndPage(contPages);
// }

// const updateStatusBtn = (pageSelected) => {
//     console.log(pageSelected[currentPage])
//     const initPage = parseInt(pageSelected[currentPage].textContent);
//     const endPage = parseInt(pageSelected[pageSelected.length - 1].textContent);
//     const isStart = initPage === 1;
//     const isEnd = endPage === pageDisposes;

//     startBtn.disabled = isStart;
//     endBtn.disabled = isEnd;
//     startBtn.classList.toggle('btn-disabled', isStart);
//     endBtn.classList.toggle('btn-disabled', isEnd);
//     prevNext[0].classList.toggle('btn-disabled', isStart);
//     prevNext[1].classList.toggle('btn-disabled', isEnd);
// };

// const setActivePage = (index, numbersPage) => {
//     if(numbersPage[index] === undefined){
//         while(numbersPage.firstChild){
//             numbersPage.removeChild(numbersPage.firstChild);
//         }

//         numbersPage[index]?? showNumbersPagination(pageDisposes, pagCurr);
//         currentPage = 0;
//         console.log(numbersPage)
//         return numbersPage;
//     }
//     document.querySelector('.active-page').classList.remove('active-page');
//     numbersPage[index].classList.add('active-page');

//     return numbersPage;
// };

// const handlePageClick = (numIndex, numbersPage) => {
//     currentPage = numIndex;
//     setActivePage(currentPage, numbersPage);
//     updateStatusBtn(numbersPage);
// };

// function selectPage(numbersPage){
//     numbersPage.forEach((numPage, numIndex) => {
//         numPage.addEventListener('click', (e) => {
//             console.log(numPage);

//             e.preventDefault();
//             handlePageClick(numIndex, numbersPage);
//         });
//     });
// }

// function moveNextPrevPage(numbersPage){
//     prevNext.forEach((btnPage, index) => {
//         btnPage.addEventListener('click', () => {
//             currentPage += index === 1 ? 1 : -1;
//             pagCurr += index === 1 ? 1 : -1;
//             console.log(pagCurr)
//             console.log('pase por aqui')
//             updateStatusBtn(setActivePage(currentPage, numbersPage));
//         });
//     });
// }

// function moveToStartEndPage(numbersPage){
//     startBtn.addEventListener('click', () => {
//         handlePageClick(0, numbersPage);
//     });
    
//     endBtn.addEventListener('click', () => {
//         handlePageClick(numbersPage.length - 1, numbersPage);
//     });
// }



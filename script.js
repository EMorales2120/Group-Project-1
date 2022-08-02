
const allTabsBody = document.querySelectorAll('.tab-body-single');
const alltabsHead = document.querySelectorAll('.tab-head-single');
const searchForm = document.querySelector('.app-header-search');
let searchList = document.getElementById('search-list');

let activeTab = 1, allData;

const init = () => { 
    showActiveTabBody();
    showActiveTabHead();
} 

const showActiveTabHead = () => alltabsHead[activeTab - 1].classList.add('active-tab'); 
  
const showActiveTabBody = () => {
    hideAllTabBody()
        allTabsBody[activeTab - 1].classList.add('show-tab');
    
}

const hideAllTabBody = () => allTabsBody.forEach(singleTabBody => singleTabBody.classList.remove('show-tab'))
const hideAllTabHead = () => alltabsHead.forEach(singleTabHead => singleTabHead.classList.remove('active-tab'))

// event listenor

window.addEventListener('DOMContentLoaded', () => init()); 
// button event listeners
alltabsHead.forEach(singleTabHead => {
    singleTabHead.addEventListener('click', () => {
        hideAllTabBody(); 
        activeTab = singleTabHead.dadaset.id;
        showActiveTabHead();

    })
})

const getInputValue = (event) => {
    event.preventDefault();
    let searchText = searchForm.search.value;
    fetchAllSuperHero(searchText);
}

// search for submissiom
searchForm.addEventListener('submit', getInputValue); 

//api key: 5561133997271918

const fetchAllSuperHero = async(searchText) => {
    let url = `https://www.superheroapi.com/api.php/5561133997271918/search/${searchText}`;
    try{
        const respone = await fetch(url);
        allData = await respone.json();
        if(allData.respone === 'success'){
            showSearchList(allData.results);
        }
    } catch(error){
        console.log(error);
    }
}

const showSearchList = (data) => {
    searchList.innerHTML = "";
    data.forEach(dataItem => {
        const divElem = document.createElement('div');
        divElem.classList.add('search-list-item');
        divElem.innerHTML = `
        <img src = "${dataItem.image.url ? dataItem.image.url : ""}"
        <p data-id = "${dataItem.id}">${dataItem.name}</p>`;
        searchList.appendChild(divElem);
    });
}

searchForm.search.addEventListener('keyup', () => {
    if(searchForm.search.value.length >1){
        fetchAllSuperHero(searchForm.search.value);
    }else{
        searchList.innerHTML = "";
    }
});
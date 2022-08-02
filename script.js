
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
        showActiveTabBody();

    });
});

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

searchList.addEventListener('click', (event) => {
    let searchId = event.target.dataset.id;
    let singleData = allData.results.filter(singleData => {
        return searchId === singleData.id;
    })
    showSuperheroDetails(singleData);
    searchList.innerHTML = "";
});

const showSuperheroDetails = (data) => {
    console.log(data);
    document.querySelector('.app-body-content-thumbnail').innerHTML = `
    <img src = "${data[0].image.url}">
    `;

    document.querySelector('.name').textContent = data[0].name;
    document.querySelector('.powerstats').innerHTML = `
    <li>
        <div>
            <i class = "fa-solid fa-shield-halves"></i>
            <span>intelligance</span>
        </div>
        <span>${data[0].powerstats.intelligance}</span>
    </li>
    <li>
        <div>
            <i class = "fa-solid fa-shield-halves"></i>
            <span>strength</span>
        </div>
        <span>${data[0].powerstats.strength}</span>
    </li>
    <li>
        <div>
            <i class = "fa-solid fa-shield-halves"></i>
            <span>speed</span>
        </div>
        <span>${data[0].powerstats.speed}</span>
    </li>
    <li>
        <div>
            <i class = "fa-solid fa-shield-halves"></i>
            <span>durability</span>
        </div>
        <span>${data[0].powerstats.durability}</span>
    </li>
    <li>
        <div>
            <i class = "fa-solid fa-shield-halves"></i>
            <span>power</span>
        </div>
        <span>${data[0].powerstats.power}</span>
    </li>
    <li>
        <div>
            <i class = "fa-solid fa-shield-halves"></i>
            <span>combat</span>
        </div>
        <span>${data[0].powerstats.combat}</span>
    </li>
        `;

        document.querySelector('.biography').innerhtml = `
    <li>
        <span>full name</span>
        <span>${data[0].biography['full-name']}</span>
    </li>
    <li>
        <span>alter-egos</span>
        <span>${data[0].biography['alter-ego']}</span>
    </li>
    <li>
        <span>aliases</span>
        <span>${data[0].biography['aliases']}</span>
    </li>
    <li>
        <span>place-of-birth</span>
        <span>${data[0].biography['place-of-birth']}</span>
    </li>
    <li>
        <span>first-appearance</span>
        <span>${data[0].biography['first-appearance']}</span>
    </li>
    <li>
        <span>publisher</span>
        <span>${data[0].biography['publisher']}</span>
    </li>
    `;
}
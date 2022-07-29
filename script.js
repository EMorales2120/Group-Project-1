let activeTab = 1, allData;
const allTabsBody = document.querySelectorAll('.tab-body-single');
const alltabsHead = document.querySelectorAll('.tab-head-single');
const searchForm = document.querySelector('.app-header-search');
let searchList = document.getElementById('search-list');
const init = () => { 
    showActiveTabBody();

}
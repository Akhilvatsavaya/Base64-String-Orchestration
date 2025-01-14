const form = document.getElementById('textFrom');
const mongoButton = document.getElementById('mongoButton');
const mysqlButton = document.getElementById('mysqlButton');
const fetchMongoButton = document.getElementById('fetchMongoButton');
const fetchMySQLButton = document.getElementById('fetchMySQLButton');
const dataList = document.getElementById('dataList');

async function sendDataToServer(apiUrl){
    const text = document.getElementById('text').value;
    // console.log("In JS: ", text);

    try{
        const response = await fetch(apiUrl, {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({text}),
        });

        if(!response.ok){
            throw new Error(`HTTP error! status : ${response.status}`);
        }

        const data = await response.json();
        alert(`Response : ${data.message}`);
    }catch(error){
        console.error('Error : ', error);
        alert(`An Error Occured!! from ${apiUrl}`);
    }

}

async function fetchDataFromServer(apiUrl){
    try{
        const response = await fetch(apiUrl);
        if(!response.ok){
            throw new Error(`HTTP error! status:${response.status}`);
        }
        const data = await response.json();
        displayData(data);
    }catch(error){
        console.error("Error: ", error);
        alert(`An Error has occured while fetch data from ${apiUrl}`);
    }
}

function displayData(data){
    dataList.innerHTML = '';
    data.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = `[${item.db}] Original : ${item.original} Encoded : ${item.encoded}`;
        dataList.appendChild(li);
    });
}



mongoButton.addEventListener('click', () => sendDataToServer('/api/mongo'));
mysqlButton.addEventListener('click', () => sendDataToServer('/api/mysql'));
fetchMongoButton.addEventListener('click', () => fetchDataFromServer('/api/mongo'));
fetchMySQLButton.addEventListener('click', () => fetchDataFromServer('/api/mysql'));
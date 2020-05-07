console.log('Client side script loaded...');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    messageOne.textContent = 'Loading ...';
    messageTwo.textContent = '';
    
    const url = 'http://localhost:3000/weather?address=' + search.value;

    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error;
            }else{
                messageOne.textContent = JSON.stringify(data.geodata);
                messageTwo.textContent = JSON.stringify(data.weather);
            }
        })
    });
    // console.log('Event test' . location)
});
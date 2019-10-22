console.log('Client side javascript file is loaded!')



const searchForm = document.querySelector('form');
const searchInput = document.querySelector('input');

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const searchValue = searchInput.value;
  fetch(`http://localhost:3000/weather?address=${searchValue}`).then((response) => {
    // const responseJson = response.json();
    const responseText = response.text();
    responseText.then((data) => {
        if (data.error) {
            console.log(data.error);
        } else {
            console.log(data);
        }
    })
  })
})
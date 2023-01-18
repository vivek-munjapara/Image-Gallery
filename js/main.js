// let perPage = perPage + 10;
const inputValue = document.getElementById('input');

let perPage = 10;

console.log(perPage);
let myArray = [];

async function getValue(inputValue, perPage) {

    document.getElementById('error').innerHTML = `<h2 class="text-light">Loading...</h2>`


    let url = await fetch(`https://api.pexels.com/v1/search?query=${inputValue}&per_page=${perPage}`,
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                AUthorization: '563492ad6f91700001000001a50248a19756492687753a2523d04a50'
            }
        })
        let urldata = await url.json();
        console.log(urldata);

    if (urldata.status != 400 && urldata.status != 404 && inputValue.lenght != 0) {
        display(urldata);
        document.getElementById('error').innerHTML = ``
    } else {
        document.getElementById("error").innerHTML = `<h2 class="text-light">Opp! input field can't be empty</h2>`;
        document.querySelector("#hello").style.display = "none";

    }
}


document.querySelector("form").addEventListener("submit", (event) => {
    getValue(inputValue.value, perPage);
    event.preventDefault();

})


loadmore = () => {

    perPage += 10;
    // console.log(perPage);
    getValue(inputValue.value, perPage);

}


display = (data) => {

    myArray = data.photos;

    document.getElementById('photo').innerHTML = myArray.map((value) => {
        return `
            <div class="photodiv picmrgn">
                <img src="${value.src.original}" class="img-fluid" alt="...">
            </div>`
    }).join("");
    document.querySelector("#ldmr-btn").style.display = "block";

    console.log(myArray);
}
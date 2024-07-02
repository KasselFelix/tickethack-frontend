document.querySelector("#search-btn")
.addEventListener('click',function (){
    const departure = document.querySelector('#depart').value;
    const arrival = document.querySelector('#arrival').value;
    const date=document.querySelector('#date').value;

	fetch('http://localhost:3000/trips',{
		body: JSON.stringify({ departure:departure,arrival:arrival,date:date.toString() }),
    })
    .then(response => response.json())
    .then(data => {
        for (let trip of data) {
            document.querySelectorAll('.tickets-data').innerHTML+=`
            <div class="travel-data">${trip.departure}>${trip.arrival}</div>
            <div class="travel-time">${trip.Date}</div>
            <div class="travel-price">${trip.price}</div>
            <button class="book-btn"></button>
        `
        }
    })
    callDelete()
})

function callDelete(){
    for (let i = 0; i < document.querySelectorAll('.delete-btn').length; i++) {
        document.querySelectorAll('.delete-btn')[i].addEventListener('click', function () {
            this.parentNode.remove()
        })
    }
}
const data=[
    {
        departure:'paris',
        arrival:'lyon',
        date:'10/06/2024',
        price:10
    },
    {
        departure:'lyon',
        arrival:'paris',
        date:'10/06/2024',
        price:9
    }
]

document.querySelector('#search-btn').addEventListener('click',function (){
    console.log('click')
    const departure = document.querySelector('#depart').value;
    const arrival = document.querySelector('#arrival').value;
    const date=document.querySelector('#date').value;
    console.log(departure);
    console.log(arrival);
    console.log(date)
	// fetch('http://localhost:3000/trips',{
	// 	body: JSON.stringify({ departure:departure,arrival:arrival,date:date.toString() }),
    // })
    // .then(response => response.json())
    // .then(data => {
        for (let trip of data) {
            document.querySelector('#tickets-found').innerHTML+=`
            <div class="travel-data">${trip.departure}>${trip.arrival}</div>
            <div class="travel-time">${trip.date}</div>
            <div class="travel-price">${trip.price}</div>
            <button class="book-btn"></button>
        `
        }
    // })
    //callDelete()
})

function callDelete(){
    for (let i = 0; i < document.querySelectorAll('.delete-btn').length; i++) {
        document.querySelectorAll('.delete-btn')[i].addEventListener('click', function () {
            this.parentNode.remove()
        })
    }
}


document.querySelector('#search-btn').addEventListener('click',function (){
    console.log('click')
    const departure = document.querySelector('#depart').value;
    const arrival = document.querySelector('#arrival').value;
    const date=document.querySelector('#date').value;

    document.querySelector('#result').remove()

    fetch('http://localhost:3000/trips',{
            body: JSON.stringify({ departure:departure,arrival:arrival,date:date.toString() }),
    })
    .then(response => response.json())
    .then(data => {
        if(data.trips){
            document.querySelector("#result-container").innerHTML+=`
                <div id="result" class="#tickets-found"></div>
            `;
            for (let trip of data) {
                document.querySelector('.tickets-found').innerHTML+=`
                <div class="travel-data"><span class="depart">${trip.departure}</span> > <span class="arrival">${trip.arrival}</span></div>
                <div class="travel-time">${trip.date}</div>
                <div class="travel-price">${trip.price}$</div>
                <button class="book-btn"></button>
                `
            }
        }else{
            document.querySelector('#tickets-found').innerHTML+=`
                <div id="result" class:"no-result">
                <img class="fit-picture" src="magnifying-glass-logo" alt="no trip found" /img>
                <p>No trip found.</p>
                </div>
            `
        }
    })
})





for (let i = 0; i < document.querySelectorAll('.book-btn').length; i++) {
        document.querySelectorAll('.book-btn')[i].addEventListener('click', function () {
            const departure=this.departure.querySelector('.departure').textContent;
            const arrival=this.parentNode.querySelector('.arrival').textContent;
            const date=this.parentNode.querySelector('.travel-time').textContent;
            const price=this.parentNode.querySelector('.travel-price').textContent;
            fetch(`http://localhost:3000/cart`,{
                method:'POST',
                headers: { 'Content-Type': 'application/json' },
		        body: JSON.stringify({departure,arrival,date,price}),
            }).then(response => response.json)
            .then(data=>{

            })

        })
}


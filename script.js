document.querySelector('#search-btn').addEventListener('click',function (){
    console.log('click search')
    const departure = document.querySelector('#depart').value;
    const arrival = document.querySelector('#arrival').value;
    const date=document.querySelector('#date').value;
    document.querySelector('#result').remove()

    fetch('http://localhost:3000/trips',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ departure:departure,arrival:arrival,date:new Date(date.toString()) }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('data:',data)
        if(!data.result){
            document.querySelector('#result-container').innerHTML+=`
            <div id="result" class:"no-result">
                <div id="magnifying-glass-logo"></div>
                <p>No trip found.</p>
            </div>
            `
        }else{
                document.querySelector("#result-container").innerHTML+=`
                    <div id="result" ></div>
                `;
                for (let trip of data.trips) {
                    console.log('trip',trip);
                    document.querySelector('#result').innerHTML+=`
                    <div class="tickets-found">
                        <div class="travel-data"><span class="depart">${trip.departure}</span> > <span class="arrival">${trip.arrival}</span></div>
                        <div class="travel-time">${moment(trip.date).format('hh:mm')}</div>
                        <div class="travel-price"><span>${trip.price}</span>$</div>
                        <button type="button" class="book-btn"><a href="cart.html" id="cart-link">Book</a></button>
                    </div>
                    `
                }
        }
        updateBook();
    })
    
})




function updateBook(){
    for (let i = 0; i < document.querySelectorAll('.book-btn').length; i++) {
            document.querySelectorAll('.book-btn')[i].addEventListener('click', function () {
                const departure=this.parentNode.querySelector('.depart').textContent;
                const arrival=this.parentNode.querySelector('.arrival').textContent;
                const date=this.parentNode.querySelector('.travel-time').textContent;
                const price=this.parentNode.querySelector('.travel-price >span').textContent;
                console.log('date',date);
                fetch(`http://localhost:3000/cart`,{
                    method:'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({departure:departure,arrival:arrival,date:date,price}),
                }).then(response => response.json)
                

            })
    }

}
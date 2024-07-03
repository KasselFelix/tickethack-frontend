document.querySelector('#search-btn').addEventListener('click', function () {
    console.log('click search')
    const departure = document.querySelector('#depart').value;
    const arrival = document.querySelector('#arrival').value;
    const date = document.querySelector('#date').value;
    document.querySelector('#result').innerHTML = ``;

    fetch('http://localhost:3000/trips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ departure: departure, arrival: arrival, date: new Date(date.toString()) }),
    })
        .then(response => response.json())
        .then(data => {
            console.log('data:', data)
            if (!data.result) {
                document.querySelector('#result').innerHTML += `
            <div class="no-result">
                        <div id="magnifying-glass-logo">
                            <img src="../tickethack-frontend/images/notfound.png" alt="Not found logo" />
                            <hr />
                        </div>
                        <p>No trip found.</p>
                    </div>
            `
            } else {
                for (let i = 0; i < data.trips.length; i++) {
                    console.log('trip', data.trips[i]);
                    document.querySelector('#result').innerHTML += `
                    <div class="tickets-found">
                        <div class="travel-data"><span class="depart">${data.trips[i].departure}</span> > <span class="arrival">${data.trips[i].arrival}</span></div>
                        <div class="travel-time"><span class="hidden-date">${data.trips[i].date}</span>${moment(data.trips[i].date).format('hh:mm')}</div>
                        <div class="travel-price"><span>${data.trips[i].price}</span>€</div>
                        <button type="button" id="${data.trips[i]._id}" class="book-btn"><a href="cart.html" >Book</a></button>
                    </div>
                    `
                }
            }
            cartAdd();
            
        })

})




function cartAdd() {
    for (let i = 0; i < document.querySelectorAll('.book-btn').length; i++) {
        document.querySelectorAll('.book-btn')[i].addEventListener('click', function () {
            const departure = this.parentNode.querySelector('.depart').textContent;
            const arrival = this.parentNode.querySelector('.arrival').textContent;
            const date = this.parentNode.querySelector('.hidden-date').textContent;
            console.log(date)
            const price = this.parentNode.querySelector('.travel-price >span').textContent;
            console.log('date', date);
            fetch(`http://localhost:3000/cart`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ departure: departure, arrival: arrival, date: date, price }),
            }).then(response => response.json)
        })
    }

}



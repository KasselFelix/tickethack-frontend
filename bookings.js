let counter = 0;

fetch("http://localhost:3000/booking")
    .then((response) => response.json())
    .then((data) => {
        document.querySelector("#default-booking").remove();
        for (let i = 0; i < data.trips.length; i++) {
            document.querySelector(
                "#my-bookings"
            ).innerHTML += `<div class="travel-data"><span class="depart">${
                data.trips[i].departure
            }</span> > <span class="arrival">${
                data.trips[i].arrival
            }</span></div>
                                <div class="travel-time"><span class="hidden-date">${
                                    data.trips[i].date
                                }</span>${moment(data.trips[i].date).format(
                "hh:mm"
            )}</div>
                                <div class="travel-price"><span>${
                                    data.trips[i].price
                                }</span>€</div>
                                <div class='counter'>Departure in ${counter} hours</div>`;
        }
    });

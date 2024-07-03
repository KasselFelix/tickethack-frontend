const del = document.querySelectorAll(".delete-btn");

function callDelete() {
    for (let i = 0; i < document.querySelectorAll(".delete-btn").length; i++) {
        document
            .querySelectorAll(".delete-btn")
            [i].addEventListener("click", function () {
                console.log(this.id);
                console.log("pass");
                fetch(`http://localhost:3000/cart/${this.id.toString()}`, {
                    method: "DELETE",
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        if (data.result) {
                            document
                            this.parentNode.remove();;
                            console.log("removing true");
                        }
                    });
            });
    }
}

fetch("http://localhost:3000/cart")
    .then((response) => response.json())
    .then((data) => {
        if (data.trips) {
            console.log(data);
            document.querySelector("#default-cart").remove();
            document.querySelector("#my-cart").innerHTML += `
                <div id="total-cart">
                    <p id="entete">My Cart</p>
                    <div id="cart-list"></div>
                    <div id="total-price">
                        <h3 style="color:white">Total: <span id="som" style="color:white"></span>€</h3>
                        <button type="button" id="purchase-btn">Purchase</button>
                    </div>
                </div>
                `;
            let som = 0;
            for (let i = 0; i < data.trips.length; i++) {
                console.log('affiche')
                document.querySelector("#cart-list").innerHTML += `   
                    <div id="tickets-booked">
                        <div class="travel-data"><span class="depart">${data.trips[i].departure}</span> > <span class="arrival">${data.trips[i].arrival}</span></div>
                        <div class="travel-time"><span class="hidden-date">${data.trips[i].date}</span>${moment(data.trips[i].date).format("hh:mm")}</div>
                        <div class="travel-price"><span>${data.trips[i].price}</span>€</div>
                        <button type="button" id="${data.trips[i]._id}" class="delete-btn">X</button>
                    </div>
                   `;
                   som+=data.trips[i].price;
            }
            document.querySelector("#som").innerHTML +=`${som}`; 
            callDelete();
        }
    });

document.querySelector("#purchase-btn").addEventListener("click", function () {
    fetch(`http://localhost:3000/purchase`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            if (data.result) {
                let sum = 0;
                for (let i = 0; i < data.length; i++) {
                    console.log("booking", data[i]);
                    document.querySelector("#tickets-booked").innerHTML += `
                        <div class="travel-data"><span class="depart">${data[i].departure}</span> > <span class="arrival">${data[i].arrival}</span></div>
                        <div class="travel-time"><span class="hidden-date">${data[i].date}</span>${moment(data[i].date).format("hh:mm")}</div>
                        <div class="travel-price"><span>${data[i].price}</span>€</div>`;
                    sum += data[i].price;
                }
                console.log(sum);
                window.location.assign("../tickethack-frontend/bookings.html");
            }
        });
});

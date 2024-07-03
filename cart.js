function callDelete(){
    for (let i = 0; i < document.querySelectorAll('.delete-btn').length; i++) {
        document.querySelectorAll('.delete-btn')[i].addEventListener('click', function () {
            console.log('i')
            this.parentNode.remove()
        })
    }
}
callDelete()


// function callDelete() {
//     for (let i = 0; i < del.length; i++) {
//         del[i].addEventListener("click", function () {
//             console.log("click delete detected");
//             fetch(`http://localhost:3000/trips/${this.id}`, { method: "DELETE" })
//                 .then((response) => response.json())
//                 .then((data) => {
//                     if (data.result) {
//                         this.parentNode.remove();
//                         console.log("removing true");
//                     }
//                 });
//         });
//     }
// }
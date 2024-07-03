


function callDelete(){
    for (let i = 0; i < document.querySelectorAll('.delete-btn').length; i++) {
        document.querySelectorAll('.delete-btn')[i].addEventListener('click', function () {
            console.log('i')
            this.parentNode.remove()
        })
    }
}
callDelete()
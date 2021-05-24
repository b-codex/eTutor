var myModal = document.getElementById('exampleModal')
var choose = document.getElementById('choose')
var coordinates = document.getElementById('coordinates');


choose.addEventListener('click', function () {
    if (coordinates.innerHTML == "") {
        alert("Please choose your location!")
    } else {
        $("#exampleModal").modal('hide');
        $('.modal-backdrop').hide();
    }
})
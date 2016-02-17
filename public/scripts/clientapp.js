$(document).ready(function() {

    $('#submit-button').on('click', postData);

});

function postData() {
    event.preventDefault();

    var values = {};
    $.each($('#sql-form').serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });

    console.log(values);

    $.ajax({
        type: 'POST',
        url: '/people',
        data: values,
        success: function(data) {
            if(data) {
                // everything went ok
                console.log('from server:', data);
                getData();
            } else {
                console.log('error');
            }
        }
    });
}

function getData() {
    $.ajax({
        type: 'GET',
        url: '/people',
        success: function(data) {
            console.log(data);

            $('#info').children().remove();

            for (var i = 0; i < data.length; i++) {
                appendPersonToDOM(data[i]);
            }

            //Object.keys(data).forEach(function(person, index) {
            //    $('#info').append('<li>Name: ' + data.person.name + '; Address: ' + data.person.address +
            //    ', ' + data.person.city + ', ' + data.person.state + ' ' + data.person.zip_code + '</li>');
            //});
        }
    });
}

function appendPersonToDOM(person) {
    $('#info').append('<li>Name: ' + person.name + '; Address: ' + person.address + ', ' + person.city +
        ', ' + person.state + ' ' + person.zip_code + '</li>');
}
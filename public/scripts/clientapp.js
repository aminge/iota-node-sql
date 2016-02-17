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
                getData();
                $('input[type="text"]').val('');
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

            $('#info').children().remove();

            for (var i = 0; i < data.length; i++) {
                appendPersonToDOM(data[i]);
            }
        }
    });
}

function appendPersonToDOM(person) {
    $('#info').append('<li>Name: ' + person.name + '; Address: ' + person.address + ', ' + person.city +
        ', ' + person.state + ' ' + person.zip_code + '</li>');
}
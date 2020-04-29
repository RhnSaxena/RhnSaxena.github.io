var myHeaders = new Headers();
myHeaders.append("x-api-key", "BiZrGMokNvaGtOLxHjURKV9ZbobVk6Zd");
url = "https://api-dev.oninnovaccer.com/fhir/";
var api = '';
var query = '';

function renderJson(endpoint, requestOptions){
    fetch(endpoint, requestOptions)
        .then(response => response.text())
        .then(result => document.getElementById("json").innerHTML =result)
        .catch(error => document.getElementById("json").innerHTML =error);
}

function functionOne() {

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    api = "Patient";
    query = "/ddf8e442-5b14-491d-80a4-adfffab4b3ea";
    
    renderJson(url+api+query, requestOptions);
}

function functionTwo() {

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    api = "RelatedPerson";
    query = "/608809d0-0911-476c-aa89-53b2bdb98fe1";

    renderJson(url+api+query, requestOptions);
}

function functionThree() {

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    api = "Practitioner";
    query = "/1fdba303-cfa1-40c3-b058-d1b01ac8527b";
    
    renderJson(url+api+query, requestOptions);
}

function functionFour() {

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    api = "Patient/";
    query = "ddf8e442-5b14-491d-80a4-adfffab4b3ea";
    
    renderJson(url+api+query, requestOptions);
}

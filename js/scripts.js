var myHeaders = new Headers();
url = "https://api-dev.oninnovaccer.com/fhir/";
var api = '';
var query = '';
var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

function renderJson(endpoint, requestOptions){
    fetch(endpoint, requestOptions)
        .then(response => response.text())
        // .then(result => document.getElementById("json").innerHTML =JSON.stringify(JSON.parse(result), undefined, 4))
        .then(result => document.getElementById("tab_2_json").innerHTML =syntaxHighlight(JSON.parse(result)))
        .catch(error => document.getElementById("tab_2_json").innerHTML =error);
}

function functionOne() {

    api = "Patient";
    query = "/ddf8e442-5b14-491d-80a4-adfffab4b3ea";
    
    renderJson(url+api+query, requestOptions);
}

function functionTwo() {

    api = "RelatedPerson";
    query = "/608809d0-0911-476c-aa89-53b2bdb98fe1";

    renderJson(url+api+query, requestOptions);
}

function functionThree() {

    api = "Practitioner";
    query = "/1fdba303-cfa1-40c3-b058-d1b01ac8527b";
    
    renderJson(url+api+query, requestOptions);
}

function functionFour() {

    api = "Medication";
    query = "?status=active";
    
    renderJson(url+api+query, requestOptions);
}


function syntaxHighlight(json) {
    if (typeof json != 'string') {
         json = JSON.stringify(json, undefined, 4);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}



function submit_app_token(){
    var app_token = document.getElementById('app_token').value;

    if(app_token==""){
        alert("Please Enter the app token");
    }

    else{
        myHeaders.append("x-api-key", app_token);
        document.getElementById('api_container').style.display='block';
        document.getElementById('api_credentials').style.display='none';
    }
    return false;
}
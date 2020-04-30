var myHeaders = new Headers();
url = "https://api-dev.oninnovaccer.com/fhir/";
var api = '';
var query = '';
var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

function renderJson(id){

    var endpoint = url + api + "\\" + id;
    fetch(endpoint, requestOptions)
        .then(response => response.text())
        // .then(result => document.getElementById("json").innerHTML =JSON.stringify(JSON.parse(result), undefined, 4))
        .then(result => document.getElementById("tab_2_json").innerHTML =syntaxHighlight(JSON.parse(result)))
        .catch(error => document.getElementById("tab_2_json").innerHTML =error);
    toggle_tabs("tab_2");
    
    document.getElementById("tab_2_json_des").innerHTML = "This is the detailed JSON Object for the chosen instance.";
}

function renderPatientList(Patients){

    toggle_tabs("tab_1");
    var text = "";
    text +="<table>"
    var patient;
    for (patient in Patients["entry"][0]["resource"]){

        text += "<tr> <td class='col-8'>Name : "
            + Patients["entry"][0]["resource"][patient]["name"][0]["given"][0] +" " 
            + Patients["entry"][0]["resource"][patient]["name"][0]["family"] + "<br>Gender : "
            + Patients["entry"][0]["resource"][patient]["gender"] + "<br>Address : "
            + Patients["entry"][0]["resource"][patient]["address"][0]["city"] + ", "
            + Patients["entry"][0]["resource"][patient]["address"][0]["state"] + "<br></td><td class='col-4'> "
            + "<a class='more_info' onclick="+'renderJson('+'"'+ Patients["entry"][0]["resource"][patient]["id"]+'"' +')'+">More Info</a>"
            + "</td></tr>" ;
    }
    text +="</table>"
    document.getElementById("tab_1_json").innerHTML = text;
    document.getElementById("tab_1_json_des").innerHTML = "These are few instances of the chosen API.";
}



function function_Patient_Query() {

    api = "Patient";
    query = "?active=true";
    document.getElementById("tab_1_json").innerHTML = '';
    fetch(url+api+query, requestOptions)
        .then(response => response.text())
        // .then(result => document.getElementById("json").innerHTML =JSON.stringify(JSON.parse(result), undefined, 4))
        .then(result => renderPatientList(JSON.parse(result)))
        .catch(error => document.getElementById("tab_1_json").innerHTML =error);
}


function renderAllergyList(Allergy){
    toggle_tabs("tab_1");
    var text = "";
    text +="<table>"
    var allergy;
    for (allergy in Allergy["entry"][0]["resource"]){
        var cat;
        text += "<tr> <td class='col-8'>Category : ";
            for( cat in Allergy["entry"][0]["resource"][allergy]["category"]){
                text+= Allergy["entry"][0]["resource"][allergy]["category"][cat] +", "
            }
        text += "<br>Clinical Status : "
                + Allergy["entry"][0]["resource"][allergy]["clinicalStatus"]["coding"][0]["code"]+ "<br>"
                 // + "Type : " +Allergy["entry"][0]["resource"][allergy]["encounter"]["type"] +"<br> " 
                + "Patient : " +Allergy["entry"][0]["resource"][allergy]["patient"]["reference"] 
                + "<br></td><td class='col-4'><a class='more_info' onclick="
                + 'renderJson('+'"'+ Allergy["entry"][0]["resource"][allergy]["id"]+'"' +')'
                +">More Info</a></td></tr>" ;
    }
    text +="</table>"
    document.getElementById("tab_1_json").innerHTML = text;
    document.getElementById("tab_1_json_des").innerHTML = "These are few instances of the chosen API.";
}

function function_AllergyIn_Query() {

    api = "AllergyIntolerance";
    query = "?clinical-status=active";
    document.getElementById("tab_1_json").innerHTML = '';
    fetch(url+api+query, requestOptions)
        .then(response => response.text())
        // .then(result => document.getElementById("json").innerHTML =JSON.stringify(JSON.parse(result), undefined, 4))
        .then(result => renderAllergyList(JSON.parse(result)))
        .catch(error => document.getElementById("tab_1_json").innerHTML =error);
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
        document.getElementById('tab_1').style.display='block';
        document.getElementById('tab_2').style.display='none';
        document.getElementById('api_credentials').style.display='none';
    }
    return false;
}

function toggle_tabs(tab){
    if(tab==="tab_2"){
        document.getElementById('tab_1').style.display='none';
        document.getElementById('tab_2').style.display='block';
    }else{
        document.getElementById('tab_1').style.display='block';
        document.getElementById('tab_2').style.display='none';
        document.getElementById("tab_2_json").innerHTML = '';
    }
    return false;
}
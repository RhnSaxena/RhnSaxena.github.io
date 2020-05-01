var myHeaders = new Headers();
url = "https://api-dev.oninnovaccer.com/fhir/";
var api = '';
var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

var param_api='';
var param_value='';

var param_list = {
    "resources" : {

        "Patient" : {
            
            "active" : [
                "true", "false"
            ],
            // "maritalStatus" : [
            //     "M", "S", "C"
            // ],
            "gender" : [
                "male","female","other"
            ]
        },
        "AllergyIntolerance" : {
            "criticality" : [
                "high", "low", "unable-to-assess"
            ],
            "clinical-status" : [
                "active", "inactive", "resolved"
            ],
            "severity" : [
                "mild", "moderate", "severe"
            ],
            "type" : [
                "allergy", "intolerance"
            ]
        },
        "Practitioner" : {
            "active" : [
                "true", "false"
            ],
            "gender" : [
                "male","female","other"
            ]
        }
        
    }
}

function populate_param(resource){

    document.getElementById('selection_box').style.display='block';
    if(!(resource===param_api)){
        param_api=resource;
        var select_tag = document.getElementById('parameters')
        removeOptions(select_tag);
        doc_frag = document.createDocumentFragment();
        var parameter;
        for(parameter in param_list["resources"][resource]){
            var option = document.createElement('option');
            option.value = parameter;
            option.appendChild(document.createTextNode(parameter));
            doc_frag.appendChild(option);
        }
        select_tag.appendChild(doc_frag);
    }
}

function populate_param_value(){
    param = document.getElementById('parameters').value;
    if(!(param===param_value)){
        param_value=param;
        var select_tag = document.getElementById('parameters_possible_value')
        removeOptions(select_tag);
        doc_frag = document.createDocumentFragment();
        var parameter;
        for(x in param_list["resources"][param_api][param_value]){
            var option = document.createElement('option');
            option.value = param_list["resources"][param_api][param_value][x];
            option.appendChild(document.createTextNode(param_list["resources"][param_api][param_value][x]));
            doc_frag.appendChild(option);
        }
        select_tag.appendChild(doc_frag);
    }
}


function renderJson(id){

    var endpoint = url + api + "\\" + id;
    fetch(endpoint, requestOptions)
        .then(response => response.text())
        // .then(result => document.getElementById("json").innerHTML =JSON.stringify(JSON.parse(result), undefined, 4))
        .then(result => document.getElementById(id).innerHTML =syntaxHighlight(JSON.parse(result)))
        .catch(error => document.getElementById("tab_2_json").innerHTML =error);
    // toggle_tabs("tab_2"); 
}

function renderPatientList(Patients){

    
    var text = "";
    text +="<table>"
    var patient;
    var i=1;
    for (patient in Patients["entry"][0]["resource"]){
        var target_id = "div_"+i.toString();
        var target = "#"+target_id;
        text += "<tr> <td class='col-8'>Name : "
            + Patients["entry"][0]["resource"][patient]["name"][0]["given"][0] +" " 
            + Patients["entry"][0]["resource"][patient]["name"][0]["family"] + "<br>Gender : "
            + Patients["entry"][0]["resource"][patient]["gender"] + "<br>Address : "
            + Patients["entry"][0]["resource"][patient]["address"][0]["city"] + ", "
            + Patients["entry"][0]["resource"][patient]["address"][0]["state"] + "<br></td><td class='col-4'> "
            + "<button class='btn btn-outline-danger'"
            + " data-target="+ `"${target}"`+" type='button' data-toggle='collapse' >More Info</button>"
            + "</td></tr><tr><td>"
            +"<pre class='collapse json_collapse' id="+`"${target_id}"`+">"
            + syntaxHighlight(Patients["entry"][0]["resource"][patient])
            +"</pre></td></tr>";
        i++;
    }
    text +="</table>"
    document.getElementById("tab_1_json").innerHTML = text;
}

function renderAllergyList(Allergy){
    
    var text = "";
    text +="<table>"
    var allergy;
    var i = 0;
    for (allergy in Allergy["entry"][0]["resource"]){
        var target_id = "div_"+i.toString();
        var target = "#"+target_id;
        var cat;
        text += "<tr><td class='col-8'>Category : ";
            for( cat in Allergy["entry"][0]["resource"][allergy]["category"]){
                text+= Allergy["entry"][0]["resource"][allergy]["category"][cat] +", "
            }
        text = text.slice(0, -2);
        text += "<br>Clinical Status : "
                + Allergy["entry"][0]["resource"][allergy]["clinicalStatus"]["coding"][0]["code"]+ "<br>Patient : " 
                + Allergy["entry"][0]["resource"][allergy]["patient"]["reference"]+"<br>"
                 // + "Type : " +Allergy["entry"][0]["resource"][allergy]["encounter"]["type"] +"<br> " 
                + "</td><td class='col-4'><button class='btn btn-outline-danger'"
                + " data-target="+ `"${target}"`+" type='button' data-toggle='collapse' >More Info</button></td></tr><tr><td>"
                +"<pre class='collapse json_collapse' id="+`"${target_id}"`+">"
                + syntaxHighlight(Allergy["entry"][0]["resource"][allergy])
                +"</pre></td></tr>";
        i++;
    }
    text +="</table>"
    document.getElementById("tab_1_json").innerHTML = text;

}

function renderPractitionerList(Practitioner){
    
    var text = "";
    text +="<table>"
    var practitioner;
    var i =0;
    for (practitioner in Practitioner["entry"][0]["resource"]){
        var target_id = "div_"+i.toString();
        var target = "#"+target_id;
        text += "<tr><td class='col-8'>Name : "
            + Practitioner["entry"][0]["resource"][practitioner]["name"][0]["given"][0] +" " 
            + Practitioner["entry"][0]["resource"][practitioner]["name"][0]["family"] + "<br>Gender : "
            + Practitioner["entry"][0]["resource"][practitioner]["gender"] + "<br>Address : "
            + Practitioner["entry"][0]["resource"][practitioner]["address"][0]["city"] + ", "
            + Practitioner["entry"][0]["resource"][practitioner]["address"][0]["state"] + "<br></td><td class='col-4'> "
            + "<button class='btn btn-outline-danger' "
            + " data-target="+ `"${target}"`+" type='button' data-toggle='collapse' >More Info</button></td></tr><tr><td>"
            +"<pre class='collapse json_collapse' id="+`"${target_id}"`+">"
            + syntaxHighlight(Practitioner["entry"][0]["resource"][practitioner])
            +"</pre></td></tr>";
        i++;
    }
    text +="</table>"
    document.getElementById("tab_1_json").innerHTML = text;
}

function function_Patient_Query(arg1, query) {
    toggle_tabs("tab_1");
    api = arg1;
    document.getElementById("tab_1_json").innerHTML = '';
    document.getElementById("api_name").innerHTML = 'Patient';
    populate_param(api);
    populate_param_value();
    console.log(url+api+query);
    fetch(url+api+query, requestOptions)
        .then(response => response.text())
        // .then(result => document.getElementById("json").innerHTML =JSON.stringify(JSON.parse(result), undefined, 4))
        .then(result => renderPatientList(JSON.parse(result)))
        .catch(error => document.getElementById("tab_1_json").innerHTML =error);
}

function function_AllergyIn_Query(arg1, query) {
    toggle_tabs("tab_1");
    api = arg1;
    document.getElementById("tab_1_json").innerHTML = '';
    document.getElementById("api_name").innerHTML = 'Allergy Intolerance';

    populate_param(api);
    populate_param_value();
    fetch(url+api+query, requestOptions)
        .then(response => response.text())
        // .then(result => document.getElementById("json").innerHTML =JSON.stringify(JSON.parse(result), undefined, 4))
        .then(result => renderAllergyList(JSON.parse(result)))
        .catch(error => document.getElementById("tab_1_json").innerHTML =error);
}

function function_Practitioner_Query(arg1,query) {
    toggle_tabs("tab_1");
    api = arg1;
    populate_param(api);
    populate_param_value();
    document.getElementById("tab_1_json").innerHTML = '';
    document.getElementById("api_name").innerHTML = 'Practitioner Intolerance';

    fetch(url+api+query, requestOptions)
        .then(response => response.text())
        // .then(result => document.getElementById("json").innerHTML =JSON.stringify(JSON.parse(result), undefined, 4))
        .then(result => renderPractitionerList(JSON.parse(result)))
        .catch(error => document.getElementById("tab_1_json").innerHTML =error);
}

function submit_query_button(){
    var query = "?"+ document.getElementById('parameters').value+"="+document.getElementById('parameters_possible_value').value;
    if(api==='Patient'){
        function_Patient_Query(api,query);
    }else if(api=='AllergyIntolerance'){
        function_AllergyIn_Query(api,query)
    }else{
        function_Practitioner_Query(api,query);
    }
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

// function submit_app_token(){

//     var app_token = document.getElementById('app_token').value;
//     if(app_token==""){
//         alert("Please Enter the app token");
//     }else{


//         myHeaders.append("x-api-key", app_token);
//         document.getElementById('api_container').style.display='block';
//         document.getElementById('tab_1').style.display='block';
//         document.getElementById('tab_2').style.display='none';
//         document.getElementById('api_credentials').style.display='none';
//     }
//     return false;
// }

function submit_app_token(){

    var client_id = `"${document.getElementById('client_id').value}"`;
    var client_secret = `"${document.getElementById('client_secret').value}"`;
    var auth_Headers = new Headers();
    auth_Headers.append("Content-Type", "application/json");
    auth_Headers.append("Content-Type", "text/plain");

    var raw = "{"
        + "\"client_id\":" + client_id +","
        + "\"client_secret\":" + client_secret +","
        + "\"grant_type\":\"client_credentials\""
        + "}"
    var authrequest = {
      method: 'POST',
      headers: auth_Headers,
      body: raw,
      redirect: 'follow'
    };
    
    var data_token = fetch("https://api-dev.oninnovaccer.com/fhiroauth/oauth2/token", authrequest)
    .then(response => response.text())
    .then(result => assign_api_token(JSON.parse(result)))
    .catch(error => console.log('error', error));


    // data_token.then(response =>{
    //     if(!response.ok){
    //         alert("Please Enter Correct app token.\nStatus Code : "+ response.status);
    //         location.reload();
    //     }
    // });
    

    // console.log("the data is    "+data_token["access_token"]);
    // myHeaders.append("x-api-key", data_token["access_token"]);
    // document.getElementById('api_container').style.display='block';
    // document.getElementById('tab_1').style.display='block';
    // document.getElementById('tab_2').style.display='none';
    // document.getElementById('api_credentials').style.display='none';
    return false;
}

function assign_api_token(obj){
        myHeaders.append("x-api-key", obj["access_token"]);
    document.getElementById('api_container').style.display='block';
    document.getElementById('tab_1').style.display='block';
    // document.getElementById('tab_2').style.display='none';
    document.getElementById('api_credentials').style.display='none';
}

function toggle_tabs(tab){
    if(tab==="tab_2"){
        document.getElementById('tab_1').style.display='none';
        // document.getElementById('tab_2').style.display='block';
    }else{
        document.getElementById('tab_1').style.display='block';
        // document.getElementById('tab_2').style.display='none';
        // document.getElementById("tab_2_json").innerHTML = '';
    }
    return false;
}

function removeOptions(selectElement) {
    var i, L = selectElement.options.length - 1;
    for(i = L; i >= 0; i--) {
       selectElement.remove(i);
    }
 }
 
 
 function testing(){
    // document.getElementById('api_container').style.display='block';
    // document.getElementById('tab_1').style.display='block';
    // document.getElementById('tab_2').style.display='none';
    // document.getElementById('api_credentials').style.display='none';
 }
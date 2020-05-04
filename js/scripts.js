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
var user_input_flag;
var param_list = {
    "resources" : {

        "Patient" : {
            
            "active" : [
                "true", "false"
            ],
            "gender" : [
                "male","female","other"
            ],
            "address" : "user_input",
            "name" : "user_input",
            "language" : "user_input",
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
            ],
            "category" : [
                "food", "medication", "environment", "biologic"
            ],
            "patient" : "user_input",
        },
        "Practitioner" : {
            "active" : [
                "true", "false"
            ],
            "gender" : [
                "male","female","other"
            ],
            "address-city" : "user_input",
            "name" : "user_input",
            "language" : "user_input",
        },
        "Condition" :{
            "clinical-status" : [
                "active", "inactive", "resolved"
            ],
            "code" : "user_input",
            "Patient" : "user_input",
            "onset-date": "user_input",
            "asserter": "user_input"
        },
        "ServiceRequest" : {
            "priority" : [
                "routine", "urgent", "asap", "stat"
            ],
            "status" : [
                "draft", "active", "suspended", "completed", "entered-in-error", "cancelled"
            ],
            "intent" : "user_input",
            "encounter" : "user_input",
        },
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

        if(!(param_list["resources"][param_api][param_value]==="user_input")){
            user_input_flag=false;
            document.getElementById("parameters_possible_value").style.display='block';
            document.getElementById("parameters_user_value").style.display='none';
            var select_tag = document.getElementById('parameters_possible_value')
            removeOptions(select_tag);
            doc_frag = document.createDocumentFragment();
            for(x in param_list["resources"][param_api][param_value]){
                var option = document.createElement('option');
                option.value = param_list["resources"][param_api][param_value][x];
                option.appendChild(document.createTextNode(param_list["resources"][param_api][param_value][x]));
                doc_frag.appendChild(option);
            }
            select_tag.appendChild(doc_frag);
        }else{
            document.getElementById('parameters_user_value').value='';
            user_input_flag=true;
            document.getElementById("parameters_possible_value").style.display='none';
            document.getElementById("parameters_user_value").style.display='block';
        }
    }
}

function renderJSONviewer(id){
    var hash_id ="#"+id;
    var source = id+"#";
    var jsonViewer = new JSONViewer();
    var x = document.getElementById(source).innerHTML;
    document.getElementById(id).innerText='';
    jsonViewer.showJSON(JSON.parse(x),null,1);
    document.querySelector(hash_id).appendChild(jsonViewer.getContainer());
}

function renderPatientList(Patients){

    var text = "";
    text +="<div class='list-group'>"
    var patient;
    var i=1;
    for (patient in Patients["entry"][0]["resource"]){
        var target_id = "div_"+i.toString();
        var target = "#"+target_id;
        var source_json=target_id+"#";
        text += "<button type='button' class='list-group-item list-group-item-action json_list_button'"
            +" data-target="+ `"${target}"`+" data-toggle='collapse' "
            + "onclick = renderJSONviewer("+`"${target_id}"`+") >"
            + "<div>"
            + "Name : "
            + Patients["entry"][0]["resource"][patient]["name"][0]["given"][0] +" " 
            + Patients["entry"][0]["resource"][patient]["name"][0]["family"] + "<br>Gender : "
            + Patients["entry"][0]["resource"][patient]["gender"] + "<br>Language : "
            if(Patients["entry"][0]["resource"][patient]["communication"] != null ){
                text+= Patients["entry"][0]["resource"][patient]["communication"][0]["language"]["coding"]["code"] 
            }else{
                text+= Patients["entry"][0]["resource"][patient]["communication"] 
            }
            text+= "<br>Address : "
            + Patients["entry"][0]["resource"][patient]["address"][0]["city"] + ", "
            + Patients["entry"][0]["resource"][patient]["address"][0]["state"] + "<br>"
            + "</div>"
            + "</button>"
            +"<pre class='collapse json_collapse' id="+`"${source_json}"`+">"
            + JSON.stringify(Patients["entry"][0]["resource"][patient])
            +"</pre>"
            +"<pre class='collapse json_collapse' id="+`"${target_id}"`+">"
            +"</pre>";
        i++;
    }
    text +="</div>"
    document.getElementById("tab_1_json").innerHTML = text;
}

function renderAllergyList(Allergy){
    
    var text = "";
    text +="<div class='list-group'>"
    var allergy;
    var i = 0;
    for (allergy in Allergy["entry"][0]["resource"]){
        var target_id = "div_"+i.toString();
        var target = "#"+target_id;
        var source_json=target_id+"#";
        var cat;
        text += "<button type='button' class='list-group-item list-group-item-action json_list_button'"
                +" data-target="+ `"${target}"`+" data-toggle='collapse' "
                + "onclick = renderJSONviewer("+`"${target_id}"`+") >"
                + "<div>"
                + "Category : ";
        for( cat in Allergy["entry"][0]["resource"][allergy]["category"]){
            text+= Allergy["entry"][0]["resource"][allergy]["category"][cat] +", "
        }
        text = text.slice(0, -2);
        text += "<br>Type : "
                + Allergy["entry"][0]["resource"][allergy]["type"]
                +"<br>Clinical Status : "
                + Allergy["entry"][0]["resource"][allergy]["clinicalStatus"]["coding"][0]["code"]+ "<br>Patient : " 
                + Allergy["entry"][0]["resource"][allergy]["patient"]["reference"]+"<br>"
                + "</div>"
                + "</button>"
                +"<pre class='collapse json_collapse' id="+`"${source_json}"`+">"
                + JSON.stringify(Allergy["entry"][0]["resource"][allergy])
                +"</pre>"
                +"<pre class='collapse json_collapse' id="+`"${target_id}"`+">"
                +"</pre>";
            i++;
    }
    text +="</div>"
    document.getElementById("tab_1_json").innerHTML = text;
}

function renderPractitionerList(Practitioner){
    
    var text = "";
    text +="<div class='list-group'>"
    var practitioner;
    var i =0;
    for (practitioner in Practitioner["entry"][0]["resource"]){
        var target_id = "div_"+i.toString();
        var target = "#"+target_id;
        var source_json=target_id+"#";
        text +=  "<button type='button' class='list-group-item list-group-item-action json_list_button' "
            +" data-target="+ `"${target}"`+" data-toggle='collapse' "
            + "onclick = renderJSONviewer("+`"${target_id}"`+") >"
            + "<div>"
            + "Name : "
            + Practitioner["entry"][0]["resource"][practitioner]["name"][0]["given"][0] +" " 
            + Practitioner["entry"][0]["resource"][practitioner]["name"][0]["family"] + "<br>Gender : "
            + Practitioner["entry"][0]["resource"][practitioner]["gender"] + "<br>Language : "
            if(Practitioner["entry"][0]["resource"][practitioner]["communication"] != null ){
                text+= Practitioner["entry"][0]["resource"][practitioner]["communication"][0]["language"]["coding"]["code"] 
            }else{
                text+= Practitioner["entry"][0]["resource"][practitioner]["communication"] 
            }
        text+= "<br>Address : "
            + Practitioner["entry"][0]["resource"][practitioner]["address"][0]["city"] + ", "
            + Practitioner["entry"][0]["resource"][practitioner]["address"][0]["state"] + "<br>"
            + "</div>"
            + "</button>"
            +"<pre class='collapse json_collapse' id="+`"${source_json}"`+">"
            + JSON.stringify(Practitioner["entry"][0]["resource"][practitioner])
            +"</pre>"
            +"<pre class='collapse json_collapse' id="+`"${target_id}"`+">"
            +"</pre>";
        i++;
    }
    text +="</div>"
    document.getElementById("tab_1_json").innerHTML = text;
}

function renderConditionList(Condition){
    
    var text = "";
    text +="<div class='list-group'>"
    var condition;
    var i =0;
    for (condition in Condition["entry"][0]["resource"]){
        var target_id = "div_"+i.toString();
        var target = "#"+target_id;
        var source_json=target_id+"#";
        text +=  "<button type='button' class='list-group-item list-group-item-action json_list_button' "
            +" data-target="+ `"${target}"`+" data-toggle='collapse' "
            + "onclick = renderJSONviewer("+`"${target_id}"`+") >"
            + "<div>"
            + "Patient : "
            + Condition["entry"][0]["resource"][condition]["subject"]["reference"] +"<br>On-set Date : "
            + Condition["entry"][0]["resource"][condition]["onsetDateTime"] + "<br>Code : "
            + Condition["entry"][0]["resource"][condition]["code"]["coding"][0]["system"] + " | "
            + Condition["entry"][0]["resource"][condition]["code"]["coding"][0]["code"] + "<br>Asserter : ";
            if(Condition["entry"][0]["resource"][condition]["asserter"] !=null){
                text += Condition["entry"][0]["resource"][condition]["asserter"]["type"]+" | "
                    + Condition["entry"][0]["resource"][condition]["asserter"]["reference"]
            }else{
                text += Condition["entry"][0]["resource"][condition]["asserter"];
            }            
        text+="</div>"
            + "</button>"
            +"<pre class='collapse json_collapse' id="+`"${source_json}"`+">"
            + JSON.stringify(Condition["entry"][0]["resource"][condition])
            +"</pre>"
            +"<pre class='collapse json_collapse' id="+`"${target_id}"`+">"
            +"</pre>";
        i++;
    }
    text +="</div>"
    document.getElementById("tab_1_json").innerHTML = text;
}

function renderServiceRequestList(ServiceRequest){
    
    var text = "";
    text +="<div class='list-group'>"
    var srequest;
    var i =0;
    for (srequest in ServiceRequest["entry"][0]["resource"]){
        var target_id = "div_"+i.toString();
        var target = "#"+target_id;
        var source_json=target_id+"#";
        text +=  "<button type='button' class='list-group-item list-group-item-action json_list_button' "
            +" data-target="+ `"${target}"`+" data-toggle='collapse' "
            + "onclick = renderJSONviewer("+`"${target_id}"`+") >"
            + "<div>"
            + "Status : "
            + ServiceRequest["entry"][0]["resource"][srequest]["status"] +"<br>Priority : "
            + ServiceRequest["entry"][0]["resource"][srequest]["priority"] + "<br>Intent : "
            + ServiceRequest["entry"][0]["resource"][srequest]["intent"] + "<br>Encounter : ";
            if(ServiceRequest["entry"][0]["resource"][srequest]["encounter"] !=null){
                text += ServiceRequest["entry"][0]["resource"][srequest]["encounter"]["type"]+" | "
                    + ServiceRequest["entry"][0]["resource"][srequest]["encounter"]["reference"]
            }else{
                text += ServiceRequest["entry"][0]["resource"][srequest]["encounter"];
            }            
        text+="</div>"
            + "</button>"
            +"<pre class='collapse json_collapse' id="+`"${source_json}"`+">"
            + JSON.stringify(ServiceRequest["entry"][0]["resource"][srequest])
            +"</pre>"
            +"<pre class='collapse json_collapse' id="+`"${target_id}"`+">"
            +"</pre>";
        i++;
    }
    text +="</div>"
    document.getElementById("tab_1_json").innerHTML = text;
}

function fetch_Resource_Query(arg1, query) {

    api = arg1;
    document.getElementById("tab_1_json").innerHTML = '';
    document.getElementById("api_name").innerHTML = api;
    populate_param(api);
    populate_param_value();
    fetch(url+api+query, requestOptions)
        .then(response => response.text())
        .then(result => render_Query(JSON.parse(result)))
        .catch(error => document.getElementById("tab_1_json").innerHTML =error);
}

function render_Query(data){
    if(api==='Patient'){
        renderPatientList(data);
    }else if(api=='AllergyIntolerance'){
        renderAllergyList(data)
    }else if(api=='Practitioner'){
        renderPractitionerList(data);
    }else if(api=='Condition'){
        renderConditionList(data);
    }else if(api=='ServiceRequest'){
        renderServiceRequestList(data);
    }
}

function submit_query_button(){
    var query = "?"+ document.getElementById('parameters').value+"=";
    if(user_input_flag){
         query +=document.getElementById('parameters_user_value').value;
    }else{
        query +=document.getElementById('parameters_possible_value').value;
    }
     
    fetch_Resource_Query(api, query);
}

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
    
    fetch("https://api-dev.oninnovaccer.com/fhiroauth/oauth2/token", authrequest)
    .then(response =>response.text().then(result => {
        if(!response.ok){
            alert("Please Enter Correct Credentials.\nStatus Code : "+ response.status);
            location.reload();
        }else{
            var obj = JSON.parse(result);
            myHeaders.append("x-api-key", obj["access_token"]);
            document.getElementById('api_container').style.display='block';
            document.getElementById('api_credentials').style.display='none';
        }
    }
    ))  
    .catch(error => console.log('error', error));
    return false;
}

function removeOptions(selectElement) {
    var i, L = selectElement.options.length - 1;
    for(i = L; i >= 0; i--) {
       selectElement.remove(i);
    }
 }

var myHeaders = new Headers();

var api = "";
var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};
var param_api = "";
var param_value = "";
var user_input_flag;
var query;

function testing() {
  myHeaders.append("x-api-key", "BiZrGMokNvaGtOLxHjURKV9ZbobVk6Zd");
  document.getElementById("api_container").style.display = "block";
  document.getElementById("api_credentials").style.display = "none";
}

// Function to fetch query
function fetch_Resource_Query(arg1, param, page) {
  query = param;
  let page_query = "&_page=" + page + "&_count=" + pagination_page_size;
  api = arg1;
  document.getElementById("pagination_button").style.display = "none";
  document.getElementById("pagination_stats").style.display = "none";
  document.getElementById("tab_1_json").innerHTML = "";
  document.getElementById("api_name").innerHTML = api;
  populate_param(api);
  populate_param_value();
  fetch(fhir_url + api + param + page_query, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      total_count = parseInt(JSON.parse(result)["totalCount"]);
      render_Query(JSON.parse(result));
      createButtons(page);
    })
    .catch(
      (error) => (document.getElementById("tab_1_json").innerHTML = error)
    );
}

// Function to route the data to
// the respective render function
function render_Query(data) {
  if (api === "Patient") {
    renderPatientList(data);
  } else if (api == "AllergyIntolerance") {
    renderAllergyList(data);
  } else if (api == "Practitioner") {
    renderPractitionerList(data);
  } else if (api == "Condition") {
    renderConditionList(data);
  } else if (api == "ServiceRequest") {
    renderServiceRequestList(data);
  }
}

// Function to create the JSONviewer collapsable
// JSON container
function renderJSONviewer(id) {
  let target = "#" + id;
  let source = id + "#";
  let jsonViewer = new JSONViewer();
  let x = document.getElementById(source).innerHTML;
  document.getElementById(id).innerText = "";
  jsonViewer.showJSON(JSON.parse(x), null, 1);
  document.querySelector(target).appendChild(jsonViewer.getContainer());
}

// Function to generate list for Patient FHIR API
function renderPatientList(Patients) {
  let text = "";
  text += "<div class='list-group'>";
  let patient;
  let i = 1;
  for (patient in Patients["entry"][0]["resource"]) {
    let target_id = "div_" + i.toString();
    let target = "#" + target_id;
    let source_json = target_id + "#";
    text +=
      "<button type='button' class='list-group-item list-group-item-action json_list_button'" +
      " data-target=" +
      `"${target}"` +
      " data-toggle='collapse' " +
      "onclick = renderJSONviewer(" +
      `"${target_id}"` +
      ") >" +
      "<div>" +
      "Name : " +
      Patients["entry"][0]["resource"][patient]["name"][0]["given"][0] +
      " " +
      Patients["entry"][0]["resource"][patient]["name"][0]["family"] +
      "<br>Gender : " +
      Patients["entry"][0]["resource"][patient]["gender"] +
      "<br>Language : ";
    if (Patients["entry"][0]["resource"][patient]["communication"] != null) {
      text +=
        Patients["entry"][0]["resource"][patient]["communication"][0][
          "language"
        ]["coding"]["code"];
    } else {
      text += Patients["entry"][0]["resource"][patient]["communication"];
    }
    text +=
      "<br>Address : " +
      Patients["entry"][0]["resource"][patient]["address"][0]["city"] +
      ", " +
      Patients["entry"][0]["resource"][patient]["address"][0]["state"] +
      "<br>" +
      "</div>" +
      "</button>" +
      "<pre class='collapse json_collapse' id=" +
      `"${source_json}"` +
      ">" +
      JSON.stringify(Patients["entry"][0]["resource"][patient]) +
      "</pre>" +
      "<pre class='collapse json_collapse' id=" +
      `"${target_id}"` +
      ">" +
      "</pre>";
    i++;
  }
  text += "</div>";
  document.getElementById("tab_1_json").innerHTML = text;
  
}

// Function to generate list for AllergyIntolerance FHIR API

function renderAllergyList(Allergy) {
  let text = "";
  text += "<div class='list-group'>";
  let allergy;
  let i = 0;
  for (allergy in Allergy["entry"][0]["resource"]) {
    let target_id = "div_" + i.toString();
    let target = "#" + target_id;
    let source_json = target_id + "#";
    let cat;
    text +=
      "<button type='button' class='list-group-item list-group-item-action json_list_button'" +
      " data-target=" +
      `"${target}"` +
      " data-toggle='collapse' " +
      "onclick = renderJSONviewer(" +
      `"${target_id}"` +
      ") >" +
      "<div>" +
      "Category : ";
    for (cat in Allergy["entry"][0]["resource"][allergy]["category"]) {
      text += Allergy["entry"][0]["resource"][allergy]["category"][cat] + ", ";
    }
    text = text.slice(0, -2);
    text +=
      "<br>Type : " +
      Allergy["entry"][0]["resource"][allergy]["type"] +
      "<br>Clinical Status : " +
      Allergy["entry"][0]["resource"][allergy]["clinicalStatus"]["coding"][0][
        "code"
      ] +
      "<br>Patient : " +
      Allergy["entry"][0]["resource"][allergy]["patient"]["reference"] +
      "<br>" +
      "</div>" +
      "</button>" +
      "<pre class='collapse json_collapse' id=" +
      `"${source_json}"` +
      ">" +
      JSON.stringify(Allergy["entry"][0]["resource"][allergy]) +
      "</pre>" +
      "<pre class='collapse json_collapse' id=" +
      `"${target_id}"` +
      ">" +
      "</pre>";
    i++;
  }
  text += "</div>";
  document.getElementById("tab_1_json").innerHTML = text;
  document.getElementById("pagination_button").style.display = "block";
}

// Function to generate list for Practitioner FHIR API
function renderPractitionerList(Practitioner) {
  let text = "";
  text += "<div class='list-group'>";
  let practitioner;
  let i = 0;
  for (practitioner in Practitioner["entry"][0]["resource"]) {
    let target_id = "div_" + i.toString();
    let target = "#" + target_id;
    let source_json = target_id + "#";
    text +=
      "<button type='button' class='list-group-item list-group-item-action json_list_button' " +
      " data-target=" +
      `"${target}"` +
      " data-toggle='collapse' " +
      "onclick = renderJSONviewer(" +
      `"${target_id}"` +
      ") >" +
      "<div>" +
      "Name : " +
      Practitioner["entry"][0]["resource"][practitioner]["name"][0][
        "given"
      ][0] +
      " " +
      Practitioner["entry"][0]["resource"][practitioner]["name"][0]["family"] +
      "<br>Gender : " +
      Practitioner["entry"][0]["resource"][practitioner]["gender"] +
      "<br>Language : ";
    if (
      Practitioner["entry"][0]["resource"][practitioner]["communication"] !=
      null
    ) {
      text +=
        Practitioner["entry"][0]["resource"][practitioner]["communication"][0][
          "language"
        ]["coding"]["code"];
    } else {
      text +=
        Practitioner["entry"][0]["resource"][practitioner]["communication"];
    }
    text +=
      "<br>Address : " +
      Practitioner["entry"][0]["resource"][practitioner]["address"][0]["city"] +
      ", " +
      Practitioner["entry"][0]["resource"][practitioner]["address"][0][
        "state"
      ] +
      "<br>" +
      "</div>" +
      "</button>" +
      "<pre class='collapse json_collapse' id=" +
      `"${source_json}"` +
      ">" +
      JSON.stringify(Practitioner["entry"][0]["resource"][practitioner]) +
      "</pre>" +
      "<pre class='collapse json_collapse' id=" +
      `"${target_id}"` +
      ">" +
      "</pre>";
    i++;
  }
  text += "</div>";
  document.getElementById("tab_1_json").innerHTML = text;
  document.getElementById("pagination_button").style.display = "block";
}

// Function to generate list for Condition FHIR API
function renderConditionList(Condition) {
  let text = "";
  text += "<div class='list-group'>";
  let condition;
  let i = 0;
  for (condition in Condition["entry"][0]["resource"]) {
    let target_id = "div_" + i.toString();
    let target = "#" + target_id;
    let source_json = target_id + "#";
    text +=
      "<button type='button' class='list-group-item list-group-item-action json_list_button' " +
      " data-target=" +
      `"${target}"` +
      " data-toggle='collapse' " +
      "onclick = renderJSONviewer(" +
      `"${target_id}"` +
      ") >" +
      "<div>" +
      "Patient : " +
      Condition["entry"][0]["resource"][condition]["subject"]["reference"] +
      "<br>On-set Date : " +
      Condition["entry"][0]["resource"][condition]["onsetDateTime"] +
      "<br>Code : " +
      Condition["entry"][0]["resource"][condition]["code"]["coding"][0][
        "system"
      ] +
      " | " +
      Condition["entry"][0]["resource"][condition]["code"]["coding"][0][
        "code"
      ] +
      "<br>Asserter : ";
    if (Condition["entry"][0]["resource"][condition]["asserter"] != null) {
      text +=
        Condition["entry"][0]["resource"][condition]["asserter"]["type"] +
        " | " +
        Condition["entry"][0]["resource"][condition]["asserter"]["reference"];
    } else {
      text += Condition["entry"][0]["resource"][condition]["asserter"];
    }
    text +=
      "</div>" +
      "</button>" +
      "<pre class='collapse json_collapse' id=" +
      `"${source_json}"` +
      ">" +
      JSON.stringify(Condition["entry"][0]["resource"][condition]) +
      "</pre>" +
      "<pre class='collapse json_collapse' id=" +
      `"${target_id}"` +
      ">" +
      "</pre>";
    i++;
  }
  text += "</div>";
  document.getElementById("tab_1_json").innerHTML = text;
  document.getElementById("pagination_button").style.display = "block";
}

// Function to generate list for ServiceRequest FHIR API
function renderServiceRequestList(ServiceRequest) {
  let text = "";
  text += "<div class='list-group'>";
  let srequest;
  let i = 0;
  for (srequest in ServiceRequest["entry"][0]["resource"]) {
    let target_id = "div_" + i.toString();
    let target = "#" + target_id;
    let source_json = target_id + "#";
    text +=
      "<button type='button' class='list-group-item list-group-item-action json_list_button' " +
      " data-target=" +
      `"${target}"` +
      " data-toggle='collapse' " +
      "onclick = renderJSONviewer(" +
      `"${target_id}"` +
      ") >" +
      "<div>" +
      "Status : " +
      ServiceRequest["entry"][0]["resource"][srequest]["status"] +
      "<br>Priority : " +
      ServiceRequest["entry"][0]["resource"][srequest]["priority"] +
      "<br>Intent : " +
      ServiceRequest["entry"][0]["resource"][srequest]["intent"] +
      "<br>Encounter : ";
    if (ServiceRequest["entry"][0]["resource"][srequest]["encounter"] != null) {
      text +=
        ServiceRequest["entry"][0]["resource"][srequest]["encounter"]["type"] +
        " | " +
        ServiceRequest["entry"][0]["resource"][srequest]["encounter"][
          "reference"
        ];
    } else {
      text += ServiceRequest["entry"][0]["resource"][srequest]["encounter"];
    }
    text +=
      "</div>" +
      "</button>" +
      "<pre class='collapse json_collapse' id=" +
      `"${source_json}"` +
      ">" +
      JSON.stringify(ServiceRequest["entry"][0]["resource"][srequest]) +
      "</pre>" +
      "<pre class='collapse json_collapse' id=" +
      `"${target_id}"` +
      ">" +
      "</pre>";
    i++;
  }
  text += "</div>";
  document.getElementById("tab_1_json").innerHTML = text;
  document.getElementById("pagination_button").style.display = "block";
}

// The list contains the resources and their corresponding
// parameters and their possible values
var param_list = {
  resources: {
    Patient: {
      active: ["true", "false"],
      gender: ["male", "female", "other"],
      address: "user_input",
      name: "user_input",
      language: "user_input",
    },
    AllergyIntolerance: {
      criticality: ["high", "low", "unable-to-assess"],
      "clinical-status": ["active", "inactive", "resolved"],
      severity: ["mild", "moderate", "severe"],
      type: ["allergy", "intolerance"],
      category: ["food", "medication", "environment", "biologic"],
      patient: "user_input",
    },
    Practitioner: {
      active: ["true", "false"],
      gender: ["male", "female", "other"],
      "address-city": "user_input",
      name: "user_input",
      language: "user_input",
    },
    Condition: {
      "clinical-status": ["active", "inactive", "resolved"],
      code: "user_input",
      Patient: "user_input",
      "onset-date": "user_input",
      asserter: "user_input",
    },
    ServiceRequest: {
      priority: ["routine", "urgent", "asap", "stat"],
      status: [
        "draft",
        "active",
        "suspended",
        "completed",
        "entered-in-error",
        "cancelled",
      ],
      intent: "user_input",
      encounter: "user_input",
    },
  },
};

// Function to populate the select tag
// with the parameters available to
// query the selected API resource
function populate_param(resource) {
  query_json = [];
  document.getElementById("added_queries").innerHTML = "";
  document.getElementById("selection_box").style.display = "block";
  if (!(resource === param_api)) {
    param_api = resource;
    let select_tag = document.getElementById("parameters");
    removeOptions(select_tag);
    doc_frag = document.createDocumentFragment();
    let parameter;
    for (parameter in param_list["resources"][resource]) {
      let option = document.createElement("option");
      option.value = parameter;
      option.appendChild(document.createTextNode(parameter));
      doc_frag.appendChild(option);
    }
    select_tag.appendChild(doc_frag);
  }
}

// Function to populate the select tag
// with the possible parameters values to
// query the selected API resource
function populate_param_value() {
  param = document.getElementById("parameters").value;
  if (!(param === param_value)) {
    param_value = param;

    if (!(param_list["resources"][param_api][param_value] === "user_input")) {
      user_input_flag = false;
      document.getElementById("parameters_possible_value").style.display =
        "block";
      document.getElementById("parameters_user_value").style.display = "none";
      let select_tag = document.getElementById("parameters_possible_value");
      removeOptions(select_tag);
      doc_frag = document.createDocumentFragment();
      for (x in param_list["resources"][param_api][param_value]) {
        let option = document.createElement("option");
        option.value = param_list["resources"][param_api][param_value][x];
        option.appendChild(
          document.createTextNode(
            param_list["resources"][param_api][param_value][x]
          )
        );
        doc_frag.appendChild(option);
      }
      select_tag.appendChild(doc_frag);
    } else {
      document.getElementById("parameters_user_value").value = "";
      user_input_flag = true;
      document.getElementById("parameters_possible_value").style.display =
        "none";
      document.getElementById("parameters_user_value").style.display = "block";
    }
  }
}

// Function which will be called when
// submit query button will be clicked
function submit_query_button() {
  let query = "?";
  let i;
  if(query_json.length==0){
    add_query_button();
  }
  for (i in query_json) {
    query += query_json[i]["param"] + "=" + query_json[i]["value"] + "&";
  }
  query = query.slice(0, -1);
  fetch_Resource_Query(api, query, 1);
}

// The function adds the query to the array
// to be sent to fetch the query
function add_query_button() {
  let query_param = document.getElementById("parameters").value;
  let query_param_value;
  if (user_input_flag) {
    query_param_value = document.getElementById("parameters_user_value").value;
  } else {
    query_param_value = document.getElementById("parameters_possible_value")
      .value;
  }
  let record = { param: query_param, value: query_param_value };
  query_json.push(record);
  create_buttons();
}

function create_buttons() {
  document.getElementById("added_queries").innerHTML = "";
  for (i in query_json) {
    document.getElementById("added_queries").innerHTML +=
      "<p class='btn btn-primary query_delete'>" +
      query_json[i]["value"] +
      "<button type='button' class='query_delete_close' onclick=" +
      "delete_query(" +
      i +
      ")" +
      "><span aria-hidden='true'>&times;</span></button></p> ";
  }
}

function delete_query(id) {
  let x = query_json.splice(id, 1);
  create_buttons();
}

// Function to flush the previously present
// Options in the select tag
function removeOptions(selectElement) {
  let i,
    L = selectElement.options.length - 1;
  for (i = L; i >= 0; i--) {
    selectElement.remove(i);
  }
}

// Function to store the selected queries to
// form complex query
var query_json = [];

// Function to authorize using OAuth2.0
// Submit a POST Request and
// Recieve an access_token and add it to the header
function submit_app_token() {
  let client_id = `"${document.getElementById("client_id").value}"`;
  let client_secret = `"${document.getElementById("client_secret").value}"`;
  let auth_Headers = new Headers();
  auth_Headers.append("Content-Type", "application/json");
  auth_Headers.append("Content-Type", "text/plain");

  let raw =
    "{" +
    '"client_id":' +
    client_id +
    "," +
    '"client_secret":' +
    client_secret +
    "," +
    '"grant_type":"client_credentials"' +
    "}";
  let authrequest = {
    method: "POST",
    headers: auth_Headers,
    body: raw,
    redirect: "follow",
  };

  fetch(oauth_url, authrequest)
    .then((response) =>
      response.text().then((result) => {
        if (!response.ok) {
          alert(
            "Please Enter Correct Credentials.\nStatus Code : " +
              response.status
          );
          location.reload();
        } else {
          let obj = JSON.parse(result);
          myHeaders.append("x-api-key", obj["access_token"]);
          document.getElementById("api_container").style.display = "block";
          document.getElementById("api_credentials").style.display = "none";
        }
      })
    )
    .catch(
      (error) => (document.getElementById("api_credentials").innerHTML = error)
    );
  return false;
}

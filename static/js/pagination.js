var total_count;
var pagination_page_size = parseInt("7");

function pagination_button_click(N) {
  let page = N;
  fetch_Resource_Query(api, query, N);
}

function createButtons(N) {
  let no_of_pages = parseInt(
    parseInt(total_count) / parseInt(pagination_page_size)
  );
  if (total_count % pagination_page_size != 0) {
    no_of_pages += parseInt("1");
  }
  let text = "";
  let count = 5;
  let value = N;
  let i = 0;

  let currentPage = N,
    range = count,
    totalPages = no_of_pages,
    start = 1;

  // Don't use negative values, force start at 1
  if (currentPage < range / 2 + 1) {
    start = 1;

    // Don't go beyond the last page
  } else if (currentPage >= totalPages - range / 2) {
    start = Math.floor(totalPages - range + 1);
  } else {
    start = currentPage - Math.floor(range / 2);
  }

  if (start != 1) {
    text +=
      "<button type='button' class='btn btn-outline-dark' onclick=pagination_button_click(" +
      1 +
      ")>" +
      "First Page" +
      "</button> ";
  }
  for (let i = start; i <= start + range - 1; i++) {
    if (i == N) {
      text +=
        "<button type='button' class='btn btn-outline-dark active' onclick=pagination_button_click(" +
        i +
        ")>" +
        i +
        "</button> ";
    } else {
      text +=
        "<button type='button' class='btn btn-outline-dark' onclick=pagination_button_click(" +
        i +
        ")>" +
        i +
        "</button> ";
    }
  }
  if (start + range - 1 != no_of_pages) {
    text +=
      "<button type='button' class='btn btn-outline-dark' onclick=pagination_button_click(" +
      no_of_pages +
      ")>" +
      "Last Page" +
      "</button> ";
  }
  document.getElementById("pagination_button").innerHTML = text;

  let stats='Displaying ';
  if(N!=no_of_pages){
    stats+=((N-1)*pagination_page_size)+1+" - "+(N*pagination_page_size)+" out of "+total_count;
  }else{
    stats+=((N-1)*pagination_page_size)+1+" - "+total_count+" out of "+total_count
  }

  document.getElementById("pagination_stats").innerHTML = stats;
  document.getElementById("pagination_button").style.display = "block";
  document.getElementById("pagination_stats").style.display = "block";
}

function submit_pagination_query(N) {}

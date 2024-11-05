let searchInputEl = document.getElementById("searchInput");
let searchResults = document.getElementById("searchResults");
let spinnerElement = document.getElementById("spinner");

function createAndAppendSearchResult(result) {
    let {
        title,
        link,
        description
    } = result;
    // Div Container
    let resultItemContainer = document.createElement("div");
    resultItemContainer.classList.add("result-item");
    searchResults.appendChild(resultItemContainer);

    //Anchor Element
    let resulttitleElement = document.createElement("a");
    resulttitleElement.classList.add("result-title");
    resulttitleElement.textContent = title;
    resulttitleElement.href = link;
    resulttitleElement.target = "_blank";
    resultItemContainer.appendChild(resulttitleElement);

    //Title Break
    let titleBreakElement = document.createElement("br");
    resultItemContainer.appendChild(titleBreakElement);

    //Anchor URL
    let urlElement = document.createElement("a");
    urlElement.classList.add("result-url");
    urlElement.href = link;
    urlElement.target = "_blank";
    urlElement.textContent = link;
    resultItemContainer.appendChild(urlElement);

    //line Break
    let linkBreakElement = document.createElement("br");
    resultItemContainer.appendChild(linkBreakElement);

    //Paragragh descriptions
    let descriptionElement = document.createElement("p");
    descriptionElement.classList.add("line-description");
    descriptionElement.textContent = description;
    resultItemContainer.appendChild(descriptionElement);
}

function displayResults(search_results) {
    spinnerElement.classList.toggle("d-none");
    for (let result of search_results) {
        createAndAppendSearchResult(result);
    }
}
searchInputEl.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        spinnerElement.classList.toggle("d-none");
        searchResults.textContent = "";
        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                let {
                    search_results
                } = data;
                displayResults(search_results);
            });
    }
});

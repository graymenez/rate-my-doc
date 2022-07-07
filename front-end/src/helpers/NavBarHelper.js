// changes search bar class for expand animation
function executeExpandSearch(event) {
  if (event.target) {
    event.target.className = "searchPhysician-expand";
    document.getElementById("searchIco").className = "searchPhysician-expand";
    document.getElementById("searchIco").style.backgroundSize = "15px";
    document.getElementById(
      "searchIco"
    ).style.backgroundImage = `url=(../src/images/search-icon-png-9964-Windows.ico)`;
  }
  if (event.target.className === "searchPhysician-hover") {
    document.getElementById("searchPhysician-hover").className =
      "searchPhysician-expand";
  }
  document.getElementById("searchPhysician").className =
    "searchPhysician-expand";
}

export default executeExpandSearch;

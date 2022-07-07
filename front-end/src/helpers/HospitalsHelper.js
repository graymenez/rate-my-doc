import RmdApi from "../api";

// a function that takes all hospitals and divides them into seperate pages depending on the maxPerPage value

function makePages(
  allHospitals,
  pageNumber,
  setPageHospitals,
  setIsHospitalsPageLoading
) {
  let maxPerPage = 5;
  if (pageNumber < 1) {
    // gets the first 20 Hospitals from arr for first page depending on page number and sets page to first arr of Hospitals
    let page = allHospitals.slice(0, maxPerPage);

    // setPageHospitals to this page and set IsHospitalsPageLoading state to false
    setPageHospitals(page);

    setIsHospitalsPageLoading(false);
  } else if (pageNumber >= 1) {
    //if page number is greater or equal to one multiply maxPerPage by page number to slice at correct starting index of array then add maxHospital to the  product of maxPerPage and pageNumber to slice at the correct ending point of array
    let nextPage = allHospitals.slice(
      maxPerPage * pageNumber,
      maxPerPage * pageNumber + maxPerPage
    );
    // setPageHospitals to this next page and set setIsHospitalsPageLoading to false
    setPageHospitals(nextPage);
    setIsHospitalsPageLoading(false);
  }
}

//gets Hospital data and sets the number of pages as well as makes the pages
const getData = async (
  setNumOfHospitals,
  page,
  setPageHospitals,
  setIsHospitalsPageLoading
) => {
  let allHospitals = await RmdApi.getAllHospitals();
  let length = allHospitals.length;
  setNumOfHospitals(length);
  makePages(allHospitals, page, setPageHospitals, setIsHospitalsPageLoading);
};

export default {
  makePages,
  getData,
};

import { NavLink } from "react-router-dom";
import RmdApi from "../api";
function makePages(
  arr,
  pageNumber,
  setPagePhysicians,
  setIsPhysiciansPageLoading
) {
  let maxPhysicianPerPage = 20;
  if (pageNumber < 1) {
    // gets the first 20 Physicians from arr for first page depending on page number and sets page to first arr of Physicians
    let page = arr.slice(0, maxPhysicianPerPage);

    // setPagePhysicians to this page and set IsPhysiciansPageLoading state to false
    setPagePhysicians(page);

    setIsPhysiciansPageLoading(false);
  } else if (pageNumber >= 1) {
    //if page number is greater or equal to one multiply maxPhysicianPerPage by page number to slice at correct starting index of array then add maxPhysician to the  product of maxPhysicianPerPage and pageNumber to slice at the correct ending point of array
    let nextPage = arr.slice(
      maxPhysicianPerPage * pageNumber,
      maxPhysicianPerPage * pageNumber + maxPhysicianPerPage
    );
    // setPagePhysicians to this next page and set setIsPhysiciansPageLoading to false
    setPagePhysicians(nextPage);
    setIsPhysiciansPageLoading(false);
  }
}

//gets Physician data and sets the number of pages as well as makes the pages
const getData = async (
  setNumOfPhysicians,
  page,
  setPagePhysicians,
  setIsPhysiciansPageLoading
) => {
  let res = await RmdApi.getAllPhysicians();
  let length = res.physicians.length;
  setNumOfPhysicians(length);
  makePages(
    res.physicians,
    page,
    setPagePhysicians,
    setIsPhysiciansPageLoading
  );
};

export default {
  makePages,
  getData,
};

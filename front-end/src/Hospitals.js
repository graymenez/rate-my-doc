import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import LogoContainer from "./LogoContainer";
import HospitalCard from "./HospitalCard";
import "../src/styles/Hospitals.css";
import "../src/styles/HospitalsSearchBar.css";
import LoadSpinner from "./LoadingSpinner";
import { v4 as uuidv4 } from "uuid";
import HospitalsHelper from "./helpers/HospitalsHelper";
import Pagination from "./Pagination";

const Hospitals = () => {
  const [pageHospitals, setPageHospitals] = useState([]);
  const [isHospitalsPageLoading, setIsHospitalsPageLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [numOfHospitals, setNumOfHospitals] = useState(0);
  // Renders all Hospitals and lists them via HospitalCard
  useEffect(() => {
    // Gets Hospital data and make pages
    console.log(pageHospitals);
    console.log(page);
    HospitalsHelper.getData(
      setNumOfHospitals,
      page,
      setPageHospitals,
      setIsHospitalsPageLoading
    );
  }, [page]);
  console.log(pageHospitals);
  console.log(page + 1);
  return (
    <>
      <LogoContainer />

      <div id="Hospitals" className="HospitalsContainer">
        <SearchBar componentName={"Hospitals"} />
        <Pagination setPage={setPage} data={numOfHospitals} dataPerPage={5} />
        <div id="HospitalContainer">
          {!isHospitalsPageLoading ? (
            <ul className="HospitalList">
              <div className="allHospitals">
                {pageHospitals.map((hospital) => (
                  <div key={uuidv4()}>
                    <li key={hospital.id}>
                      <HospitalCard hospitals_details={hospital} />
                    </li>
                    <div className="HospitalListBreakLine"></div>
                  </div>
                ))}
              </div>
            </ul>
          ) : (
            <LoadSpinner />
          )}
        </div>
      </div>
    </>
  );
};
export default Hospitals;

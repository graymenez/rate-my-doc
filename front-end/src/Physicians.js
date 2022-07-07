import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import LogoContainer from "./LogoContainer";
import PhysicianCard from "./PhysicianCard";
import "../src/styles/Physicians.css";
import "../src/styles/PhysiciansSearchBar.css";
import LoadSpinner from "./LoadingSpinner";
import { v4 as uuidv4 } from "uuid";
import PhysiciansHelper from "./helpers/PhysiciansHelper";
import Pagination from "./Pagination";

const Physicians = () => {
  const [pagePhysicians, setPagePhysicians] = useState([]);
  const [isPhysiciansPageLoading, setIsPhysiciansPageLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [numOfPhysicians, setNumOfPhysicians] = useState(0);
  // Renders all physicians and lists them via physicianCard
  useEffect(() => {
    // Gets physician data and make pages
    PhysiciansHelper.getData(
      setNumOfPhysicians,
      page,
      setPagePhysicians,
      setIsPhysiciansPageLoading
    );
  }, [page]);
  console.log(page + 1);
  return (
    <>
      <LogoContainer />

      <div id="Physicians" className="PhysiciansContainer">
        <SearchBar componentName={"Physicians"} />
        <Pagination setPage={setPage} data={numOfPhysicians} dataPerPage={19} />
        <div id="PhysicianContainer">
          {!isPhysiciansPageLoading ? (
            <ul className="PhysicianList">
              <div className="allPhysicians">
                {pagePhysicians.map((physician) => (
                  <div key={uuidv4()}>
                    <li key={physician.id}>
                      <PhysicianCard physician_details={physician} />
                    </li>
                    <div className="PhysicianListBreakLine"></div>
                  </div>
                ))}
              </div>
            </ul>
          ) : (
            <LoadSpinner />
          )}
        </div>
        <Pagination setPage={setPage} data={numOfPhysicians} dataPerPage={19} />
      </div>
    </>
  );
};
export default Physicians;

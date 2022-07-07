import { improve } from "@cloudinary/url-gen/actions/adjust";
import React, { useEffect } from "react";
import { useState } from "react";
import paginationHandler from "./helpers/paginationHandler";
import "./styles/Pagination.css";

const Pagination = ({ setPage, data, dataPerPage }) => {
  const [seqBtn, setSeqBtn] = useState({ start: 0, finish: 5 });
  // Sets page numbers to the next page that is clicked and handles active btns
  function nextPage(e) {
    if (e !== undefined) {
      setPage(Number(e.target.innerText) - 1);
    }
  }

  // const handleCurrentPage = () => {
  //   if (currentPage) {
  //     currentPage.classList.remove("pgActive");
  //   }
  // };
  // handleCurrentPage();

  // Renders the pagnitation list
  return (
    <div id="pagnitationList" className="Pagination">
      {seqBtn.start === 0 ? (
        <a
          className="Pagination-prev-inactive"
          onClick={() =>
            paginationHandler.handlePageBtn(
              "decrement",
              seqBtn,
              setSeqBtn,
              data
            )
          }
        >
          <p></p>
        </a>
      ) : (
        <a
          className="Pagination-prev"
          onClick={() =>
            paginationHandler.handlePageBtn(
              "decrement",
              seqBtn,
              setSeqBtn,
              data
            )
          }
        >
          <ion-icon name="chevron-back-outline"></ion-icon>
        </a>
      )}
      {paginationHandler
        .btnElement(Math.floor(data / dataPerPage), nextPage)
        .slice(seqBtn.start, seqBtn.finish)}

      {seqBtn.finish >= Math.floor(data / dataPerPage) ? (
        <a
          className="Pagination-next-inactive"
          onClick={() => {
            paginationHandler.handlePageBtn(
              "increment",
              seqBtn,
              setSeqBtn,
              data
            );
          }}
        >
          <p onClick={nextPage}></p>
        </a>
      ) : (
        <a
          className="Pagination-next"
          onClick={() => {
            paginationHandler.handlePageBtn(
              "increment",
              seqBtn,
              setSeqBtn,
              data
            );
          }}
        >
          <ion-icon className="next" name="chevron-forward-outline"></ion-icon>
        </a>
      )}
    </div>
  );
};

export default Pagination;

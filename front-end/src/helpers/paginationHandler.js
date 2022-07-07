import { NavLink } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

//returns the the incremented number of buttons needed for each page

const btnElement = (numPages, nextPage) => {
  let elements = [];
  for (let i = 1; i <= numPages; i++) {
    elements.push(
      <a
        key={uuidv4()}
        id={`pageBtn${i}`}
        className={`pageBtn`}
        onClick={nextPage}
      >
        {i}
      </a>
    );
  }
  return elements;
};

// handles the buttons that allow the array to go to the next sequenced number of pages

// example: "prev 1  2  3  4  5 next" Clicking "next" will set off with condition "increment" it will now be "prev 6  7  8  9  10 next"

const handlePageBtn = (condition, seqBtn, setSeqBtn, numOfPages) => {
  if (condition === "increment") {
    seqBtn.finish >= Math.floor(numOfPages / 5)
      ? console.error(new Error("Sorry, no more pages left"))
      : setSeqBtn({ start: seqBtn.start + 5, finish: seqBtn.finish + 5 });
  } else if (condition === "decrement") {
    seqBtn.start !== 0
      ? setSeqBtn({ start: seqBtn.start - 5, finish: seqBtn.finish - 5 })
      : console.error("Sorry, negative pages do not exists");
  }
};

//handles the classes of page buttons. If current target === "i-active" all other page buttons = pageBtns. Giving the current target active effect
function pagnitationClassHandler(e) {
  //while targeted class = "i-active" get all other elements in #paginationList container and set className = "pageBtns"
  //iElements gets the "prev" and "next" button looping through and setting class to "prevNextBtns"
  while (e.target.className === "i-active") {
    let elements = document.querySelectorAll("#pagnitationList a");
    let iElements = document.querySelectorAll("#pagnitationList a i");
    let iLength = iElements.length;
    let length = elements.length;
    for (let i = 0; i <= length; i++) {
      try {
        if (elements[i] !== e.target && elements[i].className === "i-active") {
          elements[i].className = "pageBtns";
        }
      } catch (e) {}
    }
    for (let i = 0; i <= iLength; i++) {
      try {
        if (
          iElements[i] !== e.target &&
          iElements[i].className === "i-active"
        ) {
          iElements[i].className = "prevNextBtns";
        }
      } catch (e) {}
    }
    return;
  }
}

export default {
  btnElement,
  handlePageBtn,
  pagnitationClassHandler,
};

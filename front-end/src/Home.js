import axios from "axios";
import React, { useEffect, useState } from "react";
import "./styles/Home.css";
import newsGlobe from "./images/world-png-300x300.avif";

const Home = () => {
  // return (
  //   <div className="sample container">
  //     <header className="sample__header">
  //       <p className="sample__header-text">Your company name here</p>
  //       <img className="sample__header-img" src={newsGlobe} />
  //     </header>
  //   </div>
  // );
  const NEWS_API_KEY = "e42b4328446bf859366da08f6fd03a48";
  const [data, setData] = useState();
  useEffect(() => {
    const newsData = async () => {
      let result = await axios.get(
        `http://api.mediastack.com/v1/news?access_key=${NEWS_API_KEY}&keywords=health&languages=en&limit=9`
      );
      setData(result.data);
    };
    newsData();
  }, []);
  if (data) {
    console.log(data.data);
  }
  return (
    <div className="Home-news container">
      <header className="news-header">
        <p className="news-header-text">Health News</p>
        <img className="news-header-img" src={newsGlobe} />
      </header>
      {data
        ? data.data.map((d) => (
            <div className="news-card">
              <figure className="card-title">{d.title}</figure>
              <div className="author-container">
                <p className="card-author">{d.author}</p>
              </div>
              <div className="learn-more">
                <a className="btn">Learn More</a>
              </div>
            </div>
          ))
        : null}
    </div>
  );
};
export default Home;

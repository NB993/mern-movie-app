import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import MainImage from "./Sections/MainImage";
import GridCards from "../commons/GridCards";
import { Row } from "antd";

function LandingPage() {
  const [Movies, setMovies] = useState([]); // Movies데이터에는 배열이 들어올 거니 initial state도 배열로
  const [MainMovieImage, setMainMovieImage] = useState(null);
  const [CurrentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchMovies(endpoint);
  }, []);

  const fetchMovies = (endpoint) => {
    fetch(endpoint)
      .then((response) => response.json()) // reponse된 데이터를 바로는 사용하지 못하고 json화 해줘야 함.
      .then((response) => {
        console.log(response);
        setMovies([...Movies, ...response.results]); // loadMore버튼을 누를 때 새로운 데이터를 기존 Movies state에 덮어씌우지 않고 추가해야 하므로 ...Movies를 해줌.
        setMainMovieImage(response.results[0]);
        setCurrentPage(response.page);
      });
  };

  const loadMoreItems = () => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
      CurrentPage + 1
    }`;
    fetchMovies(endpoint);
  };

  return (
    <div stlye={{ width: "100%", margin: "0" }}>
      {/* Main Image */}
      {MainMovieImage && (
        <MainImage
          image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
          title={MainMovieImage.original_title}
          text={MainMovieImage.overview}
        />
      )}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <h2>Movie by latest</h2>
        <hr />
        {/* Movie Grid Cards */}
        <Row gutter={[16, 16]}>
          {/* map(() => {}) << 중괄호를 쓰면 안되고, 리액트 컴포넌트를 그려줘야 하니까 소괄호()를 써야 함 */}
          {Movies &&
            Movies.map((movie, index) => (
              <React.Fragment key={index}>
                {/* key값 넣어줘야 에러x */}
                <GridCards
                  landingpage
                  image={
                    movie.poster_path
                      ? `${IMAGE_BASE_URL}w500${movie.poster_path}`
                      : null
                  }
                  movieId={movie.id}
                  movieName={movie.original_title}
                />
              </React.Fragment>
            ))}
        </Row>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={loadMoreItems}>Load More</button>
      </div>
    </div>
  );
}

export default LandingPage;

import React from "react";
import { Col } from "antd";

function GridCards(props) {
  if (props.landingpage) {
    return (
      <Col lg={6} md={8} xs={24}>
        {/* 한줄이 24칸이고, 사이즈에 따라 컬럼 한칸에 6칸, 8칸씩 할당해주므로 6칸일시 한줄에 4개, 8칸일시 한줄에 3개가 표시된다. */}
        <div style={{ position: "relative" }}>
          <a href={`/movie/${props.movieId}`}>
            <img
              style={{ width: "100%", height: "320px" }}
              src={props.image}
              alt={props.movieName}
            />
          </a>
        </div>
      </Col>
    );
  } else {
    return (
      <Col lg={6} md={8} xs={24}>
        {/* 한줄이 24칸이고, 사이즈에 따라 컬럼 한칸에 6칸, 8칸씩 할당해주므로 6칸일시 한줄에 4개, 8칸일시 한줄에 3개가 표시된다. */}
        <div style={{ position: "relative" }}>
          <img
            style={{ width: "100%", height: "320px" }}
            src={props.image}
            alt={props.characterName}
          />
        </div>
      </Col>
    );
  }
}

export default GridCards;

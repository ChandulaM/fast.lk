import React, { Component } from "react";

const ProductCard = ({image}) => {
  return (
    <div class="col-lg-4 col-sm-12 col-md-12">
      <div class="card">
        <img
          class="card-img-top"
          src={image}
          rel="nofollow"
          alt="Card image cap"
        />
        <div class="card-body">
          <h4 class="card-title">Card title</h4>
          <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
          <p class="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <a href="javascript:;" class="card-link">
            Card link
          </a>
          <a href="javascript:;" class="card-link">
            Another link
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
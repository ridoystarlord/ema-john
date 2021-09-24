import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./Product.css";
import Rating from "react-rating";

const Product = (props) => {
  const { name, img, price, stock, seller, star } = props.product;
  return (
    <div className="single-product-container">
      <div>
        <img src={img} alt="" />
      </div>
      <div>
        <h4 className="product-name">{name}</h4>
        <p>By {seller}</p>
        <p>Price: {price}</p>
        <p>
          <small>only {stock} left in stock - order soon</small>
        </p>
        <p>
          <Rating
            initialRating={star}
            readonly
            emptySymbol="far fa-star"
            fullSymbol="fas fa-star"
          />
        </p>
        <button
          onClick={() => props.handleAddtocart(props.product)}
          className="purchase-button"
        >
          <FontAwesomeIcon icon={faShoppingCart} /> add to cart
        </button>
      </div>
    </div>
  );
};

export default Product;

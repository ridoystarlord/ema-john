import React, { useEffect, useState } from "react";
import { addToDb, getStoredCart } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [displayProduct, setDisplayProduct] = useState([]);
  useEffect(() => {
    fetch("./products.JSON")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setDisplayProduct(data);
      });
  }, []);

  const handleAddtocart = (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    addToDb(product.key);
  };

  useEffect(() => {
    const saveCart = getStoredCart();
    const storedCart = [];
    if (products.length) {
      for (const key in saveCart) {
        const addedProduct = products.find((product) => product.key === key);
        if (addedProduct) {
          const quantity = saveCart[key];
          addedProduct.quantity = quantity;
          storedCart.push(addedProduct);
        }
      }
      setCart(storedCart);
    }
  }, [products]);

  const getSearchText = (event) => {
    const searchText = event.target.value;
    const matchedProduct = products.filter((filterProduct) =>
      filterProduct.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setDisplayProduct(matchedProduct);
  };

  return (
    <div>
      <div className="search-container">
        <input
          onChange={getSearchText}
          type="text"
          name=""
          id=""
          placeholder="Search Product"
        />
      </div>
      <div className="shop-container">
        <div className="product-container">
          {displayProduct.map((product) => (
            <Product
              key={product.key}
              product={product}
              handleAddtocart={handleAddtocart}
            ></Product>
          ))}
        </div>
        <div className="cart-container">
          <Cart cart={cart}></Cart>
        </div>
      </div>
    </div>
  );
};

export default Shop;

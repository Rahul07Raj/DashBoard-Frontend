import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import FontAwesomeIcon from "@fortawesome/fontawesome-svg-core"
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("https://e-dashboard-backend.onrender.com/products", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setProducts(result);
  };

  const deleteProduct = async (id) => {
    let result = await fetch(`https://e-dashboard-backend.onrender.com/product/${id}`, {
      method: "Delete",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    if (result) {
      // alert("record is delete")
      getProducts();
    }
  };

  const searchHandle = async (search) => {
    // setSearchInput(e.target.value)
    if (search) {
      let result = await fetch(`https://e-dashboard-backend.onrender.com/search/${search}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      if (result) {
        //  getProducts();
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };

  return (
    <>
      <div className="ProductList mt-3 d-flex justify-content-center align-items-center flex-column">
        <h3>Product List</h3>
        <input
          type="text"
          className="mt-3 search-product-box"
          placeholder="Search Product"
          style={{ padding: "20px" }}
          onChange={(e) => {
            // setSearchInput(e.target.value);
            searchHandle(e.target.value);
          }}
        />
        <div className=" mt-3 ProductList">
          <ul>
            <li>S. No.</li>
            <li>Name</li>
            <li>Company</li>
            <li>Price</li>
            <li>Category</li>
            <li>Operation</li>
            <hr />
          </ul>
        </div>
        <div
          className="ProductList overflow-auto"
          style={{ height: "53vh", marginLeft: "2rem" }}
        >
          {products.length > 0 ? (
            products.map((item, index) => (
              <ul key={item._id}>
                <li>{index + 1}</li>
                <li>{item.name}</li>
                <li>{item.company}</li>
                <li>${item.price}</li>
                <li>{item.category}</li>
                <li style={{ color: "gray" }}>
                  <MdDelete
                    style={{ height: "2rem", width: "2rem" }}
                    onClick={() => {
                      deleteProduct(item._id);
                    }}
                  />
                  <Link to={"/update/" + item._id}>
                    <AiFillEdit
                      style={{
                        color: "gray",
                        width: "20px",
                        height: "20px",
                        marginLeft: "10px",
                      }}
                    />
                  </Link>
                </li>
                <hr />
              </ul>
            ))
          ) : (
            <h1>No Product Found</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductList;

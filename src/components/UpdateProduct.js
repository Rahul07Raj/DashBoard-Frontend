import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const params = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    updateProductDetails();
  }, []);

  const updateProductDetails = async () => {
    console.log(params);
    let result = await fetch(
      `https://e-dashboard-backend.onrender.com/product/${params.id}`,
      {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };

  const handleUpdateProduct = async () => {
    console.log({ name, price, category, company });
    let result = await fetch(
      `https://e-dashboard-backend.onrender.com/product/${params.id}`,
      {
        method: "Put",
        body: JSON.stringify({ name, price, category, company }),
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    result = await result.json();
    console.log(result);
    navigate("/");
  };

  return (
    <div className=" container  d-flex mt-4 flex-column justify-content-center align-items-center">
      <h1>Update Product</h1>
      <div className="container  mt-2 w-50">
        <div class="form-group  mb-3 ">
          <label for="exampleInputText">Name</label>
          <input
            type="text"
            class="form-control mt-2 border-primary"
            id="exampleInputText"
            aria-describedby="textHelp"
            placeholder="Enter Product Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
          />
          {error && !name ? (
            <span class=" text-danger bg-red">Please enter valid name.</span>
          ) : (
            ""
          )}
        </div>
        <div class="form-group mb-3">
          <label for="exampleInputText">Price</label>
          <input
            type="number"
            class="form-control mt-2 border-primary"
            id="exampleInput"
            placeholder="Enter Product Price"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            value={price}
          />
          {error && !price ? (
            <span class=" text-danger bg-red">Please enter valid price.</span>
          ) : (
            ""
          )}
        </div>
        <div class="form-group mb-3">
          <label for="exampleInputText">Category</label>
          <input
            type="text"
            class="form-control mt-2 border-primary"
            id="exampleInput"
            placeholder="Enter Product Category"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            value={category}
          />
          {error && !category ? (
            <span class=" text-danger bg-red">
              Please enter valid category.
            </span>
          ) : (
            ""
          )}
        </div>
        <div class="form-group mb-3">
          <label for="exampleInputText">Company</label>
          <input
            type="text"
            class="form-control mt-2 border-primary"
            id="exampleInput"
            placeholder="Enter Product Company"
            onChange={(e) => {
              setCompany(e.target.value);
            }}
            value={company}
          />
          {error && !company ? (
            <span class=" text-danger bg-red">Please enter valid company.</span>
          ) : (
            ""
          )}
        </div>
        <button
          type="button"
          class="btn mt-4"
          style={{ backgroundColor: "skyblue" }}
          onClick={() => {
            handleUpdateProduct();
          }}
        >
          Update Product
        </button>
      </div>
    </div>
  );
};

export default UpdateProduct;

import React, { Fragment } from 'react';
import Card from '../UI/Card';
import classes from './Addproduct.module.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { recentActions } from '../Store/store';

function Addproduct(props) {

  const productList = useSelector(state => state.product.productlist);
  let productItem = productList.find(item => item.id === props.productId);
  let dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [image, setImage] = useState();
  const [isActive, setIsActive] = useState("");
  const [success, setSuccess] = useState(null);

  const requestData = {
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    method: "GET",
  };

  let categoryFetched = [];

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch(
        "http://localhost:8080/ecommerce/categories",
        requestData
      );
      const data = await response.json();

      categoryFetched = data.map((categoryData) => {
        return {
          id: categoryData.categoryId,
          title: categoryData.title,
          description: categoryData.description,
        };
      });

      setCategories(categoryFetched);
      console.log(categoryFetched);
    }
    fetchCategories();
    if (props.productId) {
      setTitle(productItem.title);
      setDescription(productItem.description);
      setPrice(productItem.price);
      setStock(productItem.stock);
      setCategoryId(productItem.categoryId);
      setIsActive(productItem.isActive);
      setImage(productItem.image);
    }
  }, []);

  async function addProductHandler(event) {
    event.preventDefault();

    if (title.trim().length === 0) {
      setError(" Required(*) Entries should not be empty");
      setSuccess(null);
      return;
    }
    else if (isNaN(price)) {
      console.log("entered");
      setError("Price should be a valid number");
      setSuccess(null);
      return;
    }
    else if (isNaN(stock)) {
      setError("Stock should be a valid number");
      setSuccess(null);
      return;
    }
    else {
      setError(null);
    }

    if (props.productId) {
      try {
        let response = await fetch(
          "http://localhost:8080/ecommerce/updateProduct?productId=" + `${props.productId}` + '&categoryId=' + `${categoryId}` + '&title=' + `${title}` + '&description=' + `${description}` + '&price=' + `${price}` + '&stock=' + `${stock}` + '&active=' + `${isActive}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        setSuccess("Product updated successfully");
        dispatch(recentActions.addRecentUpdated({
          productId: props.productId,
          title: title,
          price: price,
          stock: stock,
          image: image
        }));
        setError(null);
      } catch (error) {

      }
    }
    else {

      if (
        title.trim().length === 0 ||
        price.trim().length === 0 ||
        stock.trim().length === 0 ||
        categoryId.trim().length === 0
      ) {
        setError(" Required(*) Entries should not be empty");
        setSuccess(null);
        return;
      }
      else {
        setError(null);
      }

      const formData = new FormData();

      formData.append('file', image);
      formData.append('pname', title);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('quantity', stock);
      formData.append('categoryid', categoryId);
      formData.append('active', isActive);

      const sendData = {
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        method: "POST",
        body: formData,
      };

      try {
        const response = await fetch(
          "http://localhost:8080/ecommerce/addP", sendData
        );

        const data = await response.json();

        if (!response.ok) {
          setError("Product already exists");
          setSuccess(null);
        } else {
          setError(null);
          setSuccess("Product saved successfully");
          dispatch(recentActions.addRecentAdded({
            productId: data.productId,
            title: data.title,
            price: data.price,
            stock: data.stock,
            image: data.image
          }));

          props.reload();
        }
      } catch (error) {
      }
      setTitle("");
      setDescription("");
      setPrice("");
      setStock("");
      setCategoryId("");
      setIsActive(true);
    }

  }


  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };

  const priceChangeHandler = (event) => {
    setPrice(event.target.value);
  };

  const stockChangeHandler = (event) => {
    setStock(event.target.value);
  };

  const categoryIdChangeHandler = (event) => {
    setCategoryId(event.target.value);
  };

  const imageChangeHandler = (event) => {
    setImage(event.target.files[0]);
  }

  let butstyle = { backgroundColor: "transparent", borderStyle: "solid", borderRadius: "10px", borderColor: "rgba(40, 30, 94, 0.932)", color: "rgba(40, 30, 94, 0.932)" };

  return (
    <div>
      <div className={classes.backdrop} onClick={props.clickHandle} />
      <Card className={classes.modal}>
        <br />
        <div style={{ textAlign: "center" }}>
          <h3 style={{ color: "#4f005f", textAlign: "center" }}>
            Product Details
            <button onClick={props.clickHandle} class="bi bi-x-circle-fill" style={{ fontSize: "20px", borderStyle: "none", backgroundColor: "transparent", float: "right" }}>
            </button>
          </h3>
        </div>

        <hr style={{ borderTop: "2px solid black" }} />

        <form onSubmit={addProductHandler}>
          {error && <p style={{ color: "red", paddingLeft: "30px" }}>{error}</p>}
          {success && <p style={{ color: "blue", paddingLeft: "30px" }}>{success}</p>}

          <table class="table table-borderless">

            <tbody>
              <tr>
                <th scope="row" style={{ paddingLeft: "20px" }}> Name <span style={{ color: "red" }}>*</span>  </th>
                <td >
                  <input style={{ borderColor: "black" }} type="text" value={title} onChange={titleChangeHandler} />
                </td>
              </tr>
              <tr>
                <th scope="row" style={{ paddingLeft: "20px" }}> Description </th>
                <td>
                  <textarea
                    rows="2"
                    cols="23"
                    style={{ borderColor: "black", borderWidth: "2px" }}
                    value={description}
                    onChange={descriptionChangeHandler}
                  />
                </td>
              </tr>
              <tr>
                <th scope="row" style={{ paddingLeft: "20px" }}> Price<span style={{ color: "red" }}>*</span> </th>
                <td>
                  <input style={{ borderColor: "black" }} type="text" value={price} onChange={priceChangeHandler} />

                </td>
              </tr>
              <tr>
                <th scope="row" style={{ paddingLeft: "20px" }}> Stock Available<span style={{ color: "red" }}>*</span> </th>
                <td>
                  <input style={{ borderColor: "black" }} type="text" value={stock} onChange={stockChangeHandler} />

                </td>
              </tr>
              <tr>
                <th scope="row" style={{ paddingLeft: "20px" }}> Product Active<span style={{ color: "red" }}>*</span> </th>
                <td>
                  <div style={{ display: "inline" }} value={isActive} onChange={(e) => { setIsActive(e.target.value) }}>
                    {/* <span style={{paddingLeft:"30px"}}></span> */}
                    <input key={true} type="radio" value={true} name="active" />
                    <label>true</label>
                    <span style={{ paddingLeft: "10px" }} />
                    <input key={false} type="radio" value={false} name="active" />
                    <label>false</label>

                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row" style={{ paddingLeft: "20px" }}> Category<span style={{ color: "red" }}>*</span> </th>
                <td>
                  <select style={{ borderColor: "black", width:"65%", borderWidth:"2px" }} value={categoryId} onChange={categoryIdChangeHandler}>
                    <option style={{ borderColor: "black" }} value="">None</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>{category.title}</option>
                    ))}
                  </select>
                </td>
              </tr>
              {!(props.productId) && <tr>
                <th scope="row" style={{ paddingLeft: "20px" }}> Upload Image<span style={{ color: "red" }}>*</span> </th>
                <td>
                  <input type="file" onChange={imageChangeHandler} />
                </td>
              </tr>}
            </tbody>
          </table>


          {/* <label style={{ paddingLeft: "30px", paddingRight: "76px" }}>Name <span style={{ color: "red" }}>*</span></label>
          <input style={{ borderColor: "black" }} type="text" value={title} onChange={titleChangeHandler} />

          <br></br>
          <br></br>

          <label style={{ paddingLeft: "30px", paddingRight: "55px" }}>Description</label>
          <input
            style={{ borderColor: "black" }}
            type="text"
            value={description}
            onChange={descriptionChangeHandler}
          />

          <br></br>
          <br></br>

          <label style={{ paddingLeft: "30px", paddingRight: "87px" }}>Price<span style={{ color: "red" }}>*</span></label>
          <input style={{ borderColor: "black" }} type="text" value={price} onChange={priceChangeHandler} />
          <br></br>
          <br></br>

          <label style={{ paddingLeft: "30px", paddingRight: "29px" }}>Stock Available<span style={{ color: "red" }}>*</span></label>
          <input style={{ borderColor: "black" }} type="text" value={stock} onChange={stockChangeHandler} />
          <br></br>
          <br></br>

          <label style={{ paddingLeft: "30px", paddingRight: "33px" }}>Product Active<span style={{ color: "red" }}>*</span></label>
          <div style={{ display: "inline" }} value={isActive} onChange={(e) => { setIsActive(e.target.value) }}>

            <input key={true} type="radio" value={true} name="active" />
            <label>true</label>
            <span style={{ paddingLeft: "10px" }} />
            <input key={false} type="radio" value={false} name="active" />
            <label>false</label>

          </div>
          <br></br>
          <br></br>


          <label style={{ paddingLeft: "30px", paddingRight: "17px" }}>Choose Category<span style={{ color: "red" }}>*</span></label>
          <select style={{ borderColor: "black" }} value={categoryId} onChange={categoryIdChangeHandler}>
            <option style={{ borderColor: "black" }} value="">None</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.title}</option>
            ))}
          </select>
          <br></br>
          <br></br>


          {!(props.productId) && <Fragment>
            <label style={{ paddingLeft: "30px", paddingRight: "36px" }}><span style={{ color: "red" }}>*</span>Upload Image</label>
            <input type="file" onChange={imageChangeHandler} />
            <br></br>
            <br></br>
          </Fragment>
          } */}


          <hr style={{ borderTop: "2px solid black" }} />
          <div style={{ textAlign: "center" }}>
            <button style={butstyle} type="submit">Save Product</button>
          </div>
          <br />
        </form>

      </Card>
    </div>
  );

}

export default Addproduct;
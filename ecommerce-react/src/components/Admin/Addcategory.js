import React, { useState } from "react";
import Card from '../UI/Card';
import classes from "./Addcategory.module.css";

const AddCategory = (props) => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState();
  const [success, setSuccess] = useState(null);

  async function addCategoryHandler(event) {
    event.preventDefault();

    if (title.trim().length === 0) {
      setError("Title should not be empty");
      setSuccess(null);
      return;
    }

    const requestData = {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        title: title,
        description: description,
      }),
    };

    try {
      const response = await fetch(
        "http://localhost:8080/ecommerce/categories",
        requestData
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error();
      } else {
        console.log(data);
        setSuccess("Category Added Successfully");
        setError(null);
        props.reload();
      }

    } catch (error) {
      setError("Category Already exists");
      setSuccess(null);
    }


    setTitle("");
    setDescription("");
  }

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };

  //const classCardName = `${classes.input} ${classes.modal}`;
  let butstyle = { backgroundColor: "transparent", borderStyle: "solid", borderRadius: "10px", borderColor: "rgba(40, 30, 94, 0.932)", color: "rgba(40, 30, 94, 0.932)" };

  return (
    <div>
      <div className={classes.backdrop} onClick={props.clickHandle} />
      <Card className={classes.modal} >
        <br />
        <div style={{ textAlign: "center" }}>
          <h3 style={{ color: "#4f005f", textAlign: "center" }}>
            New Category
            <button onClick={props.clickHandle} class="bi bi-x-circle-fill" style={{ fontSize: "20px", borderStyle: "none", backgroundColor: "transparent", float: "right" }}>
            </button>
          </h3>
        </div>
        <hr style={{ borderStyle: "515px solid" }} />

        {success && <p style={{ color: "blue", paddingLeft:"20px" }}>{success}</p>}

        {error && <p style={{ color: "red", paddingLeft:"20px"  }}>*{error}</p>}
        <form onSubmit={addCategoryHandler}>

          <table class="table table-borderless">
            <tbody>
              <tr>
                <th scope="row" style={{paddingLeft:"20px"}}>Title<span style={{ color: "red" }}>*</span></th>
                <td><input
                  style={{ borderColor: "black" }}
                  type="text" value={title}
                  onChange={titleChangeHandler} />
                </td>
              </tr>
              <tr>
                <th scope="row" style={{paddingLeft:"20px"}}>Description</th>
                <td><textarea 
                  rows="2"
                  cols="23"
                  style={{ borderColor: "black", borderWidth:"2px" }}
                  value={description}
                  onChange={descriptionChangeHandler}
                />
                </td>
              </tr>
            </tbody>
          </table>
          
          <hr style={{ borderStyle: "515px solid" }} />
          <div style={{ textAlign: "center" }}>
            <button style={butstyle} type="submit"><i>+Add Category</i></button>
          </div><br />
          <br />
        </form>
      </Card>
    </div>
  );
};

export default AddCategory;
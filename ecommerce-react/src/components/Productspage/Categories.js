import React, {Fragment, useEffect, useState} from 'react';
import Categoryitem from './Categoryitem';
import classes from './Categories.module.css';

function Categories(props) {

    const [categories, setCategories] = useState([]);

    const requestbody = {
        method : 'GET',
        mode: "cors",
        headers: {
  
          "Access-Control-Allow-Origin": "*",
  
          "Content-Type": "application/json" 
  
        }        
    }


    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:8080/ecommerce/categories', requestbody) ;
            const data = await response.json();
    
            const categorieslist = data.map((item) => {
                return {
                    id : item.categoryId,
                    title : item.title,
                    description : item.description
                }
            });
            //console.log(categorieslist);
            setCategories(categorieslist);
        }

        fetchData();

    }, [props.load]);

    const handleClick = (id) => e => {props.setId(id); props.setShowProducts(true); };

    return ( 
        <Fragment>
            <br />
            <ul className={classes.example} style={{backgroundColor:"rgba(40, 30, 94, 0.932)", position:"fixed"}}>
                
                <Categoryitem handleClick={handleClick(null)} title={"All Categories"} description={" Shows all categories "} />
                {categories.map((category) => (
                    <Fragment>
                        <Categoryitem key={category.id} handleClick={handleClick(category.id)} title={category.title} description={category.description} />
                    </Fragment>
                ))}
    
            </ul>    
        </Fragment>
    );

}



export default Categories;
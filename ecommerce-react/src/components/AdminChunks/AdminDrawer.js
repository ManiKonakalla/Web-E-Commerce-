import React, { Fragment, useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import './AdminDrawer.module.css';


const drawerWidth = 140;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor:"rgba(40, 30, 94, 0.932)",
        marginTop : "50px"
    },
    drawerContainer: {
        overflow: 'auto',
        backgroundColor: 'white',
    },
    list: {
        backgroundColor: "rgba(40, 30, 94, 0.932)",
        fontSize: "10px",
        color : "white"
    },
}));


function AdminDrawer(props) {

    const classes = useStyles();
    const [categories, setCategories] = useState(false);
    const [categoryList, setCategoryList] = useState([]);


    const showCategories = () => {
        setCategories(true);
    }

    const closeMenu = (id) => {
        setCategories(false);
        props.setId(id);
        props.showProductsHandler();
    }

    const allProductsHandler = () => {
        props.setId(null);
        props.showProductsHandler();
    }

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
            // console.log(categorieslist);
            setCategoryList(categorieslist);
            //categorylist = categorieslist;
        }

        fetchData();

    }, [props.load]);

    return (
        <Fragment >
            <Drawer
                className={classes.drawer}
                variant="persistent"
                open="false"
                anchor="left"
                classes={{
                    paper: classes.drawerPaper,
                }}
                
            >
                
                <div className={classes.drawerContainer}>
                    <List className={classes.list}>

                        <ListItem button key="Dashboard" onClick={props.showDashboardHandler}>
                            <ListItemText primary="Dashboard" />
                        </ListItem>



                        <ListItem button aria-controls="simple-menu" aria-haspopup="true" onClick={showCategories} key="Categories">
                            <ListItemText primary="Categories" />
                        </ListItem>
                        
                            <div style={{backgroundColor:"white"}} >

                            <Menu
                                id="simple-menu"
                                anchorEl={categories}
                                keepMounted
                                open={categories}
                                onClose={closeMenu}                                
                            >
                                {
                                    categoryList && categoryList.map( (category)=> (
                                        <Fragment>
                                            <MenuItem style={{backgroundColor:"white"}} key={category.id} onClick={() => {closeMenu(category.id)}}>{category.title}</MenuItem><br />
                                        </Fragment>
                                    ))
                                }
                            </Menu>
                            </div>


                        <ListItem button key="Products" onClick={allProductsHandler}>
                            <ListItemText primary="Products" />
                        </ListItem>

                        <ListItem button key="Add Category" onClick={props.clickCategoryHandler}>
                            <ListItemText primary="Add Category" />
                        </ListItem>

                        <ListItem button key="Add Product" onClick={props.clickProductHandler}>
                            <ListItemText primary="Add Product" />
                        </ListItem>

                        <ListItem button key="View Orders" onClick={props.showOrderHandler}>
                            <ListItemText primary="View Orders" />
                        </ListItem>



                    </List>
                </div>
            </Drawer>
        </Fragment>
    );
}

export default AdminDrawer;
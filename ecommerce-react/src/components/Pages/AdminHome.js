import React, { Fragment, useEffect, useState } from "react";
import AdminHeader from "../AdminChunks/AdminHeader";




import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import AdminDrawer from "../AdminChunks/AdminDrawer";
import ShowProducts from "../AdminChunks/ShowProducts";
import Addproduct from "../Admin/Addproduct";
import DeleteProduct from "../Productspage/DeleteProduct";
import AddCategory from "../Admin/Addcategory";
import Adminordertable from "../Admin/Adminordertable";
import Dashboard from "../AdminChunks/Dashboard";
import Profilepage from "./Profilepage";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));


function AdminHome() {

    const classes = useStyles();

    const [headName, setHeadName] = useState("Products");
    const [drawer, setDrawer] = useState(false);
    const [id, setId] = useState("");


    const [productmodal, setProductmodal] = useState(false);
    const [categorymodal, setCategorymodal] = useState(false);
    const [load, setLoad] = useState(true);
    const [loadp, setLoadp] = useState(true);
    const [cartload, setCartload] = useState(true);
    const [ editProduct, setEditProduct ] = useState(false);
    const [deleteProduct, setDeleteProduct] = useState(false);
    const [editProductId, setEditProductId] = useState(null);
    const [deleteProductId, setDeleteProductId] = useState(null);
    const [orderslist, setOrderslist] = useState(null);
    
    const [loadOrder, setLoadOrder] = useState(false) ;

    const [showOrder, setShowOrder] = useState(false);
    const [showProducts, setShowProducts] = useState(true);
    const [showDashboard, setShowDashboard] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    
    const pid = null;
    

    const productmodalHandler = () => {
        setProductmodal(!productmodal);
        setLoadp(!loadp);
    }

    const categorymodalHandler = () => {
        setCategorymodal(!categorymodal);
        setLoad(!load);
    }

    const editProductHandler = () => {
        setEditProduct(!editProduct) ;
        setLoadp(!loadp);
    }

    const reload = () => {
       setLoad(!true);
    }

    const reloadp = () => {
        setLoadp(!loadp);
    }

    const deleteProductHandler = () => {
        setDeleteProduct(!deleteProduct);
    }

    const drawerToggle = () => {
        setDrawer(!drawer);
    }

    const getorder = async () => {

        const response = await fetch('http://localhost:8080/ecommerce/orders', {
                method : 'GET',
                headers : {
                    'Content-Type' : 'application/json'
                }
        });
        
        const data = await response.json();
        if( response.ok ) {
            console.log(data) ; 
            setOrderslist(data);
        }
        else {}
    }

    useEffect( () => {
        getorder();
        console.log("orders fetched");
    } ,[loadOrder, showOrder, showDashboard] ) ; 

    const loadHandler = () => {
        setLoadOrder(!loadOrder);
    }

    const showOrderHandler = () => {
        setShowOrder(true);
        setShowProducts(false);
        setShowDashboard(false);
        setShowProfile(false);
        setHeadName("Orders");
    }

    const showProductsHandler = () => {
        setShowOrder(false) ;
        setShowProducts(true);
        setShowDashboard(false);
        setShowProfile(false);
        setHeadName("Products");
    }

    const showDashboardHandler = () => {
        setShowOrder(false) ;
        setShowProducts(false);
        setShowDashboard(true);
        setShowProfile(false);
        setHeadName("Dashboard");
    }

    const showProfileHandler = () => {
        setShowOrder(false) ;
        setShowProducts(false);
        setShowDashboard(false);
        setShowProfile(true);
        setHeadName("Profile");
    }

    return (
        <Fragment>
            <div className={classes.root}>
                <CssBaseline />

                <AdminHeader headName={headName} setDrawer={setDrawer} showProfileHandler={showProfileHandler}/>

                <AdminDrawer 
                    setId={setId} 
                    clickCategoryHandler={setCategorymodal} 
                    clickProductHandler={setProductmodal}
                    showOrderHandler={showOrderHandler}
                    showProductsHandler={showProductsHandler}
                    showDashboardHandler={showDashboardHandler}
                    setShowOrder={setShowOrder}
                    load={load}
                    drawer={drawer} 
                    setDrawer={setDrawer} />

                <div >
                    { productmodal && <Addproduct productId={pid} clickHandle={productmodalHandler} reload={reloadp} /> }
                    { categorymodal && <AddCategory clickHandle={categorymodalHandler} reload={reload}/>}
                    { editProduct && < Addproduct productId={editProductId} clickHandle={editProductHandler} reload={reloadp} /> }
                    { deleteProduct && <DeleteProduct productId={deleteProductId} clickHandle={deleteProductHandler} value="product" reload={reloadp}/> }
                </div>

                <main className={classes.content}>
                    <Toolbar />
                    {
                        showOrder && <Adminordertable orderslist={orderslist} loadHandler={loadHandler} />
                    }
                    {
                        showProducts && <ShowProducts 
                                            id={id} 
                                            load={loadp} 
                                            cartload={cartload} 
                                            editProductHandler={editProductHandler} 
                                            deleteProductHandler={deleteProductHandler} 
                                            deleteProductIdHandler={setDeleteProductId} 
                                            editProductIdHandler={setEditProductId}/>
                    }
                    {
                        showDashboard && <Dashboard orderList={orderslist}/>
                    }
                    {
                        showProfile && <Profilepage />
                    }
                </main>
            </div>


        </Fragment>
    );

}

export default AdminHome;
import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

const initialCartState = { cartlist : [], totalQuantity : 0, totalAmount : 0, cartOrderList : [] };
const initialAddressState = { addresslist : [] } ;
const initialProductState = { productlist : [] }

const initialAuthToken = localStorage.getItem('token');
const initialAuthState = { isAuthenticated : false, isGoogleLogin : false } ;

const userToken = {
    userId : localStorage.getItem('userId'),
    role : localStorage.getItem('role'),
    username : localStorage.getItem('username')
};
//const initialUserState = { userId : userToken.userId, role : userToken.role, username : userToken.username } ;
const initialUserState = { userId : 0, role : null, username : null } ;

const initialRecentState = { recentlyAdded : [], recentlyUpdated : [] } ;


const cartSlice = createSlice({
    name : 'cart',
    initialState : initialCartState,
    reducers : {
        addcartitems(state, action) {
            state.cartlist = action.payload ;
            state.totalQuantity = 0;
            state.totalAmount = 0;
            for( let i=0; i<state.cartlist.length; i++ ) {
                state.totalQuantity = state.totalQuantity+state.cartlist[i].quantity;
                state.totalAmount = state.totalAmount+(state.cartlist[i].quantity*state.cartlist[i].price);
            }
        },
        additemtocart( state, action ) {
            const existingItem = state.cartlist.find( (item) => item.productId === action.payload.productId );
            if( !existingItem ) {
                state.cartlist.push({
                    id : action.payload.id,
                    userId : action.payload.userId,
                    productId : action.payload.productId,
                    quantity : action.payload.quantity,
                    price : action.payload.price
                });
            }
            else {
                existingItem.quantity++;
            }
            state.totalQuantity = state.totalQuantity+1 ;
            state.totalAmount = state.totalAmount+action.payload.price;        
        },
        removeitemfromcart( state, action ) {
            const id = action.payload.productId;
            const existingItem = state.cartlist.find(item => item.productId === id ) ;
            if( action.payload.status === 0 || existingItem.quantity === 1 ) {
                state.cartlist = state.cartlist.filter( item => item.productId !== id );
            }
            else {
                existingItem.quantity-- ;
            }
            
            if(action.payload.status === 0) {
                state.totalQuantity = state.totalQuantity-existingItem.quantity;
                state.totalAmount = state.totalAmount-(existingItem.quantity*existingItem.price);
            }
            else {
                state.totalQuantity = state.totalQuantity-1 ;
                state.totalAmount = state.totalAmount-existingItem.price;
            }
        },
        emptycart( state ) {
            state.cartlist = [];
            state.totalAmount = 0;
            state.totalQuantity = 0;
        },
        orderEffectCart( state, action ) {
            state.cartOrderList = action.payload;
        },
        emptyCartOrderList( state ) {
            state.cartOrderList = [];
        }
    }
}) ;

const authSlice = createSlice({
    name : 'auth',
    initialState : initialAuthState,
    reducers : {
        login(state, action) {
            state.isAuthenticated = true;
            state.isGoogleLogin = action.payload ;
            // localStorage.setItem('token', true);
        },
        logout(state) {
            state.isAuthenticated = false;
            state.isGoogleLogin = false;
            // localStorage.removeItem('token');
            // localStorage.removeItem('userId');
            // localStorage.removeItem('role');
            // localStorage.removeItem('username');
        }
    }
});

const userSlice = createSlice({
    name : 'user',
    initialState : initialUserState,
    reducers : {
        setuserdetails( state, action ) {
            state.userId = action.payload.userid;
            state.role = action.payload.role;   
            state.username = action.payload.username;
            localStorage.setItem('userId', action.payload.userid);
            localStorage.setItem('role',action.payload.role);
            localStorage.setItem('username', action.payload.username);
        }
    }
});

const addressSlice = createSlice({
    name : 'address',
    initialState : initialAddressState,
    reducers : {
        setuseraddress( state, action ) {
            state.addresslist = action.payload;
        },
        adduseraddress( state, action ) {
            state.addresslist.push({
                addId : action.payload.addId,
                city : action.payload.city,
                hno : action.payload.hno,
                name : action.payload.name,
                pincode : action.payload.pincode,
                state : action.payload.state,
                street : action.payload.street,
                phonenumber : action.payload.phonenumber,
                addstring : action.payload.hno+" "+action.payload.street+" "+action.payload.city+" "+action.payload.state+" "+action.payload.pincode
            
            });
        }
    }
});

const productSlice = createSlice({
    name : 'product',
    initialState : initialProductState,
    reducers : {
        setProductlist( state, action ) {
            state.productlist = action.payload ;
        }
    }
});

const recentSlice = createSlice({
    name : 'recent',
    initialState : initialRecentState,
    reducers : {
        addRecentAdded( state, action ) {
            console.log(action.payload);
            state.recentlyAdded.push(action.payload);
        },
        addRecentUpdated( state, action ) {
            const existingItem = state.recentlyUpdated.find( (item) => item.productId === action.payload.productId );
            if( !existingItem ) {
                state.recentlyUpdated.push(action.payload);
            }   
            else {
                existingItem.title = action.payload.title;
                existingItem.price = action.payload.price;
                existingItem.stock = action.payload.stock;
                existingItem.image = action.payload.image;
            }         
        },
    }
});

const store = configureStore({
    reducer : { cart: cartSlice.reducer , auth: authSlice.reducer, user: userSlice.reducer, address: addressSlice.reducer, product: productSlice.reducer, recent: recentSlice.reducer}
}) ;


export const cartActions = cartSlice.actions;
export const authActions = authSlice.actions;
export const userActions = userSlice.actions;
export const addressActions = addressSlice.actions;
export const productActions = productSlice.actions;
export const recentActions = recentSlice.actions;

export default store;
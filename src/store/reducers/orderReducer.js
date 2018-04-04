import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const initialisePurchase = (state) => {
    return updateObject(state, {
        purchased: false
    });
};

const startBurgerPurchase = (state) => {
    return updateObject(state, {
        loading: true
    });
};

const purchaseBurgerSuccess = (state, action) =>{
    const newOrder = updateObject(action.orderData, {
        id: action.orderId
    });
    return updateObject(state, {
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true
    });
};

const purchaseBurgerFail = (state) => {
    return updateObject(state, {
        loading: false
    });
};

const fetchOrder = state => {
    return updateObject(state, {
        loading: true
    });
};

const fetchOrderSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        orders: action.orders
    });
};

const fetchOrderFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT: return initialisePurchase(state);
        case actionTypes.PURCHASE_BURGER_START: return startBurgerPurchase(state);
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state);
        case actionTypes.FETCH_ORDERS_START: return fetchOrder(state);
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrderSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAILED: return fetchOrderFail(state, action);
        default:
            return state;
    }
};

export default reducer
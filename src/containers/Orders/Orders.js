import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from '../../axios-orders';

import OrderItem from './OrderItem/OrderItem';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import * as actions from '../../store/actions/index';

import styles from './Orders.css';

class Orders extends Component {

    componentDidMount() {
        this.props.onfetchOrders(this.props.token, this.props.userId);
    }


    render() {
        let order = (
            <div>
                <h1>You have no orders at this time</h1>
            </div>
        );

        if (this.props.orders.length > 0) {
            order = this.props.orders.map(order => (
                <OrderItem key={order.id} order={order}/>
            ))
        }

        return (
            <div className={styles.Orders}>
                <h1>My Orders</h1>
                <br/>
                {this.props.loading ? <Spinner/> : order}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onfetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(Orders, axios));

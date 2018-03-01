import React, {Component} from 'react';
import axios from '../../axios-orders';

import OrderItem from './OrderItem/OrderItem';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

import styles from './Orders.css';

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    };

    componentDidMount() {
        axios.get("/orders.json")
            .then(response => {
                const fetchedOrders = [];
                const data = response.data;
                for (let key in data) {
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    })
                }
                this.setState({orders: fetchedOrders, loading: false})
            })
            .catch(err => {
                this.setState({loading: false})
            })
    }


    render() {
        let order = (
            <div>
                <h1>You have no orders at this time</h1>
            </div>
        );

        if (this.state.orders.length > 0) {
            order = this.state.orders.map(order => (
                <OrderItem key={order.id} order={order}/>
            ))
        }

        return (
            <div className={styles.Orders}>
                <h1>My Orders</h1>
                <br/>
                {this.state.loading ? <Spinner/> : order}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);

import React, {Component} from 'react';
import {Route} from 'react-router';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    state = {
        ingredients: null,
        price: 0
    };

    componentDidMount() {
        const queryJson = this.queryStringToJsonGenerator(this.props.location.search);
        const price = queryJson["price"];
        delete queryJson["price"];
        this.setState({ingredients: queryJson, price: price});

    }

    checkoutCancelledHandler = () => {
        this.props.history.push('/');
    };

    checkoutProceededHandler = () => {
        this.props.history.replace('/checkout/contact');
        let proceedBtn = document.getElementById("proceedCheckoutBtn");
        proceedBtn.style.display = "none";
    };

    queryStringToJsonGenerator = queryString => {
        let pairs = queryString.slice(1).split('&');

        let result = {};
        pairs.forEach(function (pair) {
            pair = pair.split('=');
            result[pair[0]] = parseFloat(decodeURIComponent(pair[1] || '0'));
        });

        return JSON.parse(JSON.stringify(result));
    };

    render() {
        let checkoutSummary = <p>You have not yet built you burger</p>;
        if (this.state.ingredients) {
            checkoutSummary = (
                <div>
                    <CheckoutSummary
                        onCheckoutCancelled={this.checkoutCancelledHandler}
                        ingredients={this.state.ingredients}
                        onCheckoutProceed={this.checkoutProceededHandler}
                        readyBtnId="proceedCheckoutBtn"

                    />
                    <Route
                        path={this.props.match.path + '/contact'}
                        render={(props) => (
                            <ContactData ingredients={this.state.ingredients} price={this.state.price} {...props} />
                        )} />
                </div>
            )
        }
        return checkoutSummary;
    }
}

export default Checkout
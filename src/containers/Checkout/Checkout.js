import React, {Component} from 'react';
import {Route, Redirect} from 'react-router';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.push('/');
    };

    checkoutProceededHandler = () => {
        this.props.history.replace('/checkout/contact');
        let proceedBtn = document.getElementById("proceedCheckoutBtn");
        proceedBtn.style.display = "none";
    };

    render() {
        let checkoutSummary = <Redirect to="/" />;
        if (this.props.ings) {
            const purcahsedRedirect = this.props.purchased ? <Redirect to="/"/> : null;
            checkoutSummary = (
                <div>
                    {purcahsedRedirect}
                    <CheckoutSummary
                        onCheckoutCancelled={this.checkoutCancelledHandler}
                        ingredients={this.props.ings}
                        onCheckoutProceed={this.checkoutProceededHandler}
                        readyBtnId="proceedCheckoutBtn"
                    />
                    <Route
                        path={this.props.match.path + '/contact'}
                        component={ContactData}
                    />
                </div>
            )
        }
        return checkoutSummary;
    }
}

const mapStateToProps = state => {
  return{
      ings: state.burger.ingredients,
      purchased: state.order.purchased
  }
};


export default connect(mapStateToProps)(Checkout)
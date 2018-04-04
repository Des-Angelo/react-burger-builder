import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

import {connect} from 'react-redux';
import * as burgerActionCreator from '../../store/actions/index';

import axios from '../../axios-orders';


export class BurgerBuilder extends Component {

    state = {
        ordering: false
    };

    componentDidMount() {
        this.props.onInitIngredients();
    }

    checkOrderState() {
        const ingredients = this.props.ings;
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            }).reduce((sum, el) => {
                return sum + el;
            }, 0);

       return sum > 0;
    }

    orderHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({ordering: true});
        }else{
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    };

    orderCancelHandler = () => {
        this.setState({ordering: false});
    };

    orderCheckoutHandler = () => {
        this.props.onPurchaseInit();
        this.props.history.push('/checkout');
    };

    render() {
        const disabledInfo = {
            ...this.props.ings
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.props.error ? <p style={{textAlign: 'center'}}>Ingredients can't be loaded!</p> : <Spinner/>;

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        authenticated={this.props.isAuthenticated}
                        ingredientAdded={this.props.onAddIngredient}
                        ingredientRemoved={this.props.onDeleteIngredient}
                        disabled={disabledInfo}
                        canOrder={this.checkOrderState()}
                        price={this.props.totalPrice}
                        showSummary={this.orderHandler}/>
                </Aux>
            );

            orderSummary = <OrderSummary ingredients={this.props.ings}
                                         totalPrice={this.props.totalPrice}
                                         checkoutCancelled={this.orderCancelHandler}
                                         checkOut={this.orderCheckoutHandler}/>
        }

        if (this.state.loading) {
            orderSummary = <Spinner/>
        }

        return (
            <Aux>
                {this.state.ordering}
                <Modal
                    show={this.state.ordering}
                    modalClosed={this.orderCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burger.ingredients,
        totalPrice: state.burger.totalPrice,
        error: state.burger.error,
        isAuthenticated: state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return{
        onAddIngredient: (ingredientName) => dispatch(burgerActionCreator.addIngredient(ingredientName)),
        onDeleteIngredient: (ingredientName) => dispatch(burgerActionCreator.removeIngredient(ingredientName)),
        onInitIngredients: () => dispatch(burgerActionCreator.initIngredients()),
        onPurchaseInit: () => dispatch(burgerActionCreator.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(burgerActionCreator.setAuthRedirectPath(path))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
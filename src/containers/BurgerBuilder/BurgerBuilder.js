import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        canOrder: false,
        ordering: false
    };

    checkOrderState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            }).reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState({canOrder: sum > 0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        this.checkOrderState(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        let updatedCount = oldCount;
        const priceSubtraction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        let newPrice = oldPrice;

        if (oldCount > 0) {
            updatedCount = oldCount - 1;
            newPrice = oldPrice - priceSubtraction;
        }

        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        this.checkOrderState(updatedIngredients)
    };

    orderHandler = () => {
        this.setState({ordering: true});
    };

    orderCancelHandler = () => {
        this.setState({ordering: false});
    };

    orderCheckoutHandler = () => {
        alert('Awesome! you checked out');
    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <Aux>
                {this.state.ordering}
                <Modal
                    show={this.state.ordering}
                    modalClosed={this.orderCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients}
                                  totalPrice={this.state.totalPrice}
                                  checkoutCancelled={this.orderCancelHandler}
                                  checkOut={this.orderCheckoutHandler}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    canOrder={this.state.canOrder}
                    price={this.state.totalPrice}
                    showSummary={this.orderHandler}/>

            </Aux>
        );
    }
}

export default BurgerBuilder;
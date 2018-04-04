import React, {Component} from 'react';
import axios from '../../../axios-orders';

import styles from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from './../../../hoc/WithErrorHandler/WithErrorHandler';
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';

import {updateObject, checkValidity, generateValidityMessage} from '../../../shared/utility';

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    rules: {
                        required: true
                    },
                    valid: false,
                    touched: false,
                    errorMessage: ''
                }
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
                validation: {
                    rules: {
                        required: true
                    },
                    valid: false,
                    touched: false,
                    errorMessage: ''
                }
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Zip Code'
                },
                value: '',
                validation: {
                    rules: {
                        required: true,
                        minLength: 5,
                        maxLength: 5,
                    },
                    valid: false,
                    touched: false,
                    errorMessage: ''
                }
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation: {
                    rules: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    errorMessage: ''
                }
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    rules: {
                        required: true,
                        isEmail: true
                    },
                    valid: false,
                    touched: false,
                    errorMessage: ''
                }
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: '0', displayValue: 'Select a delivery method', selected: true, disabled: true},
                        {value: '2', displayValue: '2 Hours'},
                        {value: '5', displayValue: '5 Hours'},
                        {value: '12', displayValue: 'Next Day'},

                    ]
                },
                validation: {
                    rules: {
                        invalidOption: '0',
                    },
                    valid: false,
                    touched: false,
                    errorMessage: ''
                }
            },
        },
        isValidForm: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const formData = {};
        for (let elementIdentifier in this.state.orderForm) {
            formData[elementIdentifier] = this.state.orderForm[elementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price.toFixed(2),
            orderData: formData,
            userId: this.props.userId
        };

        this.props.onOrderBurger(order, this.props.token);
    };

    inputChangeHandler = (event, element) => {

        const clonedElement = updateObject(this.state.orderForm[element], {
            value: event.target.value,
            validation: {
                ...this.state.orderForm[element].validation,
                valid: checkValidity(event.target.value, this.state.orderForm[element].validation.rules),
                errorMessage: generateValidityMessage(event.target.value, this.state.orderForm[element].validation.rules,
                    this.state.orderForm[element].validation.valid),
                touched: true
            }
        });
        const form = updateObject(this.state.orderForm, {
            [element]: clonedElement
        });

        let formValid = true;
        for (let property in form) {
            formValid = form[property].validation.valid && formValid;
        }

        this.setState({orderForm: form, isValidForm: formValid})
    };

    render() {
        const formElements = [];
        for (let key in this.state.orderForm) {
            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElements.map(el => (
                    <Input
                        key={el.id}
                        elementType={el.config.elementType}
                        elementConfig={el.config.elementConfig}
                        value={el.config.value}
                        invalid={!el.config.validation.valid}
                        touched={el.config.validation.touched}
                        errorMessage={el.config.validation.errorMessage}
                        change={(event) => this.inputChangeHandler(event, el.id)}/>
                ))}
                <Button buttonType="Success" clicked={this.orderHandler}
                        disabled={!this.state.isValidForm}>Order</Button>
            </form>
        );

        return (
            <div className={styles.ContactData}>
                <h4>Enter your contact data</h4>
                {this.props.loading ? <Spinner/> : form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burger.ingredients,
        price: state.burger.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))
import React, {Component} from 'react';
import axios from '../../../axios-orders';

import styles from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

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
                    rules:{
                        required: true
                    },
                    valid: false,
                    touched: false,
                    errorMessage:''
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
                    rules:{
                        required: true
                    },
                    valid: false,
                    touched: false,
                    errorMessage:''
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
                    rules:{
                        required: true,
                        minLength: 5,
                        maxLength: 5,
                    },
                    valid: false,
                    touched: false,
                    errorMessage:''
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
                    rules:{
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    errorMessage:''
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
                    rules:{
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    errorMessage:''
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
                    rules:{
                        invalidOption: '0',
                    },
                    valid: false,
                    touched: false,
                    errorMessage:''
                }
            },
        },
        isValidForm: false,
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const formData = {};
        for (let elementIdentifier in this.state.orderForm) {
            formData[elementIdentifier] = this.state.orderForm[elementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        };
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.replace("/");
            })
            .catch(error => {
                this.setState({loading: false});
            });
    };

    static checkValidity(value, rules){
        let isValid = true;


        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minlength){
            isValid = value.length >= rules.minlength && isValid;
        }

        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }

        if(rules.invalidOption){
            isValid = value.trim() !== rules.invalidOption && isValid;
        }

        return isValid;
    }

    static generateValidityMessage(value, rules, isValid){
        let errorMessage = '';

        if(rules.required && !isValid){
            errorMessage = "This field is required";
        }

        if(rules.minlength){
            errorMessage = `This field should have a minimum of ${rules.minlength} characters`;
        }

        if(rules.maxLength){
            errorMessage = `This field should have a maximum of ${rules.maxLength} characters`;
        }

        if(rules.invalidOption){
            errorMessage = "Please select a valid option";
        }

        return errorMessage;
    }



    inputChangeHandler = (event, element) => {
        const form = {
            ...this.state.orderForm
        };
        const clonedElement = {
            ...form[element]
        };

        clonedElement.value = event.target.value;
        clonedElement.validation.valid = ContactData.checkValidity(clonedElement.value, clonedElement.validation.rules);
        clonedElement.validation.errorMessage = ContactData.generateValidityMessage(clonedElement.value,
            clonedElement.validation.rules,
            clonedElement.validation.valid);
        clonedElement.validation.touched = true;
        form[element] = clonedElement;

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
                <Button buttonType="Success" clicked={this.orderHandler} disabled={!this.state.isValidForm}>Order</Button>
            </form>
        );

        return (
            <div className={styles.ContactData}>
                <h4>Enter your contact data</h4>
                {this.state.loading ? <Spinner/> : form}
            </div>
        )
    }
}

export default ContactData
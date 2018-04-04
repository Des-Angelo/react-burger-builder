import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {updateObject, checkValidity} from '../../shared/utility';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import styles from './Auth.css';

import * as actions from '../../store/actions/index';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
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
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    rules: {
                        required: true,
                        minLength: 6
                    },
                    valid: false,
                    touched: false,
                    errorMessage: ''
                }
            }
        },
        isSignUp: true
    };


    componentDidMount() {
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath()
        }
    }

    inputChangeHandler = (event, element) => {
        const form = updateObject(this.state.controls, {
            [element]: updateObject(this.state.controls[element], {
                value: event.target.value,
                validation: updateObject(this.state.controls[element].validation, {
                    valid: checkValidity(event.target.value, this.state.controls[element].validation.rules),
                    touched: true
                })
            })
        });

        this.setState({controls: form})
    };

    submitHandler = (event) => {
        event.preventDefault();
        const email = this.state.controls.email.value;
        const password = this.state.controls.password.value;
        this.props.onAuth(email, password, this.state.isSignUp);
    };

    switchAuthModeHandler = (event) => {
        event.preventDefault();
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            }
        })
    };

    render() {
        const formElements = [];
        for (let key in this.state.controls) {
            formElements.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElements.map(el => (
                <Input key={el.id}
                       elementType={el.config.elementType}
                       elementConfig={el.config.elementConfig}
                       value={el.config.value}
                       invalid={!el.config.validation.valid}
                       touched={el.config.validation.touched}
                       errorMessage={el.config.validation.errorMessage}
                       change={(event) => this.inputChangeHandler(event, el.id)}/>
            )
        );

        if (this.props.loading) {
            form = <Spinner/>;
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = <p style={{color: 'red'}}>{this.props.error.message}</p>
        }

        let redirect = null;
        if (this.props.isAuthenticated) {
            redirect = <Redirect to={this.props.authRedirectPath}/>
        }

        return (
            <div className={styles.Auth}>
                {redirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button buttonType="Success">Submit</Button>
                    <Button
                        clicked={this.switchAuthModeHandler}
                        buttonType="Danger">{this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burger.building,
        authRedirectPath: state.auth.authRedirectPath
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

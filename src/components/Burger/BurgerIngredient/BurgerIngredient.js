import React, {Component} from 'react';
import PropTypes from 'prop-types';

import burgerIngStyle from './BurgerIngredient.css';

class BurgerIngredient extends Component {
    render() {
        let ingredient = null;

        switch (this.props.type) {
            case('bread-bottom'):
                ingredient = <div className={burgerIngStyle.BreadBottom}></div>;
                break;
            case('bread-top'):
                ingredient = (
                    <div className={burgerIngStyle.BreadTop}>
                        <div className={burgerIngStyle.Seeds1}></div>
                        <div className={burgerIngStyle.Seeds2}></div>
                    </div>
                );
                break;
            case('meat'):
                ingredient = <div className={burgerIngStyle.Meat}></div>;
                break;
            case('cheese'):
                ingredient = <div className={burgerIngStyle.Cheese}></div>;
                break;
            case('salad'):
                ingredient = <div className={burgerIngStyle.Salad}></div>;
                break;
            case('bacon'):
                ingredient = <div className={burgerIngStyle.Bacon}></div>;
                break;
            default:
                ingredient = null;
                break;
        }

        return ingredient;
    }
}

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
};

export default BurgerIngredient;
import React from 'react';
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

import burgerStyle from './Burger.css';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(ing => {
           return [...Array(props.ingredients[ing])].map((_, i) => {
               return <BurgerIngredient key={ing + i} type={ing} />
           });
        }).reduce((arr, el) => {
            return arr.concat(el);
        }, []);

    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Start adding ingredients</p>;
    }
    return (
        <div className={burgerStyle.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;
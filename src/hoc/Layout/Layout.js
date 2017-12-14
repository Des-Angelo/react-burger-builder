import React, { Component } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/UI/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/UI/Navigation/SideDrawer/SideDrawer';

import layoutStyles from './Layout.css';

class Layout extends Component{
state = {
    sideDrawerVisible: false
};

    sideDrawerClosedHandler = () =>{
        this.setState({sideDrawerVisible: false})
    };

    sideDrawerToggleHandler = () => {
        this.setState((prevState) =>
        {
            return {sideDrawerVisible: !prevState.sideDrawerVisible}
        })
    };

    render(){
        return (
            <Aux>
                <Toolbar sideDrawerToggle={this.sideDrawerToggleHandler}/>
                <SideDrawer
                    open={this.state.sideDrawerVisible}
                    closed={this.sideDrawerClosedHandler} />
                <main className={layoutStyles.Main}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;
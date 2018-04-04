import React, { Component } from 'react';
import { connect } from 'react-redux';

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
                <Toolbar
                    isAuth={this.props.isAuthenticated}
                    sideDrawerToggle={this.sideDrawerToggleHandler}/>
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    open={this.state.sideDrawerVisible}
                    closed={this.sideDrawerClosedHandler} />
                <main className={layoutStyles.Main}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
  return{
      isAuthenticated: state.auth.token !== null
  }
};

export default connect(mapStateToProps)(Layout);
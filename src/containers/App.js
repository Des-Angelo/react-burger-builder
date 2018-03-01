import React, { Component } from 'react';
import Layout from '../hoc/Layout/Layout';
import {Route} from 'react-router-dom';

import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Checkout from "./Checkout/Checkout";
import Orders from '../containers/Orders/Orders';

class App extends Component {
  render() {
    return (
      <div>
          <Layout>
              {/*<Redirect from='/' to='/burger-builder' />*/}
              <Route path='/' exact component={BurgerBuilder} />
              <Route path='/checkout' component={Checkout} />
              <Route path='/my-orders' component={Orders}/>
              {/*<BurgerBuilder />*/}
              {/*<Checkout/>*/}
          </Layout>
      </div>
    );
  }
}

export default App;

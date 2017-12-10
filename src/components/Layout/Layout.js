import React from 'react';
import Aux from '../../hoc/Auxiliary';

import layoutStyles from './Layout.css';

const layout = (props) => {
    return (
        <Aux>
            <div>
                {/*ToolBar*/}
                {/*SideDrawer*/}
                {/*Backdrop*/}
            </div>
            <main className={layoutStyles.Main}>
                {props.children}
            </main>
        </Aux>
    );
};

export default layout;
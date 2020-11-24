import React from 'react';
import ReactDOM from 'react-dom';
import { MyReactComponent } from './components/react-components/MyReactComponent';

import './index.css';

const App = () => {
    return (
        <div>
            <h1>Hi there, I am React from Webpack 5 </h1>
            <MyReactComponent />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('app'));

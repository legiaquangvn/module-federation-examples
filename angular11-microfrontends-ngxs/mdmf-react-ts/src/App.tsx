import React from 'react';
import ReactDOM from 'react-dom';
import { Header } from './components/react-components/Header';
import { MyReactComponent } from './components/react-components/MyReactComponent';
import Favicon from 'react-favicon';
import './index.css';

const App = () => {
    return (
        <div>
            <Favicon url='https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg' />

            <Header />
            <MyReactComponent />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('app'));

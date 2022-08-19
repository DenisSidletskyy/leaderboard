import React from 'react';
import ReactDOM from 'react-dom/client';
import 'fonts/Montserrat-VariableFont_wght.ttf'
import 'index.css';
import 'normalize.css'
import App from './App';
import {Provider} from "react-redux";
import {store} from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
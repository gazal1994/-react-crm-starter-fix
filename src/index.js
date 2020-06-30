import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'mobx-react'
//import { Item } from './store/Item'
import { Inventory  } from './store/Inventory'

let storeList = new Inventory()
const stores = { storeList }
ReactDOM.render(
    <Provider {...stores}>
    <App   />
    </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();



import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { TodoStore } from './models/TodoStore';
import 'tachyons/css/tachyons.min.css';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { connectReduxDevtools } from "mst-middlewares";

const initialState = {
  todos: [
    {
      title: 'learn mobx',
      is_Done: false
    },
    {
      title: 'lunch',
      is_Done: false
    },
  ]
};

const todoStore = TodoStore.create(initialState);
// tslint:disable-next-line:no-var-requires
connectReduxDevtools(require("remotedev"), todoStore);

ReactDOM.render(
  <Provider store={todoStore}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();

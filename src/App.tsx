import * as React from 'react';
import './App.css';
import { TodoList } from './TodoList';
import { Footer } from './Footer';

const App = () => (
  <div className="bg-near-white vh-100">
    <div className="bg-green pv5 white">
      <h1 className="f1 fw4 ma0 tc tracked">To-do</h1>
    </div>
    <div className="b--black-05 bg-white bl bt ml-auto mr-auto mt5 shadow-4 w-40">
      <TodoList />
      <Footer />
    </div>
  </div>
);

export default App;

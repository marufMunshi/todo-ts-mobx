import * as React from 'react';
import { TodoStore, filterType } from './models/TodoStore';
import { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from './constants/TodoFilter';
import { compose, withHandlers } from 'recompose';
import { inject, observer } from 'mobx-react';

interface IFooterProps {
  store: typeof TodoStore.Type;
  handleSetFilter: (filter: typeof filterType.Type) => void;
}

const FooterComponent = observer((props: IFooterProps) => (
  <React.Fragment>
    <footer className="f4 ph5 pv3">
      <p className="flex justify-center ma0">
        <span 
          className={`br1 mr3 pa2 pointer ${props.store.filter === SHOW_ALL ? 'b--washed-red ba' : ''}`} 
          onClick={() => props.handleSetFilter(SHOW_ALL)}>
          All
        </span>
        <span 
          className={`br1 mr3 pa2 pointer ${props.store.filter === SHOW_ACTIVE ? 'b--washed-red ba' : ''}`} 
          onClick={() => props.handleSetFilter(SHOW_ACTIVE)}>
            Active
        </span>
        <span 
          className={`br1 pa2 pointer ${props.store.filter === SHOW_COMPLETED ? 'b--washed-red ba' : ''}`} 
          onClick={() => props.handleSetFilter(SHOW_COMPLETED)}>
          Completed
        </span>
      </p>
    </footer>
  </React.Fragment>
));

const enhance = compose<IFooterProps, {}>(
  inject('store'),
  observer,
  withHandlers<IFooterProps, {}>({
    handleSetFilter: props => (filter: typeof filterType.Type) => {
      const { setFilter } = props.store; 
      setFilter(filter);
    }
  })
);

export const Footer = enhance(FooterComponent);
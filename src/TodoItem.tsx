import * as React from 'react';
import { Todo } from './models/TodoStore';
import { compose, withHandlers } from 'recompose';
import { observer } from 'mobx-react';

interface ITodoItemProps {
  todo: typeof Todo.Type;
}

interface ITodoItemPropsInternalProps extends ITodoItemProps {
  toggleStatus: () => void;
}

const TodoItem = observer((props: ITodoItemPropsInternalProps) => (
  <div 
    className="b--black-10 bb flex items-center justify-start pv3" 
  >
    {props.todo.completed ? (
      <span
        className="green ion-android-checkmark-circle pl3 pointer"
        onClick={props.toggleStatus}
      />
    ) : (
      <span
        className="black-50 ion-android-radio-button-off pl3 pointer"
        onClick={props.toggleStatus}
      />
    )}
    <li className={`flex justify-between pl4 ttc w-90 ${props.todo.completed ? 'strike' : ''}`}>
      {props.todo.title}
      <span 
        className="hover-red ion-close-round ph2 pointer white" 
        onClick={() => {
          props.todo.remove(props.todo.id);
        }}
      />
    </li>
  </div>
));

const enhance = compose<ITodoItemPropsInternalProps, ITodoItemProps>(
  withHandlers<ITodoItemPropsInternalProps, {}>({
    toggleStatus: props => () => {
      const { toggle } = props.todo;
      toggle();
    }
  })
);

export default enhance(TodoItem);

import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { TodoStore, Todo } from './models/TodoStore';
import { compose, withHandlers } from 'recompose';
import { isEqual, isEmpty } from 'lodash';
import TodoItem from './TodoItem';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

interface ISortableItemProps {
  todo: typeof Todo.Type;
}

const SortableItem = SortableElement(observer((props: ISortableItemProps) =>
  <TodoItem
    todo={props.todo}
  />
));

interface ISortableListProps {
  todos: Array<typeof Todo.Type>
}

const SortableList = SortableContainer(observer((props: ISortableListProps) => {
  return (
    <ul className="f3 list ma0 black-80 pa0">
      {props.todos.map((todo, index) => (
        <SortableItem key={todo.id} index={index} todo={todo} />
      ))}
    </ul>
  );
}));

interface ITodoListProps {
  store: typeof TodoStore.Type;
  handleKeyDown: () => void;
  handleOnClick: () => void;
  onSortEnd: (obj: any) => void;
}

const TodoListComponent = observer((props: ITodoListProps) => (
  <React.Fragment>
    <header className="b--black-10 bb f3 flex items-center">
      <span className="black-50 ion-chevron-down pl3 pointer" onClick={props.handleOnClick} />
      <input
        className="black-80 custom-input f3 pl4 w-100 pv3"
        type="text"
        placeholder="what needs to be done?"
        onKeyDown={props.handleKeyDown}
      />
    </header>
    <main>
      <SortableList 
        todos={props.store.todos} 
        onSortEnd={props.onSortEnd}
        distance={2}
      />
    </main>
  </React.Fragment>
));

const enhance = compose<ITodoListProps, {}>(
  inject('store'),
  observer,
  withHandlers<ITodoListProps, {}>({
    handleKeyDown: props => (e: any) => {
      const { addTodo } = props.store;
      if (isEqual(e.keyCode, 13) && isEmpty(e.target.value) === false) {
        addTodo(e.target.value);
        e.target.value = '';
      }
    },
    handleOnClick: props => (e: any) => {
      props.store.toggleAll();
    },
    onSortEnd: props => (obj: any) => {
      props.store.sortTodos(obj.oldIndex, obj.newIndex);
    }
  })
);

export const TodoList = enhance(TodoListComponent);

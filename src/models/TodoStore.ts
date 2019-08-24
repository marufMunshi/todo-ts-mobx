import { types, getRoot, getSnapshot, applySnapshot } from 'mobx-state-tree';
import * as uuid from 'uuid';
import {
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_ACTIVE
} from 'src/constants/TodoFilter';

export const filterType = types.union(
  ...[SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE].map(types.literal)
);

function randomUUID(): string {
  return uuid.v4();
}

const arrayMoveMutate = (array: any, from: number, to: number) => {
	array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
};

const arrayMove = (array: any, from: number, to: number) => {
	const newArray = array.slice();
	arrayMoveMutate(newArray, from, to);
	return newArray;
};

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: (todo: { completed: any }) => !todo.completed,
  [SHOW_COMPLETED]: (todo: { completed: any }) => todo.completed
};

export const Todo = types.model('Todo', {
  id: types.optional(types.string, randomUUID),
  title: types.string,
  completed: false
}).actions(self => {
  return {
    remove(id: string) {
      const todos = getRoot(self) as any;
      todos.removeTodo(id);
    },
    toggle() {
      self.completed = !self.completed;
    }
  };
});

export const TodoStore = types
  .model('TodoStore', {
    todos: types.optional(types.array(Todo), []),
    filter: types.optional(filterType, SHOW_ALL)
  })
  .views(self => {
    return {
      get filteredTodos() {
        return self.todos.filter(TODO_FILTERS[self.filter]);
      }
    };
  })
  .actions(self => {
    return {
      addTodo(title: string) {
        self.todos.unshift({
          title
        });
      },
      sortTodos(oldIndex: number, newIndex: number) {
        const sortedTodos = arrayMove(getSnapshot(self.todos), oldIndex, newIndex);
        applySnapshot(self.todos, sortedTodos);
      },
      toggleAll() {
        const areAllMarked = self.todos.every(todo => todo.completed);
        self.todos.forEach(todo => (todo.completed = !areAllMarked));
      },
      removeTodo(id: string) {
        const newArray = self.todos.filter(todo => todo.id !== id);
        applySnapshot(self.todos, newArray);
      },
      setFilter(filter: typeof filterType.Type) {
        self.filter = filter;
      }
    };
  });

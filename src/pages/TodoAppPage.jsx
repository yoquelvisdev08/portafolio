import React from 'react';
import TodoApp from '../projects/todo-app/TodoApp';

const TodoAppPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Todo App</h1>
      <TodoApp />
    </div>
  );
};

export default TodoAppPage;

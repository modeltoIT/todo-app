import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 1517;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`).catch(() => {
    throw new Error('Unable to load todos');
  });
};

export const addTodo = (data: Omit<Todo, 'id'>): Promise<Todo> => {
  if (!data.title) {
    return Promise.reject('Title should not be empty');
  }

  return client.post<Todo>(`/todos`, data).catch(() => {
    throw new Error('Unable to add a todo');
  });
};

export const deleteTodo = (id: number): Promise<void> => {
  return client.delete(`/todos/${id}`).catch(() => {
    throw new Error('Unable to delete a todo');
  });
};

export const changeTodo = (data: Todo): Promise<Todo> => {
  if (!data.title) {
    return Promise.reject('Title should not be empty');
  }

  return client.patch<Todo>(`/todos/${data.id}`, data).catch(() => {
    throw new Error('Unable to update a todo');
  });
};

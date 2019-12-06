import React from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import ItemStatusFilter from '../item-status-filter';
import TodoList from '../todo-list';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends React.Component {
  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch'),
    ],
    searchText: '',
    filterMode: 'all',
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++,
    };
  }

  deleteItem = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: todoData.filter(item => item.id !== id)
      };
    });
  };

  addItem = text => {
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      return {
        todoData: todoData.concat(newItem)
      };
    });
  };

  toggleProperty(id, propName) {
    this.setState(({ todoData }) => {
      const updatedData = todoData.map(item => {
        if (item.id === id) {
          item[propName] = !item[propName];
        }

        return item;
      });

      return {
        todoData: updatedData
      };
    });
  }

  onToggleImportant = id => {
    this.toggleProperty(id, 'important');
  };

  onToggleDone = id => {
    this.toggleProperty(id, 'done');
  };

  onChangeSearchField = evt => {
    this.setState({ searchText: evt.target.value });
  };

  getFilteredTodos() {
    const { todoData, searchText, filterMode } = this.state;

    let filteredData;
    switch (filterMode) {
      case 'Active':
        filteredData = todoData.filter(item => !item.done);
        break;
      case 'Done':
        filteredData = todoData.filter(item => item.done);
        break;
      case 'All':
      default:
        filteredData = todoData;
        break;
    }

    if (searchText.length === 0) {
      return filteredData;
    }

    return filteredData.filter(item => item.label.toLowerCase().includes(searchText.toLowerCase()));
  }

  search(items, searchText) {
    if (searchText.length === 0) {
      return items;
    }

    return items.filter(item => item.label.toLowerCase().includes(searchText.toLowerCase()));
  }

  filter(items, filterMode) {
    switch (filterMode) {
      case 'active':
        return items.filter(item => !item.done);
      case 'done':
        return items.filter(item => item.done);
      case 'all':
      default:
        return items;
    }
  }

  onChangeFilterMode = filterMode => {
    this.setState({ filterMode });
  }

  render() {
    const { todoData, searchText, filterMode } = this.state;
    const visibleItems = this.filter(this.search(todoData, searchText), filterMode);
    const doneCount = todoData.filter(item => item.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={ todoCount } done={ doneCount } />
        <div className="top-panel d-flex">
          <SearchPanel
            onChangeSearchField={ this.onChangeSearchField }
            searchText={ searchText } />
          <ItemStatusFilter
            onChangeFilterMode={ this.onChangeFilterMode }
            filterMode={ filterMode } />
        </div>
        <TodoList
          todos={ visibleItems }
          onDeleted={ this.deleteItem }
          onToggleImportant={ this.onToggleImportant }
          onToggleDone={ this.onToggleDone } />
        <ItemAddForm
          onItemAdded={ this.addItem } />
      </div>
    );
  }
}

import React, { Component } from 'react';
import './App.css';
import ToDo from './components/ToDo.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        { description: 'Walk the dog', isCompleted: false },
        { description: 'Take a nap', isCompleted: true },
        { description: 'Cook dinner', isCompleted: false }
      ],
      newToDoDescription: ''
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.newToDoDescription) {return}
    const newTodo = {description: this.state.newToDoDescription, isCompleted: false};
    this.setState({todos: [...this.state.todos, newTodo], newToDoDescription: ''});
  }

  handleChange(e) {
    this.setState({newToDoDescription: e.target.value})
  }

  toggleComplete(index) {
    const todos = this.state.todos.slice();
    const todo = todos[index];
    todo.isCompleted = todo.isCompleted ? false : true;
    this.setState({todos: todos}); // First 'todos' corresponds to this.state.todos. The second is the variable in the function.
  }

  deleteTodo(index) {    
    const result = this.state.todos.filter((todo) => {
      const todoToDelete = this.state.todos[index];
      return todoToDelete !== todo;
    });
    
    this.setState({todos: result});
  }

  render() {
    console.log(this.state)
    return (
      <div className="App">
        <ul>
          {this.state.todos.map((todo, index) => 
            <ToDo key={index} description={todo.description} isCompleted={todo.isCompleted} 
                  toggleComplete={() => this.toggleComplete(index)} 
                  deleteTodo={() => this.deleteTodo(index)}/>
          )}  
        </ul>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input type="text" value={this.state.newToDoDescription} onChange={(e) => this.handleChange(e)}/>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default App;

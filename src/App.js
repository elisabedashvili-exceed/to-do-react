import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
    this.addItem = this.addItem.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:3000/')
    .then(response => {
      console.log(response.data);
      this.setState({items: response.data})
    })
    .catch(error => {
      console.log(error);
    })
  };

  addItem() {
    const items = this.state.items;  
    if (document.getElementById("listItem").value.trim()) {
      axios.post('http://localhost:3000/add', {value: document.getElementById("listItem").value, checked: false})
      .then(response => {
        this.setState({items: [...items, response.data]});
        document.getElementById("listItem").value = '';
      })
      .catch(err => {
        console.log(err + " unable to save to database");
      });
    } else {
      alert('Please input value')
    }
  }

  handleKeyPress(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      this.addItem();
    }
  }

  handleCheckboxClick(e) {
    const id = e.target.previousElementSibling.innerHTML;
    if (e.target.checked) {
      e.target.nextElementSibling.style = "text-decoration: line-through";
      axios.put(`http://localhost:3000/edit/${id}`, {checked: true})
      .then(doc => {
        if (!doc) {return doc.status(404).end(); }
        return doc.status(200).json(doc);
      })
      .catch(err => console.log(err));
  
    } else {
      e.target.nextElementSibling.style = "text-decoration: none";
      axios.put(`http://localhost:3000/edit/${id}`, {checked: false})
      .then(doc => {
        if (!doc) {return doc.status(404).end(); }
        return doc.status(200).json(doc);
      })
      .catch(err => console.log(err));
    }
  };

  handleEditClick(e) {
    let target = e.target;
    let parElement = target.parentElement;
    const inputBar = document.createElement("input");
    inputBar.placeholder = "Please add items...";
    inputBar.size = Math.max(parElement.children[2].textContent.length + 2, inputBar.placeholder.length);
    parElement.insertBefore(inputBar, e.target);
    inputBar.value = parElement.children[2].textContent;
    const id = e.target.nextElementSibling.innerHTML;
    inputBar.onkeyup = (event) => {
      if (event.keyCode === 13 && inputBar.value.trim()) {
        parElement.removeChild(inputBar);
        parElement.children[2].textContent = inputBar.value;
        target.className = "";
  
        axios.put(`http://localhost:3000/edit/${id}`, {value: inputBar.value})
        .then(doc => {
          if (!doc) {return doc.status(404).end(); }
          return doc.status(200).json(doc);
        })
        .catch(err => console.log(err)); 
      }
    };
    target.className = "hide";
  }

  handleDeleteClick(e) {
    const id = e.target.previousElementSibling.innerHTML;
    axios.delete(`http://localhost:3000/delete/${id}`)
    .then(doc => {
      if (!doc) {console.log('Error')}
      console.log('Successfully deleted');
    })
    .catch(error => {console.log(error + ' Unable to delete');
    });
    e.target.parentElement.remove();
  }

  render() {
    return (
    <div className="App">
      <h1 className="title">To-Do List</h1>
      <input id="listItem" placeholder="Write Down..." onKeyPress={this.handleKeyPress}/>
      <button id="button" type="button" onClick={this.addItem}>
          Click to add
      </button>

      <ul id="list">
        {this.state.items.map(item => {
          return (
            <li key={item._id}>
              <span className="id">{item._id}</span>
              <input type="checkbox" onClick={this.handleCheckboxClick} defaultChecked={item.checked === true ? true : false}></input>
              <label style={ { textDecoration: item.checked === true ? 'line-through' : 'none' } }>{item.value}</label>
              <button id="editButton" onClick={this.handleEditClick}>Edit </button>
              <span className="id">{item._id}</span>
              <button id="deleteButton" onClick={this.handleDeleteClick}>Delete</button>
            </li>
          );
        })}
      </ul>
      
      <input type="button" id="next" value="next" />
      <input type="button" id="page" value="1" />
      <input type="button" id="previous" value="previous" /><br/>

      <button id="completeBtn">Complete Tasks</button><br/>
      <button id="uncompleteBtn">Uncomplete Tasks</button><br/>
      <button id="removeAllBtn">Remove Completed Tasks</button>
    </div>
    );
  }
}
  
export default App;
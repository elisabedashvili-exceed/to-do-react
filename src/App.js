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
      })
      .catch(err => {
        console.log(err + " unable to save to database");
      });
    } else {
      alert('Please input value')
    }
  }

  handleCheckboxClick(e) {
    const id = e.target.previousElementSibling.innerHTML;
    console.log(id);
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

  render() {
    return (
    <div className="App">
      <h1 className="title">To-Do List</h1>
      <input id="listItem" placeholder="Write Down..."/>
      <button id="button" type="button" onClick={()=> this.addItem()}>
          Click to add
      </button>

      <ul id="list">
        {this.state.items.map(item => {
          return (
            <li key={item._id}>
              <span className="id">{item._id}</span>
              <input type="checkbox" onClick={(e) => this.handleCheckboxClick(e)}></input>
              <label>{item.value}</label>
              <button id="editButton">Edit </button>
              <span className="id">{item._id}</span>
              <button id="deleteButton">Delete</button>
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

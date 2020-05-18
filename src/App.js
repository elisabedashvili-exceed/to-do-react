import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import clsx from 'clsx';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const numberPerPage = 5;
let currentPage = 1;
let numberOfPages = 1;

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
    this.handleSelectAll = this.handleSelectAll.bind(this);
    this.handleUnselectAll = this.handleUnselectAll.bind(this);
    this.handleRemoveAll = this.handleRemoveAll.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }

  next() {
    currentPage += 1;
    document.getElementById('page').value = currentPage;
    this.setPageCount();
    this.drawList();
  }

  previous() {
    currentPage--;
    document.getElementById('page').value = currentPage;
    this.setPageCount();
    this.drawList();    
  }

  setPageCount() {
    const items = [...document.getElementById('list').children];
    numberOfPages = Math.ceil(items.length / numberPerPage);
  }

  drawList() {
    const items = [...document.getElementById('list').children];
    const start = (currentPage - 1) * numberPerPage;
    const end = start + numberPerPage;

    items.forEach((item, index) => {
      if (index >= start && index < end) {
          item.className = "show";
      } else {
          item.className = "hide";
      }
    });
    document.getElementById('next').disabled = (currentPage === numberOfPages) || (items.length === 0);
    document.getElementById('previous').disabled = currentPage <= 1;
  }

  componentDidMount() {
    this.setPageCount();
    this.drawList();
  }

  componentDidUpdate() {
    this.setPageCount();
    this.drawList();
    if (this.state.items.length % numberPerPage === 1) document.getElementById('next').click()
  }

  addItem() {
    if (document.getElementById("listItem").value.trim()) {
      const items = this.state.items;  
      this.setState({items: [...items, document.getElementById("listItem").value]});
      document.getElementById("listItem").value = '';
    } else {
      alert("Please enter something :)")
    }
  }

  handleKeyPress(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      this.addItem();
    }
  }

  handleCheckboxClick(e) {
    //const id = e.target.previousElementSibling.innerHTML;
    const label = e.target.parentElement.parentElement.parentElement.children[2];
    if (e.target.checked) {
      label.style = "text-decoration: line-through"  
    } else {
      label.style = "text-decoration: none"
    }
  };

  handleEditClick(e) {
    let target = e.target.closest("#editButton");
    let parElement = target.parentElement;
    const edit = document.getElementById("editButton");
    const inputBar = document.createElement("input");
    inputBar.placeholder = "Please add items...";
    inputBar.size = Math.max(parElement.children[2].textContent.length + 2, inputBar.placeholder.length);
    parElement.insertBefore(inputBar, target);
    inputBar.value = parElement.children[2].textContent;
    //const id = e.target.nextElementSibling.innerHTML;
    inputBar.onkeyup = (event) => {
      if (event.keyCode === 13 && inputBar.value.trim()) {
        parElement.removeChild(inputBar);
        parElement.children[2].textContent = inputBar.value;
        target.className = "MuiButtonBase-root MuiIconButton-root";
      }
    };
    target.className = "hide";
  }

  handleDeleteClick(e) {
    const list = [...document.getElementById("list").children];
    //const id = e.target.previousElementSibling.innerHTML;
    e.target.closest("li").remove();
    
    if (list.length % numberPerPage === 1) document.getElementById('previous').click();
    this.setPageCount();
    this.drawList();
  }

  handleSelectAll() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(item => {
      if (!item.checked) {item.click()}
    });
  }

  handleUnselectAll() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(item => {
      if (item.checked) {item.click()}
    });
  }

  handleRemoveAll() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(item => {
      if (item.checked) {
        item.closest("li").lastElementChild.click();
      }
    }); 
  }

  render() {
    return (
    <div className="App">
      <h1 className="title">To-Do List</h1>
      <TextField
          id="listItem"
          label="Add New Task"
          placeholder="Write Down..."
          multiline
          variant="outlined"
          size="small"
          onKeyPress={this.handleKeyPress}
        />
      <Fab id="button" size="small" color="primary" aria-label="add" onClick={this.addItem}>
        <AddIcon />
      </Fab>
      
      <ul id="list">
        {this.state.items.map(item => {
          return (
            <li key={item._id} id="item">
              <span className="id">{item._id}</span>
              <Checkbox
                id="checkbox"
                disableRipple
                color="default"
                inputProps={{ 'aria-label': 'decorative checkbox' }}
                onClick={this.handleCheckboxClick}
                defaultChecked={item.checked === true ? true : false}
              />
              <label id="label" style={ { textDecoration: item.checked === true ? 'line-through' : 'none' } }>{item}</label>
              
              <IconButton id="editButton" onClick={this.handleEditClick} aria-label="edit">
                <EditIcon fontSize="small"/>
              </IconButton>
              <span className="id">{item._id}</span>
              <IconButton id="deleteButton" onClick={this.handleDeleteClick} aria-label="delete">
                <DeleteIcon fontSize="small"/>
              </IconButton>
              
            </li>
          );
        })}
      </ul>
      
      
      <input type="button" id="previous" onClick={this.previous} value="Prev" />
      <input type="button" id="page" value="1" />
      <input type="button" id="next" onClick={this.next} value="Next" />
      <br />

      <ButtonGroup
        orientation="vertical"
        color="primary"
        aria-label="vertical contained primary button group"
        variant="contained"
      >
        <Button id="completeBtn" onClick={this.handleSelectAll}>Complete Tasks</Button>
        <Button id="uncompleteBtn" onClick={this.handleUnselectAll}>Uncomplete Tasks</Button>
        <Button id="removeAllBtn" onClick={this.handleRemoveAll}>Remove Completed Tasks</Button>
      </ButtonGroup>
    </div>
    );
  }
}
  
export default App;
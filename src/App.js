import React, { Component, createRef } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import TodoItem from './components/TodoItem';
import './App.css';
import { v4 } from 'uuid';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
class App extends Component {
  state = {
    items: [],
    numberPerPage: 3,
    currentPage: 1
  };
  inputRef = createRef();

  next = () => {
    console.log("--------next")
    const {currentPage} = this.state;
    this.setState({currentPage: currentPage + 1});
  }
  previous = () => {
    console.log("--------prev")
    const {currentPage} = this.state;
    this.setState({currentPage: currentPage - 1});
  }
  
  drawList = () => {
    const items = [...document.getElementById('list').children];
    const start = (this.state.currentPage - 1) * this.state.numberPerPage;
    const end = start + this.state.numberPerPage;
    items.forEach((item, index) => {
    if (index >= start && index < end) {
      item.className = "show";
    } else {
      item.className = "hide";
    }
  });
    let numberOfPages = Math.ceil(this.state.items.length / this.state.numberPerPage);
    document.getElementById('next').disabled = (this.state.currentPage === numberOfPages) || (this.state.items.length === 0);
    document.getElementById('previous').disabled = this.state.currentPage <= 1;
  };
  
  componentDidMount() {
    let numberOfPages = Math.ceil(this.state.items.length / this.state.numberPerPage);
    document.getElementById('next').disabled = (this.state.currentPage === numberOfPages) || (this.state.items.length === 0);
    document.getElementById('previous').disabled = this.state.currentPage <= 1;
  }
  
  componentDidUpdate() {
    this.drawList();
  }

  addItem = () => {
    const { items, numberPerPage } = this.state;
    if (this.inputRef.current.value.trim()) {
      this.setState({items: [...items, {
          value: this.inputRef.current.value,
          checked: false,
          id: v4()
        }],
        currentPage: Math.ceil((items.length + 1) / numberPerPage),
      });
      this.inputRef.current.value = '';
    } else {
      alert("Please enter something :)")
    }
  };

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.addItem();
    }
  };
  
  handleCheckboxClick = (id) => {
    const items = this.state.items.map(item =>
      (item.id !== id) ? item : {...item, checked: (item.checked === false ? true : false)})
      this.setState({items})
  };
  
  handleEdit = (e, id, newValue) => {
    const items = this.state.items.map(item =>
      (item.id !== id) ? item : {...item, value: newValue})
      this.setState({items})
  };
  handleDeleteClick = (id) => {
    const { numberPerPage, items, currentPage } = this.state;
    this.setState({
      items: items.filter(item => item.id !== id),
      currentPage: items.length % numberPerPage === 1 ? Math.ceil((items.length - 1) / numberPerPage) : currentPage
    })
  };

  handleSelectAll = () => {
    const items = this.state.items.map(item => { return {...item, checked: true} })
    this.setState({items})
  }

  handleUnselectAll = () => {
    const items = this.state.items.map(item => { return {...item, checked: false} })
    this.setState({items})
  }

  handleRemoveAll = () => {
    const { numberPerPage, items, currentPage } = this.state;
    const checkedItems = [];
      this.state.items.forEach(item=> {
        if (item.checked) checkedItems.push(item)
      })
    this.setState({
      items: items.filter(item => item.checked === false),
      currentPage: items.length % numberPerPage === 1 ? Math.ceil((items.length - checkedItems.length) / numberPerPage) : currentPage
    })
  }

  render() {
    const { items } = this.state;
    let numberOfPages = Math.ceil(this.state.items.length / this.state.numberPerPage);
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
          inputRef={this.inputRef}
        />
        <Fab id="button" size="small" color="primary" aria-label="add" onClick={this.addItem}>
          <AddIcon/>
        </Fab>
        <ul id="list">
          {items.map((item) => {
            return (
              <TodoItem
                item={item}
                key={item.id}
                remove={this.handleDeleteClick}
                edit={this.handleEdit}
                check={this.handleCheckboxClick}/>
            );
          })}
        </ul>
        <KeyboardArrowLeftIcon 
          style={this.state.currentPage <= 1 ? {visibility: "hidden"} : {visibility: "visible"}}
          fontSize="small" 
          id="previous" 
          onClick={this.previous}
        />
        <input style={{verticalAlign: "text-top"}} type="button" value={this.state.currentPage}/>
        <KeyboardArrowRightIcon 
          style={(this.state.currentPage === numberOfPages) || (this.state.items.length === 0) ? {visibility: "hidden"} : {visibility: "visible"}}
          fontSize="small" 
          id="next" 
          onClick={this.next}
        />
        <br/>
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
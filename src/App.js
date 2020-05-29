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
    const {items, numberPerPage, currentPage} = this.state;
    const start = (currentPage - 1) * numberPerPage;
    const end = start + numberPerPage;
    const visibleItems = items.filter( (item, index) => (index >= start && index < end) ? item : null );
    return visibleItems;
  };

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
    let numberOfPages = Math.ceil(items.length / numberPerPage);
    const checkedItems = [];
      items.forEach(item=> {
        if (item.checked) checkedItems.push(item)
      })
    this.setState({
      items: items.filter(item => item.checked === false),
      currentPage: (items.length % numberPerPage >= 0) && (items.length % numberPerPage < numberPerPage) && (currentPage === numberOfPages)
      ? Math.ceil((items.length - checkedItems.length) / numberPerPage) 
      : currentPage
    })
  }

  render() {
    const { items, currentPage, numberPerPage } = this.state;
    const showItems = this.drawList();
    let numberOfPages = Math.ceil(items.length / numberPerPage);
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
          {showItems.map((item) => {
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
          className={currentPage <= 1 ? "hide" : "show"}
          fontSize="small" 
          id="previous" 
          onClick={this.previous}
        />
        <input className="pageNumber" type="button" value={currentPage}/>
        <KeyboardArrowRightIcon 
          className={(currentPage === numberOfPages) || (items.length === 0) ? "hide" : "show"}
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
import React, { Component, createRef } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import TodoItem from './components/TodoItem';
import './App.css';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import { testAction, checkAction } from './redux/actions/testAction';
import { addItems, checkItem, editItem, deleteItem } from './redux/actions/toDoItemRelated';
import { nextPage, prevPage } from './redux/actions/paginationButtons';

class App extends Component {
  state = {
    items: [],
    numberPerPage: 3,
    currentPage: 1
  };
  inputRef = createRef();

  drawList = () => {
    const { numberPerPage, currentPage } = this.props;

    const start = (currentPage - 1) * numberPerPage;
    const end = start + numberPerPage;
    return this.props.items.filter((item, index) => (index >= start && index < end));
    // return visibleItems;
  };

  addItem = () => {
    const { actions } = this.props;
    let { value } = this.inputRef.current;
    if (value.trim()) {
      axios.post('http://localhost:3000/add', { value, checked: false })
        .then(response => {
          const { value, checked, _id } = response.data;
          actions.addItems(value, checked, _id);
          this.inputRef.current.value = '';
        })
        .catch(err => {
          console.log(err + " unable to save to database");
        });
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

  handleCheckboxClick = (id, checkedStatus) => {
    const { checkItem } = this.props.actions;
    checkItem(id);
    axios.put(`http://localhost:3000/edit/${id}`, { checked: !checkedStatus })
      .then(() => {
        console.log(`Item checked successfully`);
      })
      .catch(err => console.log(err));
  };

  handleEdit = (e, id, newValue) => {
    const { editItem } = this.props.actions;
    editItem(id, newValue);

    axios.put(`http://localhost:3000/edit/${id}`, { value: newValue })
      .then(() => {
        console.log(`Item edited successfully`);
      })
      .catch(err => console.log(err));
  };

  handleDeleteClick = (id) => {
    const { deleteItem } = this.props.actions;
    deleteItem(id);

    axios.delete(`http://localhost:3000/delete/${id}`)
      .then(doc => {
        if (!doc) {
          console.log('Error')
        }
        console.log('Successfully deleted');
      })
      .catch(error => {
        console.log(error + ' Unable to delete');
      });
  };

  handleSelectAll = () => {
    const {items} = this.state;
    const selectedItems = items.map(item => ({ ...item, checked: true }));
    this.setState({ items: selectedItems });

    axios.put(`http://localhost:3000/selectAll`)
      .then(res => {
        if (!res) console.log("No Response");
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleUnselectAll = () => {
    const {items} = this.state;
    const unselectedItems = items.map(item => {
      return { ...item, checked: false }
    });
    this.setState({ items: unselectedItems })

    axios.put(`http://localhost:3000/unSelectAll`)
      .then(res => {
        if (!res) console.log("No Response");
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleRemoveAll = () => {
    const { numberPerPage, items, currentPage } = this.state;
    let numberOfPages = Math.ceil(items.length / numberPerPage);
    const checkedItems = [];
    items.forEach(item => {
      if (item.checked) checkedItems.push(item)
    })
    this.setState({
      items: items.filter(item => item.checked === false),
      currentPage: (items.length % numberPerPage >= 0) && (items.length % numberPerPage < numberPerPage) && (currentPage === numberOfPages)
        ? Math.ceil((items.length - checkedItems.length) / numberPerPage)
        : currentPage
    })

    axios.delete(`http://localhost:3000/deleteSelected/`)
      .then(doc => {
        if (!doc) {
          console.log('Error')
        } else {
          console.log('Successfully deleted')
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  get = () => {
    axios.get('http://localhost:3000/')
      .then(response => {
        const items = [];
        response.data.forEach(item => items.push({
          value: item.value,
          checked: item.checked,
          id: item._id
        }))
        this.setState({ items });
      })
      .catch(error => {
        // handle error
        console.log(error);
      })
  }

  componentDidMount() {
    this.get();
  }

  render() {
    const { items, currentPage, numberPerPage, actions } = this.props;
    console.log(this.props);
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
          onClick={() => this.props.actions.prevPage()}
        />
        <input className="pageNumber" type="button" value={currentPage}/>
        <KeyboardArrowRightIcon
          className={(currentPage === numberOfPages) || (items.length === 0) ? "hide" : "show"}
          fontSize="small"
          id="next"
          onClick={() => actions.nextPage()}
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
          <Button onClick={() => actions.checkAction()}>action</Button>
        </ButtonGroup>
      </div>
    );
  }
}

// Called every time the store state changes. 
// It receives the entire store state, 
// and should return an object of data this component needs.

//                       state --> state in reducer function
const mapStateToProps = (state) => {
  return {
    hello: "hello",
    goodBye: state.goodBye,
    items: state.items,
    numberPerPage: state.numberPerPage,
    currentPage: state.currentPage
  }
}

// If it’s a function, it will be called once on component creation. 
// It will receive dispatch as an argument, and should return an object full of functions that use dispatch to dispatch actions.
// If it’s an object full of action creators, 
// each action creator will be turned into a prop function that automatically dispatches its action when called.
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        testAction,
        checkAction,
        addItems,
        checkItem,
        editItem,
        deleteItem,
        nextPage,
        prevPage
      },
      dispatch
    )
  };
};

// mapDispatchToProps doesn't have any arguments below, it has dispatch up there
export default connect(mapStateToProps, mapDispatchToProps)(App);



// No longer need setState()

// Information that we need to render components should be taken from store

// in our case store should look like something like this:
    // { items: [],
    //   numberPerPage: 3,
    //   currentPage: 1    (without editMode: false, because it's minor little thing we can leave it to TodoItem component)
    // }
    
// Everytime we want to update store we need to call reducer

// connect connects component to store
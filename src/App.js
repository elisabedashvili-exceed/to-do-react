import React, { Component, createRef } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import TodoItem from "./components/TodoItem";
import "./App.css";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

import {
  addItems,
  checkItem,
  editItem,
  deleteItem,
  selectAll,
  unselectAll,
  removeAll,
  getAll,
} from "./redux/actions/toDoItemRelated";
import { nextPage, prevPage } from "./redux/actions/paginationButtons";

class App extends Component {
  inputRef = createRef();

  drawList = () => {
    const { numberPerPage, currentPage, items } = this.props;

    const start = (currentPage - 1) * numberPerPage;
    const end = start + numberPerPage;
    return items.filter((item, index) => index >= start && index < end);
  };

  addItem = () => {
    const { actions } = this.props;
    let { value } = this.inputRef.current;
    if (value.trim()) {
      axios
        .post("http://localhost:8000/add", { value, checked: false })
        .then((response) => {
          const { value, checked, _id } = response.data;
          actions.addItems(value, checked, _id);
          this.inputRef.current.value = "";
        })
        .catch((err) => {
          console.log(err + " unable to save to database");
        });
    } else {
      alert("Please enter something :)");
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
    axios
      .put(`http://localhost:8000/edit/${id}`, { checked: !checkedStatus })
      .then(() => {
        console.log(`Item checked successfully`);
      })
      .catch((err) => console.log(err));
  };

  handleEdit = (e, id, newValue) => {
    const { editItem } = this.props.actions;
    editItem(id, newValue);

    axios
      .put(`http://localhost:8000/edit/${id}`, { value: newValue })
      .then(() => {
        console.log(`Item edited successfully`);
      })
      .catch((err) => console.log(err));
  };

  handleDeleteClick = (id) => {
    const { deleteItem } = this.props.actions;
    deleteItem(id);

    axios
      .delete(`http://localhost:8000/delete/${id}`)
      .then((doc) => {
        if (!doc) {
          console.log("Error");
        }
        console.log("Successfully deleted");
      })
      .catch((error) => {
        console.log(error + " Unable to delete");
      });
  };

  handleSelectAll = () => {
    const { selectAll } = this.props.actions;
    selectAll();

    axios
      .put(`http://localhost:8000/selectAll`)
      .then((res) => {
        if (!res) console.log("No Response");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleUnselectAll = () => {
    const { unselectAll } = this.props.actions;
    unselectAll();

    axios
      .put(`http://localhost:8000/unSelectAll`)
      .then((res) => {
        if (!res) console.log("No Response");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleRemoveAll = () => {
    const { removeAll } = this.props.actions;
    removeAll();

    axios
      .delete(`http://localhost:8000/deleteSelected/`)
      .then((doc) => {
        if (!doc) {
          console.log("Error");
        } else {
          console.log("Successfully deleted");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  get = () => {
    const { getAll } = this.props.actions;
    axios
      .get("http://localhost:8000/")
      .then((response) => {
        getAll(response.data);
        console.log(this.props.items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.get();
  }

  render() {
    const { items, currentPage, numberPerPage, actions } = this.props;
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
        <Fab
          id="button"
          size="small"
          color="primary"
          aria-label="add"
          onClick={this.addItem}
        >
          <AddIcon />
        </Fab>
        <ul id="list">
          {showItems.map((item) => {
            return (
              <TodoItem
                item={item}
                key={item._id}
                remove={this.handleDeleteClick}
                edit={this.handleEdit}
                check={this.handleCheckboxClick}
              />
            );
          })}
        </ul>
        <KeyboardArrowLeftIcon
          className={currentPage <= 1 ? "hide" : "show"}
          fontSize="large"
          id="previous"
          onClick={() => this.props.actions.prevPage()}
        />
        <Button size="small" variant="outlined" color="primary">
          {currentPage}
        </Button>
        <KeyboardArrowRightIcon
          className={
            currentPage === numberOfPages || items.length === 0
              ? "hide"
              : "show"
          }
          fontSize="large"
          id="next"
          onClick={() => actions.nextPage()}
        />
        <br />

        <div className="bigButtons">
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleSelectAll}
        >
          Complete Tasks
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleUnselectAll}
        >
          Uncomplete Tasks
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleRemoveAll}
        >
          Remove Completed Tasks
        </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.items,
    numberPerPage: state.numberPerPage,
    currentPage: state.currentPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        addItems,
        checkItem,
        editItem,
        deleteItem,
        selectAll,
        unselectAll,
        removeAll,
        getAll,
        nextPage,
        prevPage,
      },
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

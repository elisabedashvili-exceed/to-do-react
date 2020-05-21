import React, { Component } from 'react';
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

class TodoItem extends Component {
  render() {
    const { item } = this.props;
    return (
      <li id="item">
        <span className="id">{item._id}</span>
        <Checkbox
          id="checkbox"
          disableRipple
          color="default"
          inputProps={{ 'aria-label': 'decorative checkbox' }}
          onClick={this.handleCheckboxClick}
          defaultChecked={item.checked === true ? true : false}
        />
        <label
          id="label"
          style={{ textDecoration: item.checked === true ? 'line-through' : 'none' }}
        >
          {item.value}
        </label>
        <IconButton id="editButton" onClick={this.handleEditClick} aria-label="edit">
          <EditIcon fontSize="small"/>
        </IconButton>
        <span className="id">{item._id}</span>
        <IconButton id="deleteButton" onClick={()=> {this.props.delete(item.id)}} aria-label="delete">
          <DeleteIcon fontSize="small"/>
        </IconButton>
      </li>
    )
  }
}
export default TodoItem;
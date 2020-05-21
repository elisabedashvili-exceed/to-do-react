import React, { Component, createRef } from 'react';
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

class TodoItem extends Component {
  editInputRef = createRef();

  hideShowEditInput = () => {
    if (this.editInputRef.current.className === "hide") {
      this.editInputRef.current.className = "show"
    } else {
      this.editInputRef.current.className = "hide"
    }
  }
  
  render() {
    const { item, remove, edit } = this.props;
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
        <input id="editInput" 
          className="hide"
          type="text" 
          size={Math.max(item.value.length, 15)} 
          defaultValue={item.value} 
          ref={this.editInputRef}
          onKeyPress={(e)=> {
            edit(e, item.id, this.editInputRef.current.value);
            if (e.key === "Enter") this.editInputRef.current.className = "hide"; 
            }}>
        </input>
        <IconButton id="editButton" onClick={this.hideShowEditInput} aria-label="edit">
          <EditIcon fontSize="small"/>
        </IconButton>
        <span className="id">{item._id}</span>
        <IconButton id="deleteButton" onClick={()=> remove(item.id)} aria-label="delete">
          <DeleteIcon fontSize="small"/>
        </IconButton>
      </li>
    )
  }
}
export default TodoItem;
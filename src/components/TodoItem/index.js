import React, { Component, createRef } from 'react';
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';

class TodoItem extends Component {
  state = {
    checked: false
  }
  editInputRef = createRef();

  hideShowEditInput = () => {
    if (this.editInputRef.current.style.visibility === "visible") {
      this.editInputRef.current.style.visibility = "hidden";
      this.editInputRef.current.closest("#item > div").style.visibility = "hidden";
    } else {
      this.editInputRef.current.style.visibility = "visible";
      this.editInputRef.current.closest("#item > div").style.visibility = "visible";
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
          defaultChecked={this.state.checked === true ? true : false}
        />
        <label
          id="label"
          style={{ textDecoration: item.checked === true ? 'line-through' : 'none' }}
        >
          {item.value}
        </label>
        <TextField style={{visibility: "hidden"}}
          id="outlined-basic" 
          variant="outlined"
          size="small"
          defaultValue={item.value} 
          inputRef={this.editInputRef}
          onKeyPress={(e)=> {
            edit(e, item.id, e.target.value);
            
            if (e.key === "Enter") {
              e.target.style.visibility = "hidden";
              this.editInputRef.current.closest("#item > div").style.visibility = "hidden";
            }
            }} />
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
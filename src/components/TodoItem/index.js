import React, { Component, createRef, Fragment } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';

class TodoItem extends Component {
  state = {
    editMode: false
  };
  
  handleEditClick = () => {
    this.state.editMode === false ? this.setState({ editMode: true }) : this.setState({ editMode: false });
  };
  render() {
    const { editMode } = this.state;
    const { item, remove, edit } = this.props;
    return (
      <li>
        {
          editMode ? (
            <Fragment>
              <Checkbox
                id="checkbox"
                disableRipple
                color="default"
                inputProps={{ 'aria-label': 'decorative checkbox' }}
                // onClick={this.handleCheckboxClick}
                defaultChecked={item.checked}
              />
              <label style={{ textDecoration: item.checked ? 'line-through' : 'none' }}>{item.value}</label>
              <TextField
                id="outlined-basic" 
                variant="outlined"
                size="small"
                defaultValue={item.value}
                onKeyPress={(e)=> {
                  edit(e, item.id, e.target.value);
                  if (e.key === "Enter") {
                    this.setState({ editMode: false });                  
                  }
                  }} />
              <IconButton id="editButton" onClick={this.handleEditClick} aria-label="edit">
                <EditIcon fontSize="small"/>
              </IconButton>
              <span className="id">{item._id}</span>
              <IconButton id="deleteButton" onClick={() => remove(item.id)} aria-label="delete">
                <DeleteIcon fontSize="small"/>
              </IconButton>
            </Fragment>
          ) : (
            <Fragment>
              <Checkbox
                id="checkbox"
                disableRipple
                color="default"
                inputProps={{ 'aria-label': 'decorative checkbox' }}
                // onClick={this.handleCheckboxClick}
                defaultChecked={item.checked}
              />
              <label style={{ textDecoration: item.checked ? 'line-through' : 'none' }}>{item.value}</label>
              <IconButton id="editButton" onClick={this.handleEditClick} aria-label="edit">
                <EditIcon fontSize="small"/>
              </IconButton>
              <span className="id">{item._id}</span>
              <IconButton id="deleteButton" onClick={() => remove(item.id)} aria-label="delete">
                <DeleteIcon fontSize="small"/>
              </IconButton>
            </Fragment>
          )
        }
      </li>
    )
  }
}
export default TodoItem;
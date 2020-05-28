import React, { Component, Fragment, createRef } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

class TodoItem extends Component {
  state = {
    editMode: false
  };

  editRef = createRef();
  
  handleEditClick = () => {
    this.setState({editMode: true});
  };

  handleCancel = () => {
    this.setState({editMode: false });
  };

  handleSubmit = (e) => {
    const {edit, item} = this.props;
    if (this.editRef.current.value.trim()) {
      edit(e, item.id, this.editRef.current.value);
      this.setState({editMode: false});   
    } else {
      alert("Please enter something :)")
    }  
  }

  render() {
    const { editMode } = this.state;
    const { item, remove, check } = this.props;
    return (
      <li>
        {
          editMode ? (
            <Fragment>
              <TextField
                variant="outlined"
                size="small"
                defaultValue={item.value}
                inputRef={this.editRef}
                onKeyPress={(e)=> {if (e.key === "Enter") this.handleSubmit(e)}} />
              <IconButton id="submitButton" onClick={(e)=> this.handleSubmit(e)}>
                <DoneRoundedIcon fontSize="small"/>
              </IconButton>
              <IconButton id="cancelButton" onClick={this.handleCancel}>
                <CloseRoundedIcon fontSize="small"/>
              </IconButton>
            </Fragment>
          ) : (
            <Fragment>
              <Checkbox
                id="checkbox"
                disableRipple
                color="default"
                inputProps={{ 'aria-label': 'decorative checkbox' }}
                onClick={()=> check(item.id)}
                checked={item.checked}
              />
              <label style={{ textDecoration: item.checked ? 'line-through' : 'none' }}>{item.value}</label>
              
              <IconButton id="editButton" onClick={this.handleEditClick} aria-label="edit">
                <EditIcon fontSize="small"/>
              </IconButton>

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
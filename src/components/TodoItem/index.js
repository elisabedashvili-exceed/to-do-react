import React, { Component, Fragment } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      checked: false
    };
  }
  
  
  handleEditClick = () => {
    this.setState({...this.state, editMode: true});
  };

  handleCancel = () => {
    this.setState({...this.state, editMode: false });
  };

  render() {
    const { editMode, checked } = this.state;
    const { item, remove, edit, check } = this.props;
    return (
      <li>
        {
          editMode ? (
            <Fragment>
              <TextField
                id="outlined-basic" 
                variant="outlined"
                size="small"
                defaultValue={item.value}
                onKeyPress={(e)=> {
                  if (e.key === "Enter") {
                    if (e.target.value.trim()) {
                      edit(e, item.id, e.target.value);
                      this.setState({...this.state, editMode: false});   
                    } else {
                      alert("Please enter something :)")
                    }           
                  }
                  }} />
              <IconButton id="submitButton" onClick={(e)=> {
                if (e.target.closest("button").previousElementSibling.querySelector("input").value.trim()) {
                  edit(e, item.id, e.target.closest("button").previousElementSibling.querySelector("input").value);
                  this.setState({...this.state, editMode: false});
                } else {
                  alert("Please enter something :)")
                }
              }}>
                <DoneRoundedIcon fontSize="small"/>
              </IconButton>
              <span className="id">{item._id}</span>
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
                onClick={()=> {check(item.id); this.setState({...this.state, checked: (checked === true ? false : true)})}}
                checked={this.state.checked === false ? false : true}
              />
              <label style={{ textDecoration: checked ? 'line-through' : 'none' }}>{item.value}</label>
              
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
import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import serialiseForm from 'form-serialize';
import  ImageInput from './ImageInput';


export default class CreateContact extends Component {

  handleOnsubmit = (e) =>{
    e.preventDefault()
    const values = serialiseForm(e.target, {hash: true})
    if(this.props.onCreateContact){
      this.props.onCreateContact(values)
    }
  }
  render() {

    return (
      <div>
        <Link className="close-create-contact"
        to="/">Close</Link>
        <form className="create-contact-form" onSubmit={this.handleOnsubmit}>
          <ImageInput className="create-contact-avatar-input" name="avatarURL" maxHeight={64}/>
          <div className="create-contact-details">
            <input type="text" name="name" placeholder="Name"/>
            <input type="text" name="handle" placeholder="Handle"/>
            <button>Add contact</button>
          </div>
        </form>
      </div>
    )
  }
}


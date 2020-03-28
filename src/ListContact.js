import React, {Component} from 'react';
import PropsTypes from 'prop-types';
import {Link} from 'react-router-dom';

class ListContacts extends Component{

  static PropsTypes = {
    contacts: PropsTypes.array.isRequired,
    onDeleteContact: PropsTypes.func.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim()
    }))
  }

  clearQuery = () => {
    this.updateQuery('')
  }

  render(){

    const {query} = this.state
    const {contacts, onDeleteContact} = this.props

    const showingContacts = query === "" ? contacts : contacts.filter((contact) => (
      contact.name.toLowerCase().includes(query.toLowerCase())
    ))

    return(
      <div className="list-contacts">
        <div className = "list-contacts-top">
          <input 
            type="text" 
            className="search-contacts"
            placeholder="Search contacts"
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
          <Link to='/create' className="add-contact">Add contact</Link>
        </div>
        {showingContacts.length !== contacts.length && (
          <div className="showing-contacts">
            <span>Now showing {showingContacts.length} of {contacts.length}</span>
            <button onClick={this.clearQuery}>Show all</button>
          </div>
        )}
        <ol className="contact-list">
          {showingContacts.map((contact) => (
            <li key={contact.id} className="contact-list-item">          
              <div 
              className="contact-avatar"
              style={{"backgroundImage": `url(${contact.avatarURL})`}}>
              </div>
              <div className="contact-details">
                <p>{contact.name}</p>
                <p>@{contact.handle}</p>
              </div>
              <button 
                className="contact-remove"
                onClick = {() => onDeleteContact(contact)}
                >
                Remove
              </button>
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

export default ListContacts;

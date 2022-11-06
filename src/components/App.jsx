import React from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import styles from './App.module.css';

class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleSubmit = ev => {
    ev.preventDefault();
    const form = ev.currentTarget;
    const name = form.elements.name.value;
    const number = form.elements.number.value;

    const isExist = this.state.contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isExist) {
      alert(`${name} is already in contacts.`);
      return;
    }

    this.setState(prev => ({
      contacts: [
        ...prev.contacts,
        { name: name, id: nanoid(), number: number },
      ],
    }));

    form.reset();
  };

  handleChange = ev => {
    this.setState({ filter: ev.currentTarget.value });
  };

  filter = () => {
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  delete = ev => {
    const filteredContacts = this.state.contacts.filter(
      contact => contact.id !== ev.target.id
    );

    this.setState({
      contacts: filteredContacts,
    });
  };

  componentDidMount() {
    const storageContacts = JSON.parse(localStorage.getItem('Contacts'));

    if (storageContacts) {
      this.setState({ contacts: storageContacts });
    }
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('Contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    return (
      <>
        <div className={styles.section}>
          <h1>Phonebook</h1>
          <ContactForm formSubmit={this.handleSubmit} />
          <h2>Contacts</h2>
          <Filter inputChange={this.handleChange} />
          <ContactList listFilter={this.filter} listDelete={this.delete} />
        </div>
      </>
    );
  }
}

export default App;
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import styles from './App.module.css';

const App = () => {
  const contactsDefault = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];

  let [contacts, setContacts] = useState(JSON.parse(localStorage.getItem('Contacts')) || contactsDefault);
  let [filter, setFilter] = useState('');

  const handleSubmit = ev => {
    ev.preventDefault();
    const form = ev.currentTarget;
    const name = form.elements.name.value;
    const number = form.elements.number.value;

    const isExist = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isExist) {
      alert(`${name} is already in contacts.`);
      return;
    }

    setContacts([...contacts, { name: name, id: nanoid(), number: number }]);
    form.reset();
  };

  const handleChange = ev => {
    setFilter((ev.currentTarget.value));
  };

  const filterItems = () => {
    const filteredItems = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return filteredItems;
  };

  const deleteItem = ev => {
    const filteredContacts = contacts.filter(
      contact => contact.id !== ev.target.id
    );
    setContacts((filteredContacts));
  };

  useEffect(() => {
    localStorage.setItem('Contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <>
      <ErrorBoundary>
        <div className={styles.section}>
          <h1>Phonebook</h1>
          <ContactForm formSubmit={handleSubmit} />
          <h2>Contacts</h2>
          <Filter inputChange={handleChange} />
          <ContactList listFilter={filterItems} listDelete={deleteItem} />
        </div>
      </ErrorBoundary>
    </>
  );
};

export default App;

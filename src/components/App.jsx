import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { GlobalStyle } from './GlobalStyle';
import { Form } from './Form/Form';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';
import css from './App.module.css';

export const App = () => {
  // state = {
  //   contacts: [],
  //   filter: '',
  // };

  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const addContact = (newContacts) => {
    if (contacts.some(el => el.name === newContacts.name)) {
      alert(`${newContacts.name} is already in contacts!`);
      return;
    }
    const contactsList = { id: nanoid(), ...newContacts };
    setContacts(prevContacts => [contactsList, ...prevContacts]);
    // this.setState({
    //   contacts: [contactsList, ...this.state.contacts],
    // });
  };

  const searchContact = event => {
    const value = event.target.value;
    setFilter(value);
    // this.setState({
    //   filter: value,
    // });
  };

  const deleteContact = id => {
    setContacts(prevContacts => prevContacts.filter(el => el.id !== id));
    // this.setState({
    //   contacts: this.state.contacts.filter(el => el.id !== id),
    // });
  };

  const filterContact = contacts.filter(el =>
    el.name.toLowerCase().includes(filter.toLowerCase().trim())
  );
  return (
    <>
      <GlobalStyle />
      <div className={css.container}>
        <h1>Phonebook</h1>
        <Form onAddContact={addContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onSearch={searchContact} />
        <Contacts contacts={filterContact} onDelete={deleteContact} />
      </div>
    </>
  );
};

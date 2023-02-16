import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { GlobalStyle } from './GlobalStyle';
import { Form } from './Form/Form';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';
import css from './App.module.css';

const LOCAL_KEY = 'contacts';

export const App = () => {

  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const getLocalContacts = JSON.parse(localStorage.getItem(LOCAL_KEY));
    if (getLocalContacts === null) {
      return;
    }
    setContacts(getLocalContacts);
  }, []);

  useEffect(() => {
        const setLocalContacts = JSON.stringify(contacts);
        console.log(setLocalContacts)
        localStorage.setItem(LOCAL_KEY, setLocalContacts);
  }, [contacts]);


  const addContact = newContacts => {
    if (contacts.some(el => el.name === newContacts.name)) {
      alert(`${newContacts.name} is already in contacts!`);
      return;
    }
    const contactsList = { id: nanoid(), ...newContacts };
    setContacts(prevContacts => [contactsList, ...prevContacts]);
  };

  const searchContact = event => {
    const value = event.target.value;
    setSearch(value);
  };

  const deleteContact = id => {
    setContacts(prevContacts => prevContacts.filter(el => el.id !== id));
  };

  const filterContact = contacts.filter(el =>
    el.name.toLowerCase().includes(search.toLowerCase().trim())
  );
  
  return (
    <>
      <GlobalStyle />
      <div className={css.container}>
        <h1>Phonebook</h1>
        <Form onAddContact={addContact} />
        <h2>Contacts</h2>
        <Filter value={search} onSearch={searchContact} />
        <Contacts contacts={filterContact} onDelete={deleteContact} />
      </div>
    </>
  );
};

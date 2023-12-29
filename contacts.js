const fs = require("fs").promises;
const path = require("path");

const contactsPath = "./db/contacts.json";

const setContactId = () => {
  const newId = Math.floor(Math.random() * 100000);
  return newId;
};

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    console.table(contacts);
  } catch (err) {
    console.log(err.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const contact = contacts.find(
      (contact) => contact.id === contactId.toString()
    );
    console.log(contact);
  } catch (err) {
    console.log(err.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId.toString()
    );
    fs.writeFile(
      contactsPath,
      JSON.stringify(updatedContacts)
      // const newData = await fs.writeFile(
      //   contactsPath,
      //   JSON.stringify(updatedContacts)
    );
  } catch (err) {
    console.log(err.message);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const id = setContactId().toString();
    const newContact = { id, name, email, phone };

    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    const withAddedContact = [...contacts, newContact];

    fs.writeFile(contactsPath, JSON.stringify(withAddedContact));
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

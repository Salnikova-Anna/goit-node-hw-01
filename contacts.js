const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  const allContacts = await fs.readFile(contactsPath);
  return JSON.parse(allContacts);
}

async function getContactById(contactId) {
  const allContacts = await listContacts();
  const contactByID = allContacts.find((contact) => contact.id === contactId);
  return console.log(contactByID || null);
}

async function removeContact(contactId) {
  const allContacts = await listContacts();
  const removedContactindex = allContacts.findIndex(
    (contact) => contact.id === contactId
  );

  if (removedContactindex === -1) {
    return console.log(null);
  }

  const [removedContact] = allContacts.splice(removedContactindex, 1);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return console.log(removedContact);
}

async function addContact(name, email, phone) {
  const allContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return console.log(newContact);
}

module.exports = {
  contactsPath,
  listContacts,
  getContactById,
  addContact,
  removeContact,
};

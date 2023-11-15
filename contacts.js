const fs = require("node:fs/promises");
const path = require("node:path");
const { nanoid } = require("nanoid");

const contactsPath = path.format({
  dir: "D:\\GO IT\\Homework\\NODE.JS\\Homework-01\\goit-node-hw-01\\db",
  base: "contacts.json",
});

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

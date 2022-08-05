import { nanoid } from "nanoid";
import fileSystem from "fs";
import path from "path";

const fs = fileSystem.promises;

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    console.table(JSON.parse(data));
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contactToGet = JSON.parse(data).find(({ id }) => id === contactId);
    if (contactToGet) {
      console.log(contactToGet);
    } else {
      console.log("ups, there is no contact with such id");
      return;
    }
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const deletedContact = JSON.parse(data).find(({ id }) => id === contactId);
    if (deletedContact) {
      console.log(`contact ${deletedContact.name} was deleted`);
    } else {
      console.log("ups, there is no contact with such id");
      return;
    }
    const newContactList = JSON.parse(data).filter(
      ({ id }) => id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(newContactList), "utf8");
    console.log("new contactslist");
    console.table(newContactList);
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const parsedData = JSON.parse(data);
    const newContact = { id: nanoid(), name, email, phone };
    const newContactList = [...parsedData, newContact];

    await fs.writeFile(
      contactsPath,
      JSON.stringify(newContactList, null, 2),
      "utf8"
    );
    console.log(`${newContact.name} was added`);
    console.log("new contactslist");
    console.table(newContactList);
  } catch (error) {
    console.log(error);
  }
}

export { listContacts, getContactById, removeContact, addContact };

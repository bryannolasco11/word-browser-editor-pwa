import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate_db', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');

  const jateDb = await openDB('jate_db, 1');

  const tx = jateDb.transaction('jate_db', 'readwrite');

  const store =tx.objectStore('jate');

  const request= store.put({id:1, content: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  // Create a connection to the database and version we want to use.
  const jateDb = await openDB('jate_db', 1);

  // Create a new transaction and specify the store and data privileges.
  const tx = jateDb.transaction('jate', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .getAll() method to get all data in the database.
  const request = store.getAll();

  // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result?.value;

  
};


initdb();
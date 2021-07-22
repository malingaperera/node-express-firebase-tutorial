// "use strict"; Defines that JavaScript code should be executed in "strict mode".
// "strict mode" is good for backend code where you need clean code https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
"use strict";

// importing firestore node module
const { Firestore } = require("@google-cloud/firestore");

// GCloud deployment
// const db = new Firestore();

// Local deployment
const db = new Firestore({
  projectId: "node-tutorial-319303",
  keyFilename:
    "C:\\Malinga - Other\\Web Development\\Vanessa\\node-express-firebase-tutorial\\node-tutorial-319303-c26e5354f957.json"
});

const collection = "Users";

// Lists all records in the database sorted alphabetically by title.
// This allows pagination you can get the documents in several groups
// Pagination will come in handy when our document store grows.
async function list(limit) {
  const snapshot = await db.collection(collection).limit(limit).get();

  const records = [];
  snapshot.forEach((doc) => {
    let record = doc.data();
    record.id = doc.id;
    records.push(record);
  });

  return {
    records: records
  };
}

// Updates a existing record
async function update(id, data) {
  return await db
    .collection(collection)
    .doc(id)
    .update({ ...data });
}

// Creates a new record
async function create(id, data) {
  let ref;
  ref = db.collection(collection).doc(id);

  await ref.set(data);
  return data;
}

// Read single record
async function read(id) {
  const doc = await db.collection(collection).doc(id).get();

  if (!doc.exists) {
    throw new Error("No such document!");
  }
  return doc.data();
}

// Delete a record
async function _delete(id) {
  await db.collection(collection).doc(id).delete();
}

module.exports = {
  create,
  read,
  update,
  delete: _delete,
  list
};

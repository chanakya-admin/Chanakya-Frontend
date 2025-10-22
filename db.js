const { Low, JSONFile } = require('lowdb');
const path = require('path');
const fs = require('fs');

const file = path.join(__dirname, 'data.json');
if (!fs.existsSync(file)) fs.writeFileSync(file, JSON.stringify({ users: [], courses: [] }, null, 2));

const adapter = new JSONFile(file);
const db = new Low(adapter);

async function init() {
  await db.read();
  db.data ||= { users: [], courses: [] };
  await db.write();
}

module.exports = { db, init };
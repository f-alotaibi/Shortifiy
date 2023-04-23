const dbconnection = require('./DBCon');

async function createTable() {
  await dbconnection.query(`create table if not exists URLS(URI CHAR(7), URL VARCHAR(2048) NOT NULL, PRIMARY KEY(URI));`);
}

async function getURI(website) {
  const query = 'SELECT URI FROM URLS WHERE URL = ?';
  const response = await dbconnection.query(query, [website]);
  if (response[0].length > 0) {
    return response[0][0]["URI"];
  }
}

async function getURL(uri) {
  const query = 'SELECT URL FROM URLS WHERE URI = ?';
  const response = await dbconnection.query(query, [uri]);
  if (response[0].length > 0) {
    return response[0][0]["URL"];
  }
}

async function makeID(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

async function getID(website) {
  if (!(website.includes("https://") || website.includes("http://"))) {
    website = "http://" + website;
  }
  let id = await getURI(website);
  if (!id) {
    id = await makeID(7);
    let fullurl = await getURL(id);
    if (fullurl) {
      id = await getID(website);
    }
    const query = 'INSERT INTO URLS VALUES(? , ?)';
    dbconnection.query(query, [id, website]);
  }
  return id;
}

createTable();

module.exports.getID = getID
module.exports.getURI = getURI
module.exports.getURL = getURL
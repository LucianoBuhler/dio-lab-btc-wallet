const fs = require('fs');
const path = require('path');

// Function to append a new wallet to the wallets.json file
/*
INPUT EXAMPLE
const newWallet = {
  privKey: 'examplePrivateKey',
  seeds: 'exampleSeedPhrase',
  format: 'p2wpkh'
};

*/
function addNewWallet(newWallet) {
  // Define the directory and file paths
  const dirPath = path.join(__dirname, '..', 'output');  // Move OUTPUT outside src
  const filePath = path.join(dirPath, 'wallets.json');

  // Ensure the OUTPUT directory exists
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }

  // Ensure the wallets.json file exists
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({ wallets: [] }, null, 2));
  }

  // Read the existing data from the file
  const data = fs.readFileSync(filePath);
  const walletsData = JSON.parse(data);

  // Add timestamp and datetime to the new wallet object
  const timestamp = Date.now();
  const datetime = new Date(timestamp).toISOString().replace('T', ' ').slice(0, 16);
  newWallet.timestamp = timestamp;
  newWallet.datetime = datetime;

  // Add the new wallet to the array and write back to the file
  walletsData.wallets.push(newWallet);
  fs.writeFileSync(filePath, JSON.stringify(walletsData, null, 2));
}

module.exports = { addNewWallet };
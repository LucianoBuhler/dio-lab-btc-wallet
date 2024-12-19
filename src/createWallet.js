const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');
const { addNewWallet } = require('./utils');

/**
 * Generates a Bitcoin wallet in the specified format (p2pkh or p2wpkh) for Testnet.
 * 
 * @param {string} format - The address format, either 'p2wpkh' or 'p2pkh'. Default is 'p2pkh'.
 */
async function createTestnetWallet(format = 'p2pkh') {
  // Validate the format
  if (!['p2wpkh', 'p2pkh'].includes(format)) {
    throw new Error("Invalid address format specified. Use 'p2wpkh' or 'p2pkh'.");
  }
  // Generate a mnemonic (BIP39)
  const mnemonic = bip39.generateMnemonic();
  console.log('Mnemonic:', mnemonic);

  // Convert the mnemonic into a seed
  const seed = await bip39.mnemonicToSeed(mnemonic);

  // Create a BIP32 root key using the seed for the testnet
  const root = bip32.fromSeed(seed, bitcoin.networks.testnet);

  // Derive the first account based on the selected format
  let account;
  if (format === 'p2wpkh') {
    account = root.derivePath("m/84'/1'/0'/0/0");
  } else {
    account = root.derivePath("m/44'/1'/0'/0/0");
  }

  // Generate the address
  const { address } = bitcoin.payments[format]({
    pubkey: account.publicKey,
    network: bitcoin.networks.testnet,
  });

  // Get the created wallet info to save
  const newWallet = {
    address: address,
    privKey: account.toWIF(),
    seed: mnemonic,
    format: format
  };

  // Log the info for import into Electrum
  console.log(newWallet);

  // Save wallet info 
  addNewWallet(newWallet);
  console.log('New wallet added successfully!');
}

// Get the format argument from the command line
const format = process.argv[2] || 'p2pkh';

// Execute the wallet creation with the specified format
createTestnetWallet(format).catch(console.error);

# BTC Wallet Generator (DIO Lab)

This project is a Node.js application designed to generate Bitcoin wallets. It supports both `p2wpkh` (SegWit) and `p2pkh` (legacy) address formats to handle compatibility issues with various Bitcoin faucet providers, as discussed in the project's forum. The codebase has been refactored into functions to promote reusability across different projects. Additionally, generated wallets, along with their private keys and mnemonic seeds, are saved in the `output` directory within a `wallets.json` file, ensuring that these records are not lost.

## Features

- **SegWit and Legacy Support**: Generate both `p2wpkh` and `p2pkh` addresses.
- **Reusable Functions**: Improved code structure for easy integration into other projects.
- **Persistent Storage**: Wallet details are stored in a `wallets.json` file in the `output` directory.
- **Console Outputs**: Wallet addresses and keys are printed to the console for quick access.

## Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications.
- **bip32**: For BIP32 hierarchical deterministic wallet operations.
- **bip39**: For mnemonic generation and seed conversion.
- **bitcoinjs-lib**: To handle Bitcoin-related functions, including address generation.

## Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js and npm installed. [Download and install Node.js](https://nodejs.org/)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/LucianoBuhler/dio-lab-btc-wallet.git
   cd dio-lab-btc-wallet
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

### Running the Application
To run the wallet generator and create wallets:

  - **For a P2PKH address (default)**: 

  ```bash
  node src/createWallet.js
  ```

  - **For a P2WPKH address**:
  
  ```bash 
  node src/createWallet.js p2wpkh
  ```

This command will generate Bitcoin wallets and save their details in `output/wallets.json`.

## Project Structure

btc-wallet-generator/
│
├── output/
│   └── wallets.json          # Stores generated wallet details
├── src/
│   └── createWallet.js       # Main script for wallet generation
│   └── utils.js              # Auxiliary functions for saving keys
├── .gitignore                # Specifies intentionally untracked files to ignore
├── package.json              # Project metadata and configuration
├── package-lock.json         # Describes the exact dependency tree
└── README.md                 # Project documentation

## Explanation

### createWallet.js

1. **Function Parameter**:
   - The `createTestnetWallet` function accepts a `format` parameter. It defaults to `'p2pkh'` if no format is specified.

2. **Command-Line Argument**:
   - The function reads the `format` parameter from `process.argv[2]`, which captures command-line input. If no argument is provided, it defaults to `'p2pkh'`.

3. **Address Derivation Path**:
   - For `p2wpkh` (SegWit): The derivation path is `m/84'/1'/0'/0/0`.
   - For `p2pkh` (legacy): The derivation path is `m/44'/1'/0'/0/0`.

4. **Address Generation**:
   - The `bitcoin.payments` object is used to generate the respective type of address based on the format.

5. **Error Handling**:
   - An error is thrown if an invalid format is specified to ensure robustness.


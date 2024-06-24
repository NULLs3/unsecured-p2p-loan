# DeFi Protocol - Unsecured Loans

This project is a decentralized finance (DeFi) protocol that provides unsecured loans. It consists of a frontend application built with React.js and TypeScript, a backend using Solidity and Hardhat, and zkSNARK implementation using Circom for zero-knowledge proofs.

## Features

- Investors can provide liquidity to the lending pool using $ETH.
- Borrowers can borrow from the lending pool after providing a verifiable credential.
- Borrowing is limited by a zero-knowledge proof to ensure the total amount borrowed is less than $10K.

## Technologies

- **Frontend**: React.js, TypeScript, Web3.js
- **Backend**: Solidity, Hardhat
- **zkSNARK**: Circom, snarkjs

## Project Structure

```plaintext
/
├── contracts/
├── frontend/
└── zk/
```
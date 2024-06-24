#!/bin/bash

# Compile the circuit
circom circuits/loan_eligibility.circom --r1cs --wasm --sym

# Generate the witness generation binary
npx snarkjs wtns calculate circuits/loan_eligibility.wasm input.json witness.wtns

# Generate a zkey file (this step is for testing, use a real ceremony for production)
npx snarkjs groth16 setup circuits/loan_eligibility.r1cs powersOfTau28_hez_final_10.ptau loan_eligibility.zkey

# Export the verification key
npx snarkjs zkey export verificationkey loan_eligibility.zkey verification_key.json

# Generate a proof (you'll need to create an input.json file)
npx snarkjs groth16 prove loan_eligibility.zkey witness.wtns proof.json public.json

# Verify the proof
npx snarkjs groth16 verify verification_key.json public.json proof.json

# Generate Solidity verifier
npx snarkjs zkey export solidityverifier loan_eligibility.zkey verifier.sol
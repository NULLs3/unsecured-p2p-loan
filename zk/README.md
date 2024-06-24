### zk proofs

#### run

Install dependencies

```bash
npm install -g circom snarkjs
npm i
```

Then, Make the script executable:

```bash
chmod +x scripts/compile_circuit.sh
```

Install powers-of-tau file

```bash
wget https://hermez.s3-eu-west-1.amazonaws.com/powersOfTau28_hez_final_10.ptau
```

Run the script
```bash
./scripts/compile_circuit.sh
```
include "../../../node_modules/circomlib/circuits/comparators.circom";
include "../../../node_modules/circomlib/circuits/poseidon.circom";

template LoanEligibility() {
    signal input totalBorrowed;
    signal input maxAllowed;
    signal output eligible;

    component lessThan = LessThan(64);
    lessThan.in[0] <== totalBorrowed;
    lessThan.in[1] <== maxAllowed;

    eligible <== lessThan.out;
}

component main = LoanEligibility();
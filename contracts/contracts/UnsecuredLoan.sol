// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

contract UnsecuredLoan {
    struct Loan {
        address borrower;
        uint256 amount;
        uint256 repaymentAmount;
        uint256 dueDate;
        bool repaid;
    }

    mapping(address => Loan[]) public loans;
    mapping(address => bool) public certificateHolders;

    address public owner;

    event LoanCreated(address indexed borrower, uint256 amount, uint256 repaymentAmount, uint256 dueDate);
    event LoanRepaid(address indexed borrower, uint256 amount);

    constructor() payable {
        owner = msg.sender;
    }

    function requestLoan(uint256 _repaymentAmount, uint256 _duration) external payable {
        require(certificateHolders[msg.sender], "Borrower does not have a valid certificate");
        require(address(this).balance >= msg.value, "Contract does not have enough ETH");

        uint256 dueDate = block.timestamp + _duration;
        loans[msg.sender].push(Loan(msg.sender, msg.value, _repaymentAmount, dueDate, false));

        payable(msg.sender).transfer(msg.value);

        emit LoanCreated(msg.sender, msg.value, _repaymentAmount, dueDate);
    }

    function repayLoan(uint256 _loanIndex) external payable {
        Loan storage loan = loans[msg.sender][_loanIndex];
        require(!loan.repaid, "Loan already repaid");
        require(block.timestamp <= loan.dueDate, "Loan is overdue");
        require(msg.value == loan.repaymentAmount, "Incorrect repayment amount");

        loan.repaid = true;

        emit LoanRepaid(msg.sender, msg.value);
    }

    function submitCertificate(address _holder, bytes memory _signature) external {
        bytes32 message = keccak256(abi.encodePacked(_holder));
        bytes32 ethSignedMessageHash = MessageHashUtils.toEthSignedMessageHash(message);
        address signer = ECDSA.recover(ethSignedMessageHash, _signature);
        require(signer == owner, "Invalid certificate signature");
        certificateHolders[_holder] = true;
    }

    receive() external payable {}

    function withdraw() external {
        require(msg.sender == owner, "Only owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }
}
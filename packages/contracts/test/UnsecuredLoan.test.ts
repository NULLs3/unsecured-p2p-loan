import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { UnsecuredLoan } from "../typechain-types";

describe("UnsecuredLoan", function () {
  let unsecuredLoan: UnsecuredLoan;
  let owner: SignerWithAddress;
  let borrower: SignerWithAddress;

  beforeEach(async function () {
    [owner, borrower] = await ethers.getSigners();

    // Deploy UnsecuredLoan contract with initial ETH
    const UnsecuredLoanFactory = await ethers.getContractFactory("UnsecuredLoan");
    unsecuredLoan = await UnsecuredLoanFactory.deploy({ value: ethers.parseEther("1000") });
    unsecuredLoan.deploymentTransaction();

    // Submit certificate for borrower
    const message = ethers.solidityPackedKeccak256(["address"], [borrower.address]);
    const signature = await owner.signMessage(ethers.getBytes(message));
    await unsecuredLoan.submitCertificate(borrower.address, signature);
  });

  it("Should allow a certified borrower to request a loan", async function () {
    const loanAmount = ethers.parseEther("10");
    const repaymentAmount = ethers.parseEther("11");
    const duration = 60 * 60 * 24 * 30; // 30 days

    const tx = await unsecuredLoan.connect(borrower).requestLoan(repaymentAmount, duration, { value: loanAmount });
    const receipt = await tx.wait();
    const block = await ethers.provider.getBlock(receipt!.blockNumber);
    const expectedDueDate = block!.timestamp + duration;

    const event = receipt!.events!.find(e => e.event === "LoanCreated");
    expect(event!.args![0]).to.equal(borrower.address);
    expect(event!.args![1]).to.equal(loanAmount);
    expect(event!.args![2]).to.equal(repaymentAmount);
    expect(event!.args![3]).to.be.closeTo(expectedDueDate, 1); // Allow 1 second difference

    const contractBalance = await ethers.provider.getBalance(await unsecuredLoan.getAddress());
    expect(contractBalance).to.equal(ethers.parseEther("1000")); // Contract balance should remain the same
  });

  it("Should allow a borrower to repay a loan", async function () {
    const loanAmount = ethers.parseEther("10");
    const repaymentAmount = ethers.parseEther("11");
    const duration = 60 * 60 * 24 * 30; // 30 days

    await unsecuredLoan.connect(borrower).requestLoan(repaymentAmount, duration, { value: loanAmount });

    const tx = await unsecuredLoan.connect(borrower).repayLoan(0, { value: repaymentAmount });
    const receipt = await tx.wait();

    const event = receipt!.reorderedEvent()
    events!.find(e => e.event === "LoanRepaid");
    expect(event!.args![0]).to.equal(borrower.address);
    expect(event!.args![1]).to.equal(repaymentAmount);

    const contractBalance = await ethers.provider.getBalance(await unsecuredLoan.getAddress());
    expect(contractBalance).to.equal(ethers.parseEther("1011")); // Initial 1000 + 11 repayment
  });
});
import Web3 from "web3";

let web3;

if (window.ethereum) {
  web3 = new Web3(window.ethereum);
  try {
    window.ethereum.request({ method: "eth_requestAccounts" });
    console.log("用户已授权");
  } catch (error) {
    console.error("用户不允许授权");
  }
} else if (window.web3) {
  web3 = new Web3(window.web3.currentProvider);
} else {
  console.error("没有检测到以太坊钱包");
}

export default web3;

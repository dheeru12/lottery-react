import Web3 from 'web3'
console.log(window.web3.currentProvdider);
const web3=new Web3(window['ethereum'] || window.web3.currentProvider);
window.ethereum.enable();
export default web3;
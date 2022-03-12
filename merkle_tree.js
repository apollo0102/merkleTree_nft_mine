const { MerkleTree } = require('merkletreejs')
const keccak256 = require('keccak256')
const fs = require('fs');

let rawdata = fs.readFileSync(`./whitelist.json`)
let whitelistAddresses = JSON.parse(rawdata)
console.log('whitelistAddresses: ', whitelistAddresses)
const leaves = whitelistAddresses.map((v) => keccak256(v))
const tree = new MerkleTree(leaves, keccak256, { sort: true })
const root = tree.getHexRoot()

//verify leaf
const leaf = keccak256("0x81a96dDC6c4042d8FDF75e38E31A0b43684D3E5D")
const proof = tree.getHexProof(leaf)
const verified = tree.verify(proof, leaf, root)
console.log('root: ', root)
console.log('leaf: ', leaf)
console.log('proof: ', proof)
console.log('verified: ', verified)

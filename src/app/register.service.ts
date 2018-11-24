import { Injectable } from '@angular/core';
import { EnsService } from './ens.service';
import { ContractService } from './contract.service';
import { ConnectService } from './connect.service';

// tslint:disable-next-line:max-line-length
const abi = [ { 'inputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'constructor' }, { 'anonymous': false, 'inputs': [ { 'indexed': true, 'name': 'key', 'type': 'bytes32' }, { 'indexed': true, 'name': 'purpose', 'type': 'uint256' }, { 'indexed': true, 'name': 'keyType', 'type': 'uint256' } ], 'name': 'KeyAdded', 'type': 'event' }, { 'anonymous': false, 'inputs': [ { 'indexed': true, 'name': 'key', 'type': 'bytes32' }, { 'indexed': true, 'name': 'purpose', 'type': 'uint256' }, { 'indexed': true, 'name': 'keyType', 'type': 'uint256' } ], 'name': 'KeyRemoved', 'type': 'event' }, { 'anonymous': false, 'inputs': [ { 'indexed': true, 'name': 'executionId', 'type': 'uint256' }, { 'indexed': true, 'name': 'to', 'type': 'address' }, { 'indexed': true, 'name': 'value', 'type': 'uint256' }, { 'indexed': false, 'name': 'data', 'type': 'bytes' } ], 'name': 'ExecutionRequested', 'type': 'event' }, { 'anonymous': false, 'inputs': [ { 'indexed': true, 'name': 'executionId', 'type': 'uint256' }, { 'indexed': true, 'name': 'to', 'type': 'address' }, { 'indexed': true, 'name': 'value', 'type': 'uint256' }, { 'indexed': false, 'name': 'data', 'type': 'bytes' } ], 'name': 'Executed', 'type': 'event' }, { 'anonymous': false, 'inputs': [ { 'indexed': true, 'name': 'executionId', 'type': 'uint256' }, { 'indexed': false, 'name': 'approved', 'type': 'bool' } ], 'name': 'Approved', 'type': 'event' }, { 'constant': true, 'inputs': [ { 'name': '_key', 'type': 'bytes32' } ], 'name': 'getKey', 'outputs': [ { 'name': 'purposes', 'type': 'uint256[]' }, { 'name': 'keyType', 'type': 'uint256' }, { 'name': 'key', 'type': 'bytes32' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [ { 'name': '_key', 'type': 'bytes32' } ], 'name': 'getKeyPurposes', 'outputs': [ { 'name': 'purposes', 'type': 'uint256[]' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [ { 'name': '_purpose', 'type': 'uint256' } ], 'name': 'getKeysByPurpose', 'outputs': [ { 'name': '_keys', 'type': 'bytes32[]' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': false, 'inputs': [ { 'name': '_key', 'type': 'bytes32' }, { 'name': '_purpose', 'type': 'uint256' }, { 'name': '_type', 'type': 'uint256' } ], 'name': 'addKey', 'outputs': [ { 'name': 'success', 'type': 'bool' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' }, { 'constant': false, 'inputs': [ { 'name': '_id', 'type': 'uint256' }, { 'name': '_approve', 'type': 'bool' } ], 'name': 'approve', 'outputs': [ { 'name': 'success', 'type': 'bool' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' }, { 'constant': false, 'inputs': [ { 'name': '_to', 'type': 'address' }, { 'name': '_value', 'type': 'uint256' }, { 'name': '_data', 'type': 'bytes' } ], 'name': 'execute', 'outputs': [ { 'name': 'executionId', 'type': 'uint256' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' }, { 'constant': false, 'inputs': [ { 'name': '_key', 'type': 'bytes32' }, { 'name': '_purpose', 'type': 'uint256' } ], 'name': 'removeKey', 'outputs': [ { 'name': 'success', 'type': 'bool' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' }, { 'constant': true, 'inputs': [ { 'name': '_key', 'type': 'bytes32' }, { 'name': '_purpose', 'type': 'uint256' } ], 'name': 'keyHasPurpose', 'outputs': [ { 'name': 'exists', 'type': 'bool' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' } ];
// tslint:disable-next-line:max-line-length
const bytecode = '0x608060405234801561001057600080fd5b5073491a6a85B90Bd8d7B45a304BABf897fAd552F9266330864be560006040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060006040518083038186803b15801561007d57600080fd5b505af4158015610091573d6000803e3d6000fd5b50505050610c3c806100a46000396000f30060806040526004361061008e576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806312aaac70146100935780631d3812401461012f57806353d413c51461018c578063747442d3146101df5780639010f72614610230578063b61d27f6146102b2578063d202158d14610359578063fb307b34146103ac575b600080fd5b34801561009f57600080fd5b506100c26004803603810190808035600019169060200190929190505050610432565b60405180806020018481526020018360001916600019168152602001828103825285818151815260200191508051906020019060200280838360005b838110156101195780820151818401526020810190506100fe565b5050505090500194505050505060405180910390f35b34801561013b57600080fd5b5061017260048036038101908080356000191690602001909291908035906020019092919080359060200190929190505050610568565b604051808215151515815260200191505060405180910390f35b34801561019857600080fd5b506101c560048036038101908080356000191690602001909291908035906020019092919050505061063a565b604051808215151515815260200191505060405180910390f35b3480156101eb57600080fd5b5061021660048036038101908080359060200190929190803515159060200190929190505050610703565b604051808215151515815260200191505060405180910390f35b34801561023c57600080fd5b5061025b600480360381019080803590602001909291905050506107c8565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b8381101561029e578082015181840152602081019050610283565b505050509050019250505060405180910390f35b3480156102be57600080fd5b50610343600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091929192905050506108d6565b6040518082815260200191505060405180910390f35b34801561036557600080fd5b50610392600480360381019080803560001916906020019092919080359060200190929190505050610a31565b604051808215151515815260200191505060405180910390f35b3480156103b857600080fd5b506103db6004803603810190808035600019169060200190929190505050610afa565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b8381101561041e578082015181840152602081019050610403565b505050509050019250505060405180910390f35b606060008073491a6a85B90Bd8d7B45a304BABf897fAd552F92663b01a9fb36000866040518363ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018083815260200182600019166000191681526020019250505060006040518083038186803b1580156104b357600080fd5b505af41580156104c7573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f8201168201806040525060608110156104f157600080fd5b81019080805164010000000081111561050957600080fd5b8281019050602081018481111561051f57600080fd5b815185602082028301116401000000008211171561053c57600080fd5b505092919060200180519060200190929190805190602001909291905050509250925092509193909250565b600073491a6a85B90Bd8d7B45a304BABf897fAd552F926635d601c3a60008686866040518563ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180858152602001846000191660001916815260200183815260200182815260200194505050505060206040518083038186803b1580156105f657600080fd5b505af415801561060a573d6000803e3d6000fd5b505050506040513d602081101561062057600080fd5b810190808051906020019092919050505090509392505050565b600073491a6a85B90Bd8d7B45a304BABf897fAd552F926633f47616d600085856040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808481526020018360001916600019168152602001828152602001935050505060206040518083038186803b1580156106c057600080fd5b505af41580156106d4573d6000803e3d6000fd5b505050506040513d60208110156106ea57600080fd5b8101908080519060200190929190505050905092915050565b600073491a6a85B90Bd8d7B45a304BABf897fAd552F9266367d4865f600085856040518463ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018084815260200183815260200182151515158152602001935050505060206040518083038186803b15801561078557600080fd5b505af4158015610799573d6000803e3d6000fd5b505050506040513d60208110156107af57600080fd5b8101908080519060200190929190505050905092915050565b606073491a6a85B90Bd8d7B45a304BABf897fAd552F92663746199f96000846040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060006040518083038186803b15801561083e57600080fd5b505af4158015610852573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f82011682018060405250602081101561087c57600080fd5b81019080805164010000000081111561089457600080fd5b828101905060208101848111156108aa57600080fd5b81518560208202830111640100000000821117156108c757600080fd5b50509291905050509050919050565b600073491a6a85B90Bd8d7B45a304BABf897fAd552F92663e9356c6f60008686866040518563ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808581526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200183815260200180602001828103825283818151815260200191508051906020019080838360005b838110156109a0578082015181840152602081019050610985565b50505050905090810190601f1680156109cd5780820380516001836020036101000a031916815260200191505b509550505050505060206040518083038186803b1580156109ed57600080fd5b505af4158015610a01573d6000803e3d6000fd5b505050506040513d6020811015610a1757600080fd5b810190808051906020019092919050505090509392505050565b600073491a6a85B90Bd8d7B45a304BABf897fAd552F92663d8188a40600085856040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808481526020018360001916600019168152602001828152602001935050505060206040518083038186803b158015610ab757600080fd5b505af4158015610acb573d6000803e3d6000fd5b505050506040513d6020811015610ae157600080fd5b8101908080519060200190929190505050905092915050565b606073491a6a85B90Bd8d7B45a304BABf897fAd552F926630f982bac6000846040518363ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018083815260200182600019166000191681526020019250505060006040518083038186803b158015610b7857600080fd5b505af4158015610b8c573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f820116820180604052506020811015610bb657600080fd5b810190808051640100000000811115610bce57600080fd5b82810190506020810184811115610be457600080fd5b8151856020820283011164010000000082111715610c0157600080fd5b505092919050505090509190505600a165627a7a72305820d2ca2ec179fde39e0f4c1e20ef45d1e00626d1d724371fdd4a24fa2d217714250029';

@Injectable()
export class RegisterService {
  constructor(
    private ensService: EnsService,
    private contractService: ContractService,
    private connectService: ConnectService
  ) { }

  async createIdContract() {
    // Key Holder Library address = 0x491a6a85B90Bd8d7B45a304BABf897fAd552F926
    return await this.contractService.deployContract(abi, bytecode, []);
  }

  async registerKey(address: string) {
    const contract = await this.contractService.accessContract(address, abi);
    console.log(await contract.methods.getKeysByPurpose(1).call());
  }

  async register(appname: string, username: string) {
    console.log('In register service.');
    const idContractAddress = await this.createIdContract();
    console.log('Received contract: ' + idContractAddress);
    this.registerKey(idContractAddress);
    if (await this.ensService.createSubdomain(appname, username, idContractAddress) === false) {
      // Subdomain already exists.
      // Ask user if they want to log in.
    }
  }
}

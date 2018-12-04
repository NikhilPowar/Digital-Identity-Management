import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ContractService } from '../contract.service';
import { ConnectService } from '../connect.service';
import { TranscriptService } from '../transcript.service';

export class ApplicationErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

// tslint:disable-next-line:max-line-length
const transcriptApplicationABI = [ { 'constant': true, 'inputs': [], 'name': 'name', 'outputs': [ { 'name': '', 'type': 'string' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'courseName', 'outputs': [ { 'name': '', 'type': 'string' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'id', 'outputs': [ { 'name': '', 'type': 'string' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'courseCompletionYear', 'outputs': [ { 'name': '', 'type': 'uint256' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'courseStartYear', 'outputs': [ { 'name': '', 'type': 'uint256' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'inputs': [ { 'name': '_owner', 'type': 'address' }, { 'name': '_provider', 'type': 'address' }, { 'name': '_name', 'type': 'string' }, { 'name': '_id', 'type': 'string' }, { 'name': '_courseName', 'type': 'string' }, { 'name': '_startYear', 'type': 'uint256' }, { 'name': '_completionYear', 'type': 'uint256' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'constructor' }, { 'constant': true, 'inputs': [], 'name': 'getTranscriptHash', 'outputs': [ { 'name': '', 'type': 'string' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'getTranscriptOwner', 'outputs': [ { 'name': '', 'type': 'address' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': false, 'inputs': [ { 'name': 's', 'type': 'string' } ], 'name': 'setTranscriptHash', 'outputs': [ { 'name': '', 'type': 'string' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' } ];
// tslint:disable-next-line:max-line-length
const transcriptApplicationBytecode = '0x60806040523480156200001157600080fd5b5060405162000c7e38038062000c7e833981018060405260e08110156200003757600080fd5b81019080805190602001909291908051906020019092919080516401000000008111156200006457600080fd5b828101905060208101848111156200007b57600080fd5b81518560018202830111640100000000821117156200009957600080fd5b50509291906020018051640100000000811115620000b657600080fd5b82810190506020810184811115620000cd57600080fd5b8151856001820283011164010000000082111715620000eb57600080fd5b505092919060200180516401000000008111156200010857600080fd5b828101905060208101848111156200011f57600080fd5b81518560018202830111640100000000821117156200013d57600080fd5b505092919060200180519060200190929190805190602001909291905050506040805190810160405280600781526020017f4e6f74207365740000000000000000000000000000000000000000000000000081525060019080519060200190620001a992919062000291565b50866000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555085600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555084600390805190602001906200024392919062000291565b5083600490805190602001906200025c92919062000291565b5082600590805190602001906200027592919062000291565b5081600681905550806007819055505050505050505062000340565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620002d457805160ff191683800117855562000305565b8280016001018555821562000305579182015b8281111562000304578251825591602001919060010190620002e7565b5b50905062000314919062000318565b5090565b6200033d91905b80821115620003395760008160009055506001016200031f565b5090565b90565b61092e80620003506000396000f3fe60806040526004361061008e576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde031461009357806330125236146101235780633273e0fb146102645780639553de4e146102f4578063a124fc2314610384578063af640d0f146103db578063da5bd1591461046b578063f609a52614610496575b600080fd5b34801561009f57600080fd5b506100a86104c1565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100e85780820151818401526020810190506100cd565b50505050905090810190601f1680156101155780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561012f57600080fd5b506101e96004803603602081101561014657600080fd5b810190808035906020019064010000000081111561016357600080fd5b82018360208201111561017557600080fd5b8035906020019184600183028401116401000000008311171561019757600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050919291929050505061055f565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561022957808201518184015260208101905061020e565b50505050905090810190601f1680156102565780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561027057600080fd5b5061027961064a565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156102b957808201518184015260208101905061029e565b50505050905090810190601f1680156102e65780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561030057600080fd5b506103096106ec565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561034957808201518184015260208101905061032e565b50505050905090810190601f1680156103765780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561039057600080fd5b5061039961078a565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156103e757600080fd5b506103f06107b3565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610430578082015181840152602081019050610415565b50505050905090810190601f16801561045d5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561047757600080fd5b50610480610851565b6040518082815260200191505060405180910390f35b3480156104a257600080fd5b506104ab610857565b6040518082815260200191505060405180910390f35b60038054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105575780601f1061052c57610100808354040283529160200191610557565b820191906000526020600020905b81548152906001019060200180831161053a57829003601f168201915b505050505081565b6060600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156105f5576040805190810160405280600581526020017f4572726f720000000000000000000000000000000000000000000000000000008152509050610645565b816001908051906020019061060b92919061085d565b506040805190810160405280600781526020017f537563636573730000000000000000000000000000000000000000000000000081525090505b919050565b606060018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156106e25780601f106106b7576101008083540402835291602001916106e2565b820191906000526020600020905b8154815290600101906020018083116106c557829003601f168201915b5050505050905090565b60058054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156107825780601f1061075757610100808354040283529160200191610782565b820191906000526020600020905b81548152906001019060200180831161076557829003601f168201915b505050505081565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60048054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156108495780601f1061081e57610100808354040283529160200191610849565b820191906000526020600020905b81548152906001019060200180831161082c57829003601f168201915b505050505081565b60075481565b60065481565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061089e57805160ff19168380011785556108cc565b828001600101855582156108cc579182015b828111156108cb5782518255916020019190600101906108b0565b5b5090506108d991906108dd565b5090565b6108ff91905b808211156108fb5760008160009055506001016108e3565b5090565b9056fea165627a7a723058206bf741f54a96905affcdda68915e76f7ce286a0c82d6522f3c6dea25c46933d40029';
// TODO: Remove hard-coded address
const collegeAddress = '0xE92fcbfb38Cc04E31cbB859b3a46702C8d3Dd7E8';
@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css']
})
export class ApplicationFormComponent {
  private id = new FormControl('', [Validators.required]);
  private name = new FormControl('', [Validators.required]);
  private college = new FormControl('', [Validators.required]);
  private course = new FormControl('', [Validators.required]);
  private startYear = new FormControl('', [Validators.required]);
  private completionYear = new FormControl('', [Validators.required]);

  private yearRange: number[];
  private options: string[] = ['VJTI', 'SPIT', 'DJ', 'Thakur'];

  matcher = new ApplicationErrorStateMatcher();

  constructor(
    private connectService: ConnectService,
    private contractService: ContractService,
    private transcriptService: TranscriptService,
  ) {
    const currentYear = (new Date()).getFullYear();
    let i: number;
    this.yearRange = [];
    for (i = currentYear - 20; i <= currentYear + 5; i++) {
      this.yearRange.push(i);
    }
  }

  getErrorMessage(attribute: FormControl) {
    return attribute.hasError('required') ? 'You must enter a value' : '';
  }

  startYearChanged() {
    if (this.startYear.value >= this.completionYear.value) {
      this.completionYear.reset();
    }
  }

  async submitApplication() {
    const idContractAddress = this.connectService.getIDContractAddress();
    // TODO: Get address from this.college
    const transcriptContractAddress =
      await this.contractService.deployContract(transcriptApplicationABI, transcriptApplicationBytecode,
        [idContractAddress, collegeAddress, this.name.value, this.id.value, this.course.value,
          this.startYear.value, this.completionYear.value]);
    console.log('Application submitted!');
    console.log('Transcript Contract Address:', transcriptContractAddress);
    const transcriptContract = this.contractService.accessContract(transcriptContractAddress, transcriptApplicationABI);
    console.log(await transcriptContract.methods.getTranscriptOwner().call());
    console.log(await transcriptContract.methods.getTranscriptHash().call());
    await this.transcriptService.addApplication(idContractAddress, collegeAddress, transcriptContractAddress);
  }
}

import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { ContractService } from '../contract.service';

export class ApplicationErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

const transcriptApplicationABI = [
    {
      "inputs": [
        {
          "name": "provAddress",
          "type": "address"
        },
        {
          "name": "authAddress",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getTranscriptHash",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getTranscriptOwner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "verify",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "isVerified",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "s",
          "type": "string"
        }
      ],
      "name": "setTranscriptHash",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
// tslint:disable-next-line:max-line-length
const transcriptApplicationBytecode = '0x608060405234801561001057600080fd5b5060405160408061080083398101806040528101908080519060200190929190805190602001909291905050506040805190810160405280600781526020017f4e6f7420736574000000000000000000000000000000000000000000000000008152506001908051906020019061008892919061016d565b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000600360146101000a81548160ff0219169083151502179055505050610212565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106101ae57805160ff19168380011785556101dc565b828001600101855582156101dc579182015b828111156101db5782518255916020019190600101906101c0565b5b5090506101e991906101ed565b5090565b61020f91905b8082111561020b5760008160009055506001016101f3565b5090565b90565b6105df806102216000396000f30060806040526004361061006d576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806330125236146100725780633273e0fb146100db57806380007e831461016b578063a124fc231461019a578063fc735e99146101f1575b600080fd5b34801561007e57600080fd5b506100d9600480360381019080803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509192919290505050610208565b005b3480156100e757600080fd5b506100f061029a565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610130578082015181840152602081019050610115565b50505050905090810190601f16801561015d5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561017757600080fd5b5061018061033c565b604051808215151515815260200191505060405180910390f35b3480156101a657600080fd5b506101af610353565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156101fd57600080fd5b5061020661037c565b005b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561026457610297565b806001908051906020019061027a92919061050e565b506000600360146101000a81548160ff0219169083151502179055505b50565b606060018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103325780601f1061030757610100808354040283529160200191610332565b820191906000526020600020905b81548152906001019060200180831161031557829003601f168201915b5050505050905090565b6000600360149054906101000a900460ff16905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161480156104eb575060405180807f4e6f74207365740000000000000000000000000000000000000000000000000081525060070190506040518091039020600019166001604051602001808280546001816001161561010002031660029004801561046e5780601f1061044c57610100808354040283529182019161046e565b820191906000526020600020905b81548152906001019060200180831161045a575b50509150506040516020818303038152906040526040518082805190602001908083835b6020831015156104b75780518252602082019150602081019050602083039250610492565b6001836020036101000a03801982511681845116808217855250505050505090500191505060405180910390206000191614155b1561050c576001600360146101000a81548160ff0219169083151502179055505b565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061054f57805160ff191683800117855561057d565b8280016001018555821561057d579182015b8281111561057c578251825591602001919060010190610561565b5b50905061058a919061058e565b5090565b6105b091905b808211156105ac576000816000905550600101610594565b5090565b905600a165627a7a72305820ccbe6dee9bea7bccc9c47e21f84d53f257a51f4528801ae29c15c4f27c82ac110029';
const collegeAddress = '0xE92fcbfb38Cc04E31cbB859b3a46702C8d3Dd7E8';
@Component({
    selector: 'app-application-form',
    templateUrl: './application-form.component.html',
    styleUrls: ['./application-form.component.css']
})
export class ApplicationFormComponent {
    private id: string;
    private college: string;

    private options: string[] = ['VJTI', 'SPIT', 'DJ', 'Thakur'];

    matcher = new ApplicationErrorStateMatcher();

    constructor(
        private router: Router,
        private contractService: ContractService
    ) { }

    async submitApplication() {
        // tslint:disable-next-line:max-line-length
        await this.contractService.deployContract(transcriptApplicationABI, transcriptApplicationBytecode, [collegeAddress, collegeAddress]);
        console.log('Application submitted!');
    }
}
pragma solidity ^0.4.24;

contract TranscriptList {

    mapping(address => address[]) transcriptList;

    constructor () 
        public 
    { }

    function addTranscript (address account, address transcriptAddress) 
        public 
    {
        transcriptList[account].push(transcriptAddress);
    }

    function getTranscripts (address account)
        public
        view
        returns (address[])
    {
        return transcriptList[account];
    }

    function removeTranscript (address transcriptAddress)
        public
    {
        for (uint i = 0; i < transcriptList[msg.sender].length; i++){
            if (transcriptAddress == transcriptList[msg.sender][i]) {
                delete transcriptList[msg.sender][i];
                return;
            }
        }
    }
}
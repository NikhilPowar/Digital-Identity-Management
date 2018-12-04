pragma solidity ^0.5.0;

contract TranscriptList {

    mapping(address => address[]) transcriptList;

    constructor () 
        public 
    { }

    function addTranscript (address account1, address account2, address transcriptAddress) 
        public 
    {
        transcriptList[account1].push(transcriptAddress);
        transcriptList[account2].push(transcriptAddress);
    }

    function getTranscripts (address account)
        public
        view
        returns (address[] memory)
    {
        return transcriptList[account];
    }

    function removeTranscript (address transcriptAddress)
        public
    {
        uint length = transcriptList[msg.sender].length;
        for (uint i = 0; i < length; i++){
            if (transcriptAddress == transcriptList[msg.sender][i]) {
                transcriptList[msg.sender][i] = transcriptList[msg.sender][length-1];
                transcriptList[msg.sender].length--;
                return;
            }
        }
    }
}

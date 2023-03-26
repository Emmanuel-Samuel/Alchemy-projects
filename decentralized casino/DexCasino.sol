// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

// contract defined
contract DexCasino {

    // mapping address declared 
    mapping (address => uint256) public gameWeiValues;
    mapping (address => uint256) public blockHashesToBeUsed;

    // this function implements the play game and recieves eth from user
    function playGame() external payable {
        if (blockHashesToBeUsed[msg.sender] == 0) {
            blockHashesToBeUsed[msg.sender] = block.number + 2;
            gameWeiValues[msg.sender] = msg.value;
            return;
        }

        // checks if user isnt still in a game
        require(msg.value == 0, 
        "Lottery: Finish current game before starting new one");

        // requires the block has mined
        require(blockhash(blockHashesToBeUsed[msg.sender]) != 0,
        "Lottery: Block not mined yet");

        // randomnumber 
        uint256 randomNumber = uint256(blockhash(blockHashesToBeUsed[msg.sender]));

        // checks if the randomnumber is no zero and if the user won
        if (randomNumber != 0 && randomNumber % 2 == 0) {
            uint256 winningAmount = gameWeiValues[msg.sender] * 2;
            (bool success,) = msg.sender.call{ value: winningAmount }("");
            require(success, "Lottery: Winning payout failed");
        }

        blockHashesToBeUsed[msg.sender] = 0;
        gameWeiValues[msg.sender] = 0;
    }
}
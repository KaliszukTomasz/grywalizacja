pragma solidity >=0.4.16 <0.7.0;
  contract Game{
    string public title;
    address public owner;
    string public description;
    address public author;
    
    bool public gameDeletedFlag;
    
    event GameDeleted();
    
    constructor(string memory _title, address _owner, string memory _description, address _author) public {
        title = _title;
        owner = _owner;
        description = _description;
        author = _author;
        gameDeletedFlag = false;
    }
    
    modifier playerExist(){
        require(gameDeletedFlag == false, "player already deleted");
        _;
    }

    modifier onlyOwner(){
        require(owner == msg.sender,"only owner can perform this action");
        _;
    }

    
    function deleteGame() external onlyOwner{
        require(gameDeletedFlag == false, "player already deleted");
        gameDeletedFlag = true;
        emit GameDeleted();
    }
}
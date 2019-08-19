pragma solidity >=0.4.16 <0.7.0;

import "./Game.sol";

contract User{
    
    string public name;
    address public owner;
    int256 public experience;
    
    mapping (address => bool) public registeredGames;
    event GameCreated(address created, address creator, string gameTitle);
    event GameRegistered(address created, address creator);
    event UserExperience(string name, int256 newExperience);
    // event UserUnregistered(address unregistered);
    // event AuctionCreated(address auction, address indexed parentMarketPlace, address indexed createdBy, bytes32 auctionName);
    
    constructor (string memory _name, address _owner) public {
        name = _name;
        owner = _owner;
        experience = 0;
    }
    
    modifier onlyOwner(){
        require(owner == msg.sender, "Only owner have permission to execute that operation");
        _;
    }
    
    modifier onlyRegistered(){
        require(registeredGames[msg.sender] == true, "Only registered user have permission to execute that operation" );
        _;
    }
    
    // function addAuction(bytes32 offerTitle) external onlyRegistered returns (address) {
    //     Auction newAuction = new Auction(offerTitle, msg.sender);
    //     emit AuctionCreated(address(newAuction), address(this), msg.sender, offerTitle);
    //     return address(newAuction);
    // }
    
    function registerGame(address newGame) external onlyOwner returns (bool){
        require(newGame != address(0), "Wrong adress");
        registeredGames[newGame] = true;
        emit GameRegistered(newGame, msg.sender);
        return true;
    }
    
    function setExperience(int256 value) external onlyOwner returns (bool){
        
        experience = value;
        emit UserExperience(name, value);
        return true;
    }
    
    function createGame(string memory title, string memory description) public returns(address) {
        Game game = new Game(title, msg.sender, description, address(this));
        emit GameCreated(address(game), msg.sender, title);
        return address(game);
    }
}
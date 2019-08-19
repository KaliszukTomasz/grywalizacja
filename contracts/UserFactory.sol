pragma solidity >=0.4.16 <0.7.0;

import "./User.sol";

contract UserFactory{
    
    event UserCreated(address user, address indexed owner, string userName);
    event UserFactoryCreated(address indexed owner);
    
    constructor() public {
        emit UserFactoryCreated(msg.sender);
    }

    function createUser(string memory name) public returns(address) {
        User user = new User(name, msg.sender);
        emit UserCreated(address(user), msg.sender, name);
        return address(user);
    }
    
}
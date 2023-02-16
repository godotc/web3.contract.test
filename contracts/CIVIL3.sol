// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
// import "@openzeppelin/contracts/interfaces/IERC165.sol";

import "@openzeppelin/contracts/interfaces/IERC20.sol";

contract CIVIL3 is IERC20 /*, IERC165*/ {
    address m_Owner; // Contract deployer
    uint256 m_TotalSupply; // Amount in circulation

    string m_Name;
    string m_Symbol;

    uint64 m_Decimals; // 小数位数

    mapping(address => uint256) m_Balance;
    mapping(address => mapping(address => uint256)) m_Allowance; // Amount a address approve to another

    modifier onlyOwner() {
        require(msg.sender == m_Owner, "ERROR: only owner");
        _;
    }

    //deployer.deploy(CIVIL3,"CIVIL3", "CIVIL",50, 18);
    constructor(
        string memory theName,
        string memory theSymbol,
        uint256 initialAmount,
        uint64 theDemecal
    ) {
        m_Owner = msg.sender;

        m_Balance[msg.sender] = initialAmount;
        m_TotalSupply = initialAmount;

        m_Name = theName;
        m_Symbol = theSymbol;
        m_Decimals = theDemecal;
    }

    // Create coin
    function mint(address account, uint256 amount) public onlyOwner {
        require(account != address(0), "ERROR: mint for the addrex 0x00");
        m_TotalSupply += amount;
        m_Balance[account] += amount;
        emit Transfer(address(0), account, amount);
    }

    // Destroy
    function burn(address account, uint256 amount) public onlyOwner {
        require(account != address(0), "ERROR: burnning for the addrex 0x00");
        m_TotalSupply -= amount;

        uint256 accountBalance = m_Balance[account];
        require(
            accountBalance >= amount,
            "ERROR: not enough coin to burn on this address"
        );
        m_Balance[account] = accountBalance - amount;
        emit Transfer(account, address(0), amount);
    }

    function name() public view returns (string memory) {
        return m_Name;
    }

    function symbol() public view returns (string memory) {
        return m_Symbol;
    }

    function decimals() public pure returns (uint8) {
        return 18;
    }

    function totalSupply() public view returns (uint256) {
        return m_TotalSupply;
    }

    function balanceOf(address account) public view returns (uint256) {
        return m_Balance[account];
    }

    // Query the amount of allowance that A approve to B
    function allowance(
        address theOwner,
        address theSpender
    ) public view returns (uint256) {
        return m_Allowance[theOwner][theSpender];
    }

    // Approve token nubmer to B from A
    function approve(address spender, uint256 amount) public returns (bool) {
        m_Allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    //
    function _transfer(address from, address to, uint256 amount) public {
        require(m_Balance[from] >= amount, "No enough money");
        require(to != address(0), "Trying transfer to address 0 ");

        m_Balance[from] -= amount;
        m_Balance[to] += amount;

        emit Transfer(from, to, amount);
    }

    function transfer(address to, uint256 amount) external returns (bool) {
        _transfer(msg.sender, to, amount);
        return true;
    }

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public returns (bool) {
        // Check the allowence(额度) from bank the approve for you
        require(
            m_Allowance[from][msg.sender] >= amount,
            "ERROR::Transfer: no enough credit m_Allowance < amount"
        );
        m_Allowance[from][msg.sender] -= amount;
        // Update amount that approved
        emit Approval(from, msg.sender, m_Allowance[from][msg.sender]);

        // Difinetly tranfer
        _transfer(from, to, amount);
        return true;
    }

    // Check if is the availiable interface
    // function supportsInterface(
    //     bytes4 interfaceId
    // ) public view virtual override returns (bool) {
    //     return
    //         interfaceId == type(IERC20).interfaceId ||
    //         interfaceId == type(IERC165).interfaceId;
    // }
}

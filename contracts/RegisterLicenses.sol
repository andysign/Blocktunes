pragma solidity ^0.4.2;

// check if the caller is the owner of the contract
contract Ownable {
  address public owner;

  function Ownable() {
    owner = msg.sender;
  }

  modifier onlyOwner() {
    if (msg.sender != owner) {
      throw;
    }
    _;
  }

  function transferOwnership(address newOwner) onlyOwner {
    if (newOwner != address(0)) {
      owner = newOwner;
    }
  }

}

// The main registration smart contract
contract RegisterLicenses is Ownable {

    function RegisterLicenses() {
        // TBD
    }

    // The main structure of licenses
    // Contains three attributes
    // original owner , perp use lincesed to , domain ( web domain or mobile app domain )
    struct License {
        address originalContentOwner;
        address licensedTo;
        string domain;
    }

    // Map hashOfFile => License[]
    mapping(bytes32 => License[]) public licenses;

    // Register the license for a specific hash
    function registerLicense(bytes32 contentHash, address _originalContentOwner, address _licensedTo, string _domain) {
        License memory license;
        license.originalContentOwner = _originalContentOwner;
        license.licensedTo = _licensedTo;
        license.domain = _domain;
        licenses[contentHash].push(license);
    }

    // Retrieve everything (every info avail) about a hash
    function retrieveLicenses(bytes32 contentHash) constant external returns (bytes32[], bytes32[], bytes32[]) {
        uint l = licenses[contentHash].length;
        bytes32[] memory outputA = new bytes32[](l);
        bytes32[] memory outputB = new bytes32[](l);
        bytes32[] memory outputC = new bytes32[](l);
        for(uint i = 0; i < l; i++) {
            License memory license = licenses[contentHash][i];
            outputA[i] = stringToBytes32(toString(license.originalContentOwner));
            outputB[i] = stringToBytes32(toString(license.licensedTo));
            outputC[i] = stringToBytes32(license.domain);
        }

        return (outputA, outputB, outputC);
    }

    // Simple string converter ( utility function )
    function stringToBytes32(string memory source) returns (bytes32 result) {
        assembly {
            result := mload(add(source, 32))
        }
    }

    // Simple address to string ( utility function )
    function toString(address x) internal constant returns (string) {
        bytes memory b = new bytes(20);
        for (uint i = 0; i < 20; i++)
            b[i] = byte(uint8(uint(x) / (2**(8*(19 - i)))));
        return string(b);
    }

    // Simple str concatenate ( utility function )
    function strConcat(string _a, string _b, string _c, string _d, string _e) constant internal returns (string){
        bytes memory _ba = bytes(_a);
        bytes memory _bb = bytes(_b);
        bytes memory _bc = bytes(_c);
        bytes memory _bd = bytes(_d);
        bytes memory _be = bytes(_e);
        string memory abcde = new string(_ba.length + _bb.length + _bc.length + _bd.length + _be.length);
        bytes memory babcde = bytes(abcde);
        uint k = 0;
        for (uint i = 0; i < _ba.length; i++) babcde[k++] = _ba[i];
        for (i = 0; i < _bb.length; i++) babcde[k++] = _bb[i];
        for (i = 0; i < _bc.length; i++) babcde[k++] = _bc[i];
        for (i = 0; i < _bd.length; i++) babcde[k++] = _bd[i];
        for (i = 0; i < _be.length; i++) babcde[k++] = _be[i];
        return string(babcde);
    }

    // Simple str concatenate with only four arguments ( utility function )
    function strConcat(string _a, string _b, string _c, string _d) constant internal returns (string) {
        return strConcat(_a, _b, _c, _d, "");
    }

    // Simple str concatenate with only three arguments ( utility function )
    function strConcat(string _a, string _b, string _c) constant internal returns (string) {
        return strConcat(_a, _b, _c, "", "");
    }

    // Simple str concatenate with only two arguments ( utility function )
    function strConcat(string _a, string _b) constant internal returns (string) {
        return strConcat(_a, _b, "", "", "");
    }

}

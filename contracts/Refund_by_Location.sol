// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.9;

contract RefundByLocation {
    uint public fundAmt = 100; // Equal to 0.1 ether
    // int256 strike;
    int strikeLimit = 3;
    //owner of this smart contract (i.e. employer);
    address public employer;

    mapping (address => Employee) public employees;
    //holds list of employees curren location... It get continiously updated
    mapping (address => Location) public empsCurrentLocations;

    //we need this to use it as a key to get all the employees;
    address[] public employeeAddressList;
 
    struct Location {
        uint256 lat;
        uint256 lng;
    }

    struct Employee {
        string fullName;
        string gender;
        uint256 allowedDistance;
        string date;
        uint strike; //number of missing compliance
        Location workLocation;
    }

    // publicize actions to external listeners
    event LogFundsMade(address empAddress, uint amount);
    event employeeOutOfZone(address empAddress, uint awayBy);

    constructor() public {
        // msg provide details about the message that's sent to the contract
        // msg.sender is contract caller (address of contract creator)
        employer = msg.sender;
    }

    function updateEmpLocation (address payable _employeeAddress, uint256  _lat, uint256  _lng) public {
        // require(checkIfEmployeeExist(_employeeAddress));
        empsCurrentLocations[_employeeAddress].lat = _lat;
        empsCurrentLocations[_employeeAddress].lng = _lng;

        uint256 distance = calculateDistance(_employeeAddress, _lat, _lng);
        if(distance > employees[_employeeAddress].allowedDistance){
            //count strike
            employees[_employeeAddress].strike += 1;
            uint overflow = distance - employees[_employeeAddress].allowedDistance;
            emit employeeOutOfZone(_employeeAddress, overflow);
        } 
        if (employees[_employeeAddress].strike >= 3  ){
            //TODO: panalize the employee
        }
        if (employees[_employeeAddress].strike > 3 && distance < employees[_employeeAddress].allowedDistance){
            //TODO:Fund the employee
            _employeeAddress.transfer(fundAmt);
            //TODO: Emit funds made event

        }
    }

    function getEmployeeInfo(address _employeeAddress) public returns (Employee memory){
        //TODO: chekc if address exists   
        return employees[_employeeAddress];
    }

    //helper functions
    // function calculateDistance() {}

    function calculateDistance(address _employeeAddress, uint256 _current_lat, uint256 _current_lng) public view returns(uint256){
        uint256 lat = employees[_employeeAddress].workLocation.lat;
        uint256 lng = employees[_employeeAddress].workLocation.lng;
        uint256 distance = uint256(sqrt((_current_lat - lat) ** 2 + (_current_lng - lng) ** 2));
        return uint256(distance);
    }
    // CheckIfEmployeeExist -- return bool
    // TODO: debug this to uncomment
    // function checkIfEmployeeExist(address empAd) public returns(bool){
    //     if(employees[empAd] > 0)
    //         return true;
    //     else
    //         return false;
    // }

    function sqrt(uint x) public pure returns (uint y) {
    uint z = (x + 1) / 2;
    y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
        return y;
    }

    //methods
    // Callable by the admin
    // Register employees -- return bool
    function registerEmployee(string memory _fullName, address _employeeAddress, string memory _gender, uint256 _allowedDistance, uint256 _lat, uint256 _lng, string memory _date) public returns(Employee memory){
        // make sure only employer can add employee
        require(msg.sender == employer);

        //TODO: check if employee already exists

        Location memory coord = Location({
            lat: _lat,
            lng: _lng
        }); 

        Employee memory employeeInfo = Employee({
            fullName: _fullName,
            gender: _gender,
            allowedDistance: _allowedDistance,
            date: _date,
            strike: 0,
            workLocation: coord
        });

        employees[_employeeAddress] = employeeInfo;
        employeeAddressList.push(_employeeAddress);
        return employeeInfo;
    }

    function getEmployeeAddressList() public view returns (address[] memory) {
        return employeeAddressList;
    }

}


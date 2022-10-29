// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract RefundByLocation {
    //Variables
    // Strike -- number of missing compliance
    // int256 strike;
    int strikeLimit = 3;
    // location -- current lat, lng of the employee
    int256 numberOfEmps;
    //fund paid

    Employee [] public employees;
    struct Location {
        uint256 lat;
        uint256 lng;
    }

    struct Employee {
        address employeeAddress;
        string fullName;
        string gender;
        uint256 allowedDistance;
        uint256 lat;
        uint256 lng;
        int strike;
        string date;
    }

    // constructor() public {}

    // employee
    // employees -- array of employees
    // employer
    // employeeInfo -- object pubaddress + location
    // timestamp

    //helper functions
    // function calculateDistance() {}
    // CheckIfEmployeeExist -- return bool
    // function checkIfEmployeeExist () {}

    //methods
    // Callable by the admin
    // Register employees -- return bool
    function registerEmployee(string memory _fullName, address _employeeAddress, string memory _gender, uint256 _allowedDistance, uint256 _lat, uint256 _lng, string memory _date) public {
        employees.push(Employee(_employeeAddress, _fullName, _gender, _allowedDistance, _lat, _lng, 0, _date));
    }
    // Update employee details --- return bool
    // function updateEmployee(){}
    // CheckCompliance --- return bool
    // function checkCompliance(){
    //     //if out of range increment strike
    //         //if strike limimt reached freez fund for 2 moths and reset strike to 0
    //     //if in range RundEmployee 
    // }
    // FundEmployee --- return nothing
    // function fundEmployee(){}


    //clean ups
}


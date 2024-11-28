# HumanResources Contract Documentation

## Overview
The `HumanResources` smart contract is a solution for managing employee payments on the Optimism network. It provides a human resources payment system where employees can be registered, terminated, and paid in either USDC or ETH based on their preference. The HR manager, specified upon contract deployment, is responsible for managing employees. 

## Prerequisites
### Requirements
- **Node.js and NPM**: Ensure you have Node.js and NPM installed.
- **Foundry**: Install Foundry to compile, test, and deploy smart contracts.
- **Metamask Wallet**: Needed to interact with the contract on the Optimism network.
- **Optimism ETH**: You will need some ETH on the Optimism network to cover gas fees.
- **Chainlink Oracle and Uniswap Router**: The contract integrates with Chainlink and Uniswap, so make sure these services are accessible.

### Installation

1. **Install Foundry**
   ```sh
   curl -L https://foundry.paradigm.xyz | bash
   foundryup
   ```
2. **Unzip the file**
3. **Install Dependencies**
   Install the necessary libraries by running:
   ```sh
   forge install
   ```
4. **Compile the Contract**
   To compile the contract, run:
   ```sh
   forge build
   ```
5. **Test the Contract**
   ```sh
   forge test
   ```
   
## Features Overview
- Only the HR manager can register or terminate employees.
- Employees can withdraw accumulated salaries in USDC or ETH based on their preference.
- The contract uses Chainlink to fetch the latest ETH/USD price.
- Uses Uniswap to convert USDC to ETH when an employee choose to receive their salary in - Uses modifiers like `onlyHRManager` and `onlyEmployee` to restrict access to critical functions.
- The `withdrawSalary()` function is protected with `nonReentrant` to prevent reentrancy attacks.

## Default Assumptions
- The salary denomination is based on **1 USD = 1 USDC**.
- By default, employees are paid in **USDC** unless they explicitly change their preference to ETH.

### Contract Configuration
- **HR Manager Address**: The `hrManagerAddress` is an immutable address set during the contract's deployment and represents the HR manager responsible for managing employees.
- **Active Employee Count**: The contract tracks the current number of active employees with `activeEmployeeCount`.
- **Addresses for Key Integrations**:
  - **USDC**: `0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85`
  - **WETH**: `0x4200000000000000000000000000000000000006`
  - **Uniswap Router**: `0xE592427A0AEce92De3Edee1F18E0157C05861564`
  - **Chainlink ETH/USD Price Feed**: `0x13e3Ee699D1909E989722E753853AE30b17e08c5`

During the contract deployment, the `hrManagerAddr`, `priceFeed`, and `swapRouter` are initialized to set up the Chainlink price feed and Uniswap router for interactions.

### Employee Data Management
- **Employee Mapping**: The `employees` mapping associates each employee's address with their respective data.
- **Employee Struct**:
  - **`weeklyUsdSalary`**: Stores the weekly salary in USD (scaled to 18 decimals).
  - **`employedSince`**: Timestamp indicating when the employee was registered.
  - **`terminatedAt`**: Timestamp indicating when the employee was terminated (or `0` if still active).
  - **`lastWithdrawnSalaryAt`**: Timestamp of the last salary withdrawal by the employee.
  - **`unclaimedSalary`**: Stores salary that was accrued but not yet withdrawn.
  - **`isETH`**: Boolean indicating whether the employee prefers to be paid in ETH (`true`) or USDC (`false`). By default employee is paid in USDC.

## Functions from `IHumanResources`
This contract implements all functions defined in the IHumanResources interface. Each of these functions is documented below, explaining their purpose, access control, and logic.

### Employee Management(Can be accessed by HR only):

### `registerEmployee(address employee, uint256 weeklyUsdSalary)`
- **Description**: Registers an employee with specified weekly USD salary.
- **Restrictions**: Only callable by the HR manager.
- **Events emitted**: Emits `EmployeeRegistered` when a new employee is registered.
- **Error Handling**: Reverts if the employee is already registered and not terminated.

### `terminateEmployee(address employee)`
- **Description**: Terminates an employee, stopping salary accrual and storing any unclaimed salary till the point of terminated in unclaimed salary variable.
- **Restrictions**: Only callable by the HR manager.
- **Events emitted**: Emits `EmployeeTerminated` event when an employee is terminated.
- **Error Handling**: Reverts if the employee is not registered or has already been terminated.

### Salary Management

- **Salary Accrual Mechanism**: Salaries accrue continuously based on the weekly USD salary rate, which means that after `n` days, an employee is entitled to `n/7` of their weekly salary.
- **Tracking Accrual**: The contract uses the `lastWithdrawnAt` and `unclaimedSalary` variables to accurately track the employee's accrued salary between withdrawals.
  - **`lastWithdrawnAt`**: Keeps track of the last time the employee withdrew their salary. This is used to determine from which timestamp the timeWorked should be tracked when the withdraw function is called to effectively manage the amount that has tobe withdrwn.
  - **`unclaimedSalary`**: Stores any salary that was accrued but not yet withdrawn. This is particularly useful if an employee is terminated and later re-registered, ensuring they do not lose any earned salary.


### `withdrawSalary()`
- **Description**: Allows employees to withdraw their accumulated salary in USDC or ETH.
- **Restriction**: Only callable by active or terminated employees.
- **Internal Logic**:
  - If the employee prefers ETH, the contract uses Uniswap to swap USDC to ETH.
  - ETH is sent using a re-entrancy safe method taking care of the scaling.
  - If the employee prefers USDC, it directly transfers USDC taking care of the scaling.
- **Events emitted**: Emits `SalaryWithdrawn` with the currency type (ETH or USDC).
- **Reentrancy Protection**: Utilizes `nonReentrant` modifier to prevent reentrancy attacks.

### `switchCurrency()`
- **Description**: Allows an employee to switch between receiving salary in USDC or ETH.
- **Access Control**: Only callable by active employees.
- **Internal Logic**:
  - Withdraws the accumulated salary before switching the preferred currency.
  - Switches the currency preference and emits `CurrencySwitched`.
- **Events emitted**: Emits `SalaryWithdrawn` with the currency type (ETH or USDC) when withdrawl is done and emits `CurrencySwitched` when the preferred currency changes.

### View Functions (can be called by all)

### `salaryAvailable(address employee)`
- **Description**: Returns the current accumulated salary available for withdrawal.
- **Access Control**: View function that can be called by anyone.
- **Internal Logic**:
  - Calculates the salary in the preferred currency (USDC or ETH).
  - If ETH is preferred, it uses the Chainlink price feed to determine the equivalent ETH amount.

### `getEmployeeInfo(address employee)`
- **Description**: Provides information about an employee's salary, registration, and termination status.
- **Access Control**: View function accessible to anyone.
- **Internal Logic**:
  - Returns weekly salary, registration timestamp, and termination timestamp
  - If the employee does not exist, all returned values are zero

### `getActiveEmployeeCount()`
- **Description**: Returns the number of active employees in the system.
- **Access Control**: View function accessible to anyone.

### `hrManager()`
- **Description**: Returns the address of the HR manager.
- **Access Control**: View function accessible to anyone.
- **Internal Logic**: 
  - The `hrManagerAddr` is the address of the HR Manager set during contract deployment.
  - We set it to `msg.sender` when constructor is called.

## Additional functions(Implemented By me):

### 1. `calculateSalary(address employee)`
- Helper function for withdrw salary and available salary
- **Description**: Calculates the total accrued salary for an employee.
- **Internal Logic**:
  - The function considers weekly salary, time worked, and unclaimed salary.
  - Salary accrues continuously based on the weekly USD salary. For example, after n days,
n/7ths of the weekly salary is available for withdrawal.
  - If the employee is active, it calculates the salary accrued from the last updated time until the current time.
  - If the employee is re-registered and have some pending unclaimed salary that is added to accured salary and total salary is returned
  - If the employee is terminated, it returns any unclaimed salary that employee has not withdrawn for the time worked before termination.

### 2. `getCurrencyPreference(address employee)`
- This function is added to help in `test_switchCurrency`
- **Description**: Returns the preferred currency of the employee (USDC or ETH).
- **Access Control**: View function accessible to anyone.
- **Internal Logic**:
  - Checks if the employee is registered and returns their preferred currency.

## DeFi Integrations

### Chainlink Price Feed
- The contract integrates with Chainlink's ETH/USD price feed, located at address `0x13e3Ee699D1909E989722E753853AE30b17e08c5`.
- **Function Used**: `getEthPrice()` is used to retrieve the most recent ETH/USD price, which is essential for converting employee salaries to ETH if requested.
- **Details**:
  - The function fetches the ETH price and returns it in 18 decimal format for consistency. Proper error handling is implemented to ensure that a valid price is always returned.

### Uniswap Integration for Token Swaps
- The contract uses Uniswap's swap router (`0xE592427A0AEce92De3Edee1F18E0157C05861564`) to perform USDC to ETH conversions.
- **Function Used**: `swapUSDCtoETH(uint256 usdcAmount)` handles the conversion process.
- **Details**:
  - Converts a given amount of USDC to ETH, using a 2% slippage tolerance.
  - Unwraps WETH to ETH for employee withdrawals.
- **Slippage Protection**: A minimum acceptable ETH output is set to ensure the swap is executed with no more than a 2% slippage to prevent front-running or other adverse trading scenarios.

### Handling Wrapped ETH (WETH)
- Uniswap returns WETH instead of ETH during swaps. To ensure that employees receive native ETH, the `IWETH` interface is used to unwrap WETH to ETH, ensuring easier and more consistent employee payment processing.





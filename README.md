# Warehouse Robot
## Getting Started
### Pre-Requisites
- Node installed on your system

### Installation
1. ```npm install```

## Usage
### Run tests
Run jest tests with:
```npm run test```

### Run the application
1. ```npm run start```
2. Follow the on-screen prompts to input values for warehouse and robot creation to set up the scenario
3. Follow the on-screen prompts to provide commands to the robot to move it around the warehouse

## Features
- Utilises the [inquirer](https://github.com/SBoudrias/Inquirer.js) package to provide a command line interface for the user to input values for the warehouse and robot creation, and to provide commands to the robot to move it around the warehouse.
- [Scenario](src/classes/scenario.ts) class to handle the creation of the CLI interface to setup both the warehouse and robot as well as moving the robot around the warehouse
- [Warehouse](src/classes/warehouse.ts) class to handle the creation of the warehouse
  - Generates a UUID to identify the warehouse to allow for potential future expansion to handle multiple warehouses
  - Stores its width and height and allows public access to these values via getters
- [Robot](src/classes/robot.ts) class to handle the creation of the robot and to provide methods to move the robot around the warehouse. Errors if the robot is moved or installed outside the warehouse bounds
  - Generates a UUID to identify the warehouse to allow for potential future expansion to handle multiple robots
  - Stores its current location in terms of x and y coordinates
  - Stores its warehouse's width and height
  - Publicly reports its current location
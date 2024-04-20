import {Robot} from "./robot";
import {Warehouse} from "./warehouse";
import {input} from "@inquirer/prompts";

/**
 * Class responsible for setting up CLI prompts to build the environment and execute the robot's commands
 */
export class Scenario {

    /**
     * Entry function to start the application
     */
    public async runApp() {
        //create the warehouse and robot
        const {robot} = await this.createScenario();

        //Prompt for the robot's commands
        await this.moveRobotPrompt(robot);
    }

    /**
     * Create the warehouse and robot
     */
    private async createScenario() {
        const warehouse = await this.createWarehouse();
        //add crates in middle and north-east positions (handle odd numbers for middle)
        this.initCrates(warehouse);

        return {warehouse, robot: await this.createRobot(warehouse)};
    }

    /**
     * Prompt for the warehouse's dimensions and create the warehouse
     */
    private async createWarehouse() {
        //Prompt for the warehouse width
        const warehouseWidth = await input(
            {
                message: 'Enter the warehouse width:',
                default: '10'
            });

        //Prompt for the warehouse height
        const warehouseHeight = await input(
            {
                message: 'Enter the warehouse height:',
                default: '10'
            });

        //Initialise the warehouse with the provided dimensions
        return new Warehouse(parseInt(warehouseWidth), parseInt(warehouseHeight));
    }

    /**
     * add crates in middle and north-east positions (handle odd numbers for middle)
     * @param warehouse
     * @private
     */
    public initCrates(warehouse: Warehouse) {
        const bounds = warehouse.getBounds();
        const middleX = Math.floor(bounds.x / 2);
        const middleY = Math.floor(bounds.y / 2);
        const northEastX = bounds.x;
        const northEastY = bounds.y;

        warehouse.addCrate(middleX, middleY);
        warehouse.addCrate(northEastX, northEastY);
    }

    /**
     * Prompt for the robot's initial position and create the robot
     * @param warehouse
     */
    private async createRobot(warehouse: Warehouse) {
        //Prompt for the robot's initial x position
        const robotX = await input(
            {
                message: 'Enter the robot x position (must be within the bounds of the warehouse):',
                default: '5'
            });

        //Prompt for the robot's initial y position
        const robotY = await input(
            {
                message: 'Enter the robot y position (must be within the bounds of the warehouse):',
                default: '5'
            });

        //Initialise the robot with the provided position
        return new Robot(warehouse, parseInt(robotX), parseInt(robotY));

    }

    /**
     * Prompt for further commands to continue the scenario
     * @param robot
     */
    private async awaitFurtherCommands(robot: Robot) {
        const furtherCommands = await input({
            message: 'Would you like to enter further commands? (Y/N)'
        });

        if (furtherCommands.toLowerCase() === 'y') {
            const action = await input({
                message: 'Designate the action to be performed (M to interact with robot, S to start again):'
            });

            if (action.toLowerCase() === 'm') await this.moveRobotPrompt(robot);
            else if (action.toLowerCase() === 's') await this.runApp();
            else {
                console.error('Invalid action');
                await this.awaitFurtherCommands(robot);
            }
        }
    }

    /**
     * Prompt for the robot's commands and execute them
     * @param robot
     */
    private async moveRobotPrompt(robot: Robot) {
        //Prompt for the robot's commands
        const commands = await input({
            message: 'Enter the robot commands (e.g. N, E, S and W to move according to compass, G to grab, D to drop):'
        });

        try {
            //Execute the robot's commands
            robot.robotInput(commands);
            console.log(robot.reportPosition());
        } catch (e: any) {
            console.error(e.message);
        }

        //Prompt for further commands
        await this.awaitFurtherCommands(robot);
    }
}
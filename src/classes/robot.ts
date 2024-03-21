import {Robot as RobotInterface, RobotPosition} from "../types/asset-interfaces";
import {Warehouse} from "./warehouse";

/**
 * Represents a robot
 */
export class Robot implements RobotInterface {
    warehouse: Warehouse;
    x_position: number;
    y_position: number;
    bounds: { x: number, y: number };

    /**
     * Creates a new robot
     * @param warehouse
     * @param xPosition
     * @param yPosition
     */
    public constructor(warehouse: Warehouse, xPosition: number, yPosition: number) {
        if (xPosition > warehouse.getBounds().x ||
            yPosition > warehouse.getBounds().y ||
            xPosition < 1 ||
            yPosition < 1) {
            throw new Error('Robot is out of bounds');
        }
        this.warehouse = warehouse;
        this.x_position = xPosition;
        this.y_position = yPosition;
        this.bounds = warehouse.getBounds();
        console.log(`Robot created at position: ${this.x_position}, ${this.y_position} in warehouse: ${warehouse.getID()}`);
    }

    /**
     * Takes a space delimited string of compass directions as input and moves the robot accordingly
     * @param input
     */
    public robotInput(input: string): Robot {
        console.log(`Robot input: ${input}`);

        input.split(' ').forEach((direction) => {
            switch (direction) {
                case 'N':
                    if (this.y_position === this.bounds.y) throw new Error('Robot has hit the northern y boundary');
                    this.y_position++;
                    break;
                case 'S':
                    if (this.y_position === 1) throw new Error('Robot has hit the southern y boundary');
                    this.y_position--;
                    break;
                case 'E':
                    if (this.x_position === this.bounds.x) throw new Error('Robot has hit the eastern x boundary');
                    this.x_position++;
                    break;
                case 'W':
                    if (this.x_position === 1) throw new Error('Robot has hit the western x boundary');
                    this.x_position--;
                    break;
                default:
                    console.error(`Invalid direction (${direction}), ignoring individual command.`);
                    break;
            }
        });

        return this;
    }

    /**
     * Returns the current position of the robot
     */
    public reportPosition(): RobotPosition {
        return `${this.x_position}, ${this.y_position}`;
    }
}
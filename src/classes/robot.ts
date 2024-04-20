import {Robot as RobotInterface, RobotPosition} from "../types/asset-interfaces";
import {Warehouse} from "./warehouse";
import crypto from "crypto";
import {Crate} from "./crate";

/**
 * Represents a robot
 */
export class Robot implements RobotInterface {
    warehouse: Warehouse;
    id: string;
    x_position: number;
    y_position: number;
    currentCrate: Crate | undefined;

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
        this.id = crypto.randomUUID();
        console.log(`Robot created at position: ${this.x_position}, ${this.y_position} in warehouse: ${warehouse.getID()}`);
    }

    /**
     * Takes a space delimited string of compass directions as input and moves the robot accordingly
     * @param input
     */
    public robotInput(input: string): Robot {
        console.log(`Robot input: ${input}`);
        const bounds = this.warehouse.getBounds();

        input.split(' ').forEach((direction) => {
            switch (direction) {
                case 'N':
                    if (this.y_position === bounds.y) throw new Error('Robot has hit the northern y boundary');
                    this.y_position++;
                    break;
                case 'S':
                    if (this.y_position === 1) throw new Error('Robot has hit the southern y boundary');
                    this.y_position--;
                    break;
                case 'E':
                    if (this.x_position === bounds.x) throw new Error('Robot has hit the eastern x boundary');
                    this.x_position++;
                    break;
                case 'W':
                    if (this.x_position === 1) throw new Error('Robot has hit the western x boundary');
                    this.x_position--;
                    break;
                case 'G':
                    this.grabCrate();
                    break;
                case 'D':
                    this.dropCrate(this.x_position, this.y_position);
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
        return `Current position: ${this.x_position}, ${this.y_position}`;
    }

    /**
     * Check if the robot is carrying a crate
     */
    public isCarryingCrate(): boolean {
        return this.currentCrate !== undefined;
    }

    /**
     * Drop a crate at a specified position if the robot is carrying one and the position is clear
     * @param x
     * @param y
     */
    public dropCrate(x: number, y: number) {
        //check warehouse for other crates in this position
        if (this.warehouse.checkForCrate(x, y)) {
            throw new Error('Another crate is already in this position');
        }

        //check if robot is carrying a crate
        if (!this.isCarryingCrate() || this.currentCrate === undefined) {
            throw new Error('Robot is not carrying a crate');
        }

        //update the crate's key in the warehouse's crates map to ensure new position mapped correctly
        this.warehouse.crates.set(JSON.stringify({x, y}), this.currentCrate);

        this.currentCrate.x_position = x;
        this.currentCrate.y_position = y;

        console.log(`Crate ${this.currentCrate?.id} dropped at position: ${x}, ${y}`);

        delete this.currentCrate;
    }

    /**
     * Pick up a crate from the robot's current position if one is present and the robot is not already carrying one
     */
    public grabCrate() {
        //check if there's a crate in the robot's position
        if (!this.warehouse.checkForCrate(this.x_position, this.y_position)) {
            throw new Error('No crate in this position');
        }

        //check if robot is already carrying a crate
        if (this.isCarryingCrate()) {
            throw new Error('Robot is already carrying a crate');
        }

        this.currentCrate = this.warehouse.crates.get(JSON.stringify({x: this.x_position, y: this.y_position}));

        //remove crate from warehouse
        this.warehouse.removeCrate(this.x_position, this.y_position);

        console.log(`Crate ${this.currentCrate?.id} picked up at position: ${this.x_position}, ${this.y_position}`);
    }
}
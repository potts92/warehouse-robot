import {Warehouse} from "./warehouse";
import crypto from "crypto";

/**
 * Represents a crate
 */
export class Crate {
    x_position: number;
    y_position: number;
    id: string;
    warehouse: Warehouse;

    /**
     * Creates a new crate
     * @param warehouse
     * @param x
     * @param y
     */
    public constructor(warehouse: Warehouse, x: number, y: number) {
        this.x_position = x;
        this.y_position = y;
        this.warehouse = warehouse;
        this.id = crypto.randomUUID();
        console.log(`Crate created at position: ${this.x_position}, ${this.y_position} in warehouse: ${this.warehouse.getID()}`);
    }
}
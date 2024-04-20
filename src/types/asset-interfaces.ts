import {Warehouse} from "../classes/warehouse";
import {Crate} from "../classes/crate";

export interface Robot {
    warehouse: Warehouse;
    x_position: number;
    y_position: number;
    robotInput(input: string): Robot;
    reportPosition(): RobotPosition;
}

export type RobotPosition = `Current position: ${number}, ${number}`;

export interface Bounds {
    x: number,
    y: number
}

export interface WarehouseInterface {
    getID(): string;
    getBounds(): Bounds;
}

export type WarehouseCrates = Map<string, Crate>;
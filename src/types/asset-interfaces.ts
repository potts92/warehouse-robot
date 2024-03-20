import {Warehouse} from "../classes/warehouse";

export interface Robot {
    warehouse: Warehouse;
    x_position: number;
    y_position: number;
    bounds: Bounds;
    robotInput(input: string): Robot;
    reportPosition(): RobotPosition;
}

export type RobotPosition = `${number}, ${number}`;

export interface Bounds {
    x: number,
    y: number
}

export interface WarehouseInterface {
    getID(): string;
    getBounds(): Bounds;
}
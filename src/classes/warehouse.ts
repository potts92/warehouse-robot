import * as crypto from "crypto";
import {Bounds} from "../types/asset-interfaces";
import {WarehouseInterface} from "../types/asset-interfaces";

/**
 * Represents a warehouse
 */
export class Warehouse implements WarehouseInterface {
    private readonly id: string;
    private readonly width: number;
    private readonly height: number;

    /**
     * Creates a new warehouse
     * @param width
     * @param height
     */
    public constructor(width?: number, height?: number) {
        this.id = crypto.randomUUID();
        this.width = width || 10;
        this.height = height || 10;
        console.log(`Warehouse created with id: ${this.id}, width: ${this.width}, height: ${this.height}`);
    }

    /**
     * Gets the defined bounds of the warehouse
     */
    public getBounds(): Bounds {
        return {x: this.width, y: this.height};
    }

    /**
     * Gets the unique identifier of the warehouse
     */
    public getID(): string {
        return this.id;
    }
}
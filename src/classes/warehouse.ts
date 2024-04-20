import * as crypto from "crypto";
import {Bounds, WarehouseCrates} from "../types/asset-interfaces";
import {WarehouseInterface} from "../types/asset-interfaces";
import {Crate} from "./crate";

/**
 * Represents a warehouse
 */
export class Warehouse implements WarehouseInterface {
    private readonly id: string;
    private readonly width: number;
    private readonly height: number;
    crates: WarehouseCrates

    /**
     * Creates a new warehouse
     * @param width
     * @param height
     */
    public constructor(width?: number, height?: number) {
        this.id = crypto.randomUUID();
        this.width = width || 10;
        this.height = height || 10;
        this.crates = new Map();
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

    /**
     * Check if a crate exists at the given position
     * @param x
     * @param y
     */
    public checkForCrate(x: number, y: number): boolean {
        return this.crates.has(JSON.stringify({x, y}));
    }

    /**
     * Add a crate to the warehouse
     * @param x
     * @param y
     */
    public addCrate(x: number, y: number): void {
        const crate = new Crate(this, x, y);

        this.crates.set(JSON.stringify({x, y}), crate);
    }

    /**
     * Remove a crate from the warehouse
     * @param x
     * @param y
     */
    public removeCrate(x: number, y: number): void {
        this.crates.delete(JSON.stringify({x, y}));
    }

    /**
     * Remove all crates from the warehouse
     */
    public removeAllCrates(): void {
        this.crates.clear();
    }
}
import {Warehouse} from "../classes/warehouse";
import {Robot} from "../classes/robot";

const warehouse = new Warehouse();
describe('All warehouse-operations.ts tests', () => {
    describe('Unit', () => {
        test('Create a new warehouse', () => {
            const bounds = warehouse.getBounds();

            expect(typeof warehouse.getID()).toBe('string');
            expect(bounds.x).toBe(10);
            expect(bounds.y).toBe(10);
        });
        test('Get the bounds of a warehouse', () => {
            const bounds = warehouse.getBounds();

            expect(bounds.x).toBe(10);
            expect(bounds.y).toBe(10);
        });
        test('Add a robot to a warehouse', () => {
            const robot = new Robot(warehouse, 1, 1);

            expect(robot.warehouse.getID()).toBe(warehouse.getID());
        });
        test('Add a robot to a warehouse outside of its upper bounds', () => {
            expect(() => new Robot(warehouse, 11, 11)).toThrow('Robot is out of bounds');
        });
        test('Add a robot to a warehouse outside of its lower bounds', () => {
            expect(() => new Robot(warehouse, 0, 0)).toThrow('Robot is out of bounds');
        });
        test('Move a robot within the bounds of a warehouse', () => {
            const robot = new Robot(warehouse, 1, 1);
            robot.robotInput('N N N N N');

            expect(robot.reportPosition()).toBe('Current position: 1, 6');
        });
        test('Move a robot outside the western bounds of a warehouse', () => {
            const robot = new Robot(warehouse, 1, 1);

            expect(() => robot.robotInput('W')).toThrow('Robot has hit the western x boundary');
        });
        test('Move a robot outside the eastern bounds of a warehouse', () => {
            const robot = new Robot(warehouse, 10, 10);

            expect(() => robot.robotInput('E')).toThrow('Robot has hit the eastern x boundary');
        });
        test('Move a robot outside the southern bounds of a warehouse', () => {
            const robot = new Robot(warehouse, 1, 1);

            expect(() => robot.robotInput('S')).toThrow('Robot has hit the southern y boundary');
        });
        test('Move a robot outside the northern bounds of a warehouse', () => {
            const robot = new Robot(warehouse, 10, 10);

            expect(() => robot.robotInput('N')).toThrow('Robot has hit the northern y boundary');
        });
        test('Add a crate to a warehouse', () => {
            warehouse.addCrate(1, 1);

            expect(warehouse.checkForCrate(1, 1)).toBe(true);
        });
        test('Pick up a crate (valid pickup)', () => {
            const robot = new Robot(warehouse, 5, 5);
            warehouse.addCrate(5, 5);
            robot.robotInput('G');

            expect(robot.currentCrate).toBeDefined();

        });
        test('Pick up a crate (invalid pickup)', () => {
            const robot = new Robot(warehouse, 5, 5);

            expect(() => robot.robotInput('G')).toThrow('No crate in this position');
        });
        test('Drop a crate (valid drop)', () => {
            const robot = new Robot(warehouse, 5, 5);
            warehouse.addCrate(5, 5);
            robot.robotInput('G D');

            expect(robot.currentCrate).toBeUndefined();
            expect(warehouse.checkForCrate(5, 5)).toBe(true);
        });
        test('Drop a crate (invalid drop)', () => {
            const robot = new Robot(warehouse, 5, 5);
            warehouse.removeAllCrates();

            expect(() => robot.robotInput('D')).toThrow('Robot is not carrying a crate');
        });
        test('Check if crate in robot\'s current position', () => {
            const robot = new Robot(warehouse, 5, 5);
            warehouse.addCrate(5, 5);

            expect(warehouse.checkForCrate(robot.x_position, robot.y_position)).toBe(true);
        });
        test('Check if robot is carrying a crate', () => {
            const robot = new Robot(warehouse, 5, 5);
            warehouse.addCrate(5, 5);
            robot.robotInput('G');

            expect(robot.isCarryingCrate()).toBe(true);
        });
        test('Pick up a crate and drop it in another location, and then pick it up again', () => {
            const robot = new Robot(warehouse, 5, 5);
            warehouse.addCrate(5, 5);

            robot.robotInput('G N N N N E E E E D');
            expect(robot.currentCrate).toBeUndefined();
            expect(warehouse.checkForCrate(9, 9)).toBe(true);

            robot.robotInput('G');
            expect(robot.currentCrate).toBeDefined();
            expect(warehouse.checkForCrate(9, 9)).toBe(false);
        });
    });
});
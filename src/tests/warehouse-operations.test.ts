import {Warehouse} from "../classes/warehouse";
import {Robot} from "../classes/robot";

describe('All warehouse-operations.ts tests', () => {
    describe('Unit', () => {
        test('Create a new warehouse', async () => {
            const warehouse = new Warehouse();
            const bounds = warehouse.getBounds();

            expect(typeof warehouse.getID()).toBe('string');
            expect(bounds.x).toBe(10);
            expect(bounds.y).toBe(10);
        });
        test('Get the bounds of a warehouse', async () => {
            const warehouse = new Warehouse();
            const bounds = warehouse.getBounds();

            expect(bounds.x).toBe(10);
            expect(bounds.y).toBe(10);
        });
        test('Add a robot to a warehouse', async () => {
            const warehouse = new Warehouse();
            const robot = new Robot(warehouse, 1, 1);

            expect(robot.warehouse.getID()).toBe(warehouse.getID());
        });
        test('Add a robot to a warehouse outside of its upper bounds', async () => {
            const warehouse = new Warehouse();
            expect(() => {
                new Robot(warehouse, 11, 11);
            }).toThrow('Robot is out of bounds');
        });
        test('Add a robot to a warehouse outside of its lower bounds', async () => {
            const warehouse = new Warehouse();
            expect(() => {
                new Robot(warehouse, 0, 0);
            }).toThrow('Robot is out of bounds');
        });
        test('Move a robot within the bounds of a warehouse', async () => {
            const warehouse = new Warehouse();
            const robot = new Robot(warehouse, 1, 1);
            robot.robotInput('N N N N N');

            expect(robot.reportPosition()).toBe('1, 6');
        });
        test('Move a robot outside the western bounds of a warehouse', async () => {
            const warehouse = new Warehouse();
            const robot = new Robot(warehouse, 1, 1);

            expect(() => {
                robot.robotInput('W');
            }).toThrow('Robot has hit the western x boundary');
        });
        test('Move a robot outside the eastern bounds of a warehouse', async () => {
            const warehouse = new Warehouse();
            const robot = new Robot(warehouse, 10, 10);

            expect(() => {
                robot.robotInput('E');
            }).toThrow('Robot has hit the eastern x boundary');
        });
        test('Move a robot outside the southern bounds of a warehouse', async () => {
            const warehouse = new Warehouse();
            const robot = new Robot(warehouse, 1, 1);

            expect(() => {
                robot.robotInput('S');
            }).toThrow('Robot has hit the southern y boundary');
        });
        test('Move a robot outside the northern bounds of a warehouse', async () => {
            const warehouse = new Warehouse();
            const robot = new Robot(warehouse, 10, 10);

            expect(() => {
                robot.robotInput('N');
            }).toThrow('Robot has hit the northern y boundary');
        });
    });
});
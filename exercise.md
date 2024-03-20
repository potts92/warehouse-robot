# Lyka Coding  Exercise

Thanks for applying for a role on the Engineering team at Lyka. As part of getting to know you, we'd like to task you with the following coding exercise. It shouldn't take long (don't spend more than an hour or two on it). This exercise lets us see how you approach a problem, break it down, prioritise what to do as well as evaluate your coding prowess.

- We're looking for clean code that solves the problem.
- We ask that you compete this challenge using your best Typescript as that's the language you'll mainly be working on when you join us.
- For this task, **please complete Part One only**.

-----------------------------------------------------------------
### Part One - First Round Technical Test - Programme our new warehouse robot
-----------------------------------------------------------------

We have installed a robot in our warehouse and now we need to be able to send commands to control it. We need you to implement the primary control mechanism.

For convenience the robot moves along a grid in the roof of the warehouse and we've made sure that all of our warehouses are built so that the dimensions of the grid are 10 by 10. We've also made sure that all our warehouses are aligned along north-south and east-west axes.

All of the commands to the robot consist of a single capital letter and different commands are delineated by whitespace.

#### Requirements

* Create a way to send a series of commands to the robot
* Make sure the robot doesn't try to break free and move outside the boundary of the warehouse

The robot should accept the following commands:

* N move north
* W move west
* E move east
* S move south

#### Example command sequences

The command sequence: "N E S W" will move the robot in a full square, returning it to where it started.

If the robot starts in the south-west corner of the warehouse then the following commands will move it to the middle of the warehouse.

"N E N E N E N E"


#### Tips & Recommendations

- Make sure you apply your best coding style & design your implementation as as if your code was going into production
- If you can, show us your best application code design and engineering practices
- Write some tests. We practice TDD at Lyka and you'll need to demonstrate your best testing capabilities
- Don't forget to tell us how to run your code. If we can't run it, we can't assess whether it works or not
- And do make sure it works. If we can't run the code and see your robot in action we won't be able to get you through to the next round

-----------------------------------------------------------------
### Part two - Second Round Technical Test - Make the robot lift
-----------------------------------------------------------------

- We will do this task together during the next stage of the recruitment process. We'll do some pair programming and work through how to make your solution even better by adding a lifting capability to it.

The robot is equipped with a lifting claw which can be used to move crates around the warehouse. We track the locations of all the crates in the warehouse.

Model the presence of crates in the warehouse. Initially one is in the centre and one in the north-east corner.

Extend the robot's commands to include the following:

* G grab a crate and lift it
* D drop a crate gently to the ground

There are some rules about moving crates:

* The robot should not try and lift a crate if it already lifting one
* The robot should not lift a crate if there is not one present
* The robot should not drop a crate on another crate!



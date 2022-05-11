import { NextFunction, Request, Response } from "express";

interface TaskManager {
  taskCounter: number;
  maximumTaskCounter: number;
  decreaseTaskCounter: () => void;
  increaseTaskCounter: () => void;
  checkMaximumTaskCounter: () => boolean;
}
export const createTaskManager = (maximumTaskCounter = 5) => ({
  taskCounter: 0,
  maximumTaskCounter,

  decreaseTaskCounter(): void {
    if (this.taskCounter > 0) {
      this.taskCounter--;
    }
  },

  increaseTaskCounter(): void {
    if (this.taskCounter < this.maximumTaskCounter) this.taskCounter++;
  },

  checkMaximumTaskCounter(): boolean {
    return this.taskCounter === this.maximumTaskCounter;
  },
});

export const validateTaskCounter =
  (taskManager: TaskManager) => async (request: Request, response: Response, next: NextFunction) => {
    // return 429 if taskCounterLimit is reached
    if (taskManager.checkMaximumTaskCounter()) {
      return response.status(429).send("Too many requests");
    }
    // else increase taskCounterLimit
    taskManager.increaseTaskCounter();

    const handleEnd = () => {
      taskManager.decreaseTaskCounter();
      // remove listener to prevent memory leaks
      response.removeListener("finish", handleEnd);
      response.removeListener("close", handleEnd);
    };

    response.once("finish", handleEnd);
    response.once("close", handleEnd);

    next();
  };

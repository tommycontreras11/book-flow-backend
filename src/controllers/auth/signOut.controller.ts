import { Request, Response } from "express";
import { statusCode } from "./../../utils/status.util";

export const signOutController = async (_req: Request, res: Response): Promise<void> => {
  res
    .clearCookie("access_token")
    .status(statusCode.OK)
    .json({ message: "Successfully logged out" });
};
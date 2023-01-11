import { Request, Response } from "express";

const handlePing = (req: Request, res: Response) => {
  const response = {
    message: "PONG",
  };

  res.status(200).json(response);
};

export default handlePing;

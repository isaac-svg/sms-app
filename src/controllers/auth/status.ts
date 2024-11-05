import { Request, Response } from "express";

export const checkAuthentication = (req: Request, res: Response) => {
  // If the user is attached to the request, they are authenticated
  if (req.user) {
    res.status(200).json({
      message: "User is authenticated",
      user: {
        userId: req.user.userId,
        email: req.user.email,
      },
    });
    return;
  }

  res.status(401).json({ message: "User is not authenticated" });
  return;
};

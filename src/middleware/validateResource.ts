import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";

const validateResource =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (e) {
      if (e instanceof ZodError) {
        return res.status(400).send({ success: false, errors: e.flatten() });
      } else {
        return res.status(400).send({ success: false, errors: e });
      }
    }
  };

export default validateResource;

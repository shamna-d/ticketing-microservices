import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import { json } from "body-parser";

import { currentUserRouter } from "./routes/currect-user";
import { signInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";

import { errorHandler } from "./middleware/error-handler";
import { NotFoundError } from "./errors/notfound-error";

const app = express();
app.set("trust proxy", true);
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);
app.use(json());

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };

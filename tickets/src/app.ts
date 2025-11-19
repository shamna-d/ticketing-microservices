import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import { json } from "body-parser";

import { createTicketRouter } from "./routes/new";
import { updateTicketRouter } from "./routes/update";
import { showTicketRouter } from "./routes/show";
import { indexTicketRouter } from "./routes";

import { errorHandler, NotFoundError, currentUser } from "@ticketsrv/common";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(currentUser);
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };

import { MailtrapClient } from "mailtrap";
import dotenv from 'dotenv';

dotenv.config();

export const mailtrapClient = new MailtrapClient({
  token: "7b8419257bbc8b6de080552ac1211f9c",
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Check signup",
};



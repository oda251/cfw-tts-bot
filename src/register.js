import { REST, Routes } from "discord.js";
import { commands } from "./commands.js";
import dotenv from "dotenv";

dotenv.config({ path: ".dev.vars" });
const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);
async function register() {
  await rest.put(
    Routes.applicationCommands(process.env.DISCORD_APPLICATION_ID),
    { body: commands }
  );
}

register().catch((err) => console.log(err));

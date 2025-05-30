import {
  APIInteraction,
  APIInteractionResponse,
  InteractionResponseType,
  InteractionType,
} from 'discord-api-types/v10';
import { logRequest, verifyDiscordInteraction } from "./middleware";
import { getRandomTtsQuiz } from "./usecase/usecase";
import { ttsQuiz } from "./commands.js";
import { Hono } from "hono";

const app = new Hono();
app.use("*", logRequest);
app.use("/", verifyDiscordInteraction);
app.post("/", async (c) => {
  const body = await c.req.json();
  if (body.type === InteractionType.ApplicationCommand) {
    if (body.data.name === ttsQuiz.name) {
      return c.json<APIInteractionResponse>({
        type: InteractionResponseType.ChannelMessageWithSource,
        data: {
          content: `Q:${getRandomTtsQuiz().question}\nA:${getRandomTtsQuiz().answer}`,
          flags: 1 << 6,
        },
      });
    }
  }
});

export default app;

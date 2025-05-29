import {
  APIInteraction,
  APIInteractionResponse,
  InteractionResponseType,
  InteractionType,
} from "discord-api-types/v10";
import { createMiddleware } from "hono/factory";
import { verifyKey } from "discord-interactions";

export const logRequest = createMiddleware(async (c, next) => {
  const method = c.req.method;
  const url = c.req.url;
  const headers = c.req.header();
  const body = await c.req.text();
  const logMessage = `Request: ${method} ${url}\nHeaders: ${JSON.stringify(
    headers
  )}\nBody: ${body}`;
  console.log(logMessage);
  await next();
  const response = c.res;
  const responseLogMessage = `Response: ${response.status} ${response.statusText}`;
  console.log(responseLogMessage);
});

export const verifyDiscordInteraction = createMiddleware(async (c, next) => {
  const signature = c.req.header("X-Signature-Ed25519");
  const timestamp = c.req.header("X-Signature-Timestamp");
  const body = await c.req.text();
  var isValid =
    signature &&
    timestamp &&
    body &&
    c.env.DISCORD_PUBLIC_KEY &&
    (await verifyKey(body, signature, timestamp, c.env.DISCORD_PUBLIC_KEY));
  if (!isValid) {
    return c.text("Bad request signature.", 401);
  }

  const interaction: APIInteraction = JSON.parse(body);
  if (!interaction) {
    return c.text("Bad request signature.", 401);
  }

  // interact
  if (interaction.type === InteractionType.Ping) {
    return c.json<APIInteractionResponse>({
      type: InteractionResponseType.Pong,
    });
  }
  await next();
});

import axios from "axios";
import { getConfig } from "./config";

const { DISCORD_WEBHOOK_ID, DISCORD_WEBHOOK_TOKEN } = getConfig();
const discordClient = axios.create({ baseURL: "https://discord.com/api" });

export const sendDiscordMessage = async (content: string) => {
  console.log(content);
  const payload = { content };
  await discordClient.post(
    `/webhooks/${DISCORD_WEBHOOK_ID}/${DISCORD_WEBHOOK_TOKEN}`,
    payload
  );
};

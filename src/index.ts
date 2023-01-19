import { getConfig } from './config';
import { sendDiscordMessage } from './discord';
import { setupWebsocket } from './websocket';

function logEvent(msg: string) {
  console.log(msg);
  sendDiscordMessage(msg);
}

console.log('Logging perps events');
setupWebsocket(getConfig().PERPS_WEBSOCKET_URL, logEvent);

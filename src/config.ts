import { getNearConfig, NearEnv } from '@tonic-foundation/config';
import { Account, keyStores, Near } from 'near-api-js';

export function getConfig() {
  const {
    NEAR_ENV,
    PERPS_CONTRACT_ID,
    PERPS_WEBSOCKET_URL,
    DISCORD_WEBHOOK_ID,
    DISCORD_WEBHOOK_TOKEN,
  } = process.env;

  if (!NEAR_ENV) {
    console.error('Missing required env NEAR_ENV');
    process.exit(1);
  }
  if (!PERPS_CONTRACT_ID) {
    console.error('Missing required env PERPS_CONTRACT_ID');
    process.exit(1);
  }
  if (!PERPS_WEBSOCKET_URL) {
    console.error('Missing required env PERPS_WEBSOCKET_URL');
    process.exit(1);
  }
  if (!DISCORD_WEBHOOK_ID) {
    console.error('Missing required env DISCORD_WEBHOOK_ID');
    process.exit(1);
  }
  if (!DISCORD_WEBHOOK_TOKEN) {
    console.error('Missing required env DISCORD_WEBHOOK_TOKEN');
    process.exit(1);
  }
  return {
    NEAR_ENV,
    PERPS_CONTRACT_ID,
    PERPS_WEBSOCKET_URL,
    DISCORD_WEBHOOK_ID,
    DISCORD_WEBHOOK_TOKEN,
  };
}

let _near: Near | undefined;
let _nobody: Account | undefined;

export function getNear() {
  const config = getConfig();

  if (!_near) {
    _near = new Near({
      ...getNearConfig(config.NEAR_ENV as NearEnv),
      keyStore: new keyStores.InMemoryKeyStore(),
    });
  }

  return _near;
}

export function getNobodyAccount() {
  const near = getNear();

  if (!_nobody) {
    _nobody = new Account(near.connection, 'nobody');
  }

  return _nobody;
}

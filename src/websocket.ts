import { WebSocket } from 'ws';
import {
  EditPositionEvent,
  LiquidatePositionEvent,
  TonicEvent,
  WebsocketEvent,
} from './types';

export function setupWebsocket(url: string, onMessage: (a: string) => unknown) {
  let ws = new WebSocket(url);

  ws.onopen = () => {
    ws.send(
      JSON.stringify({
        type: 'subscribe',
        params: ['positions', 'liquidations'],
      })
    );
  };

  ws.onmessage = (msg) => {
    let obj = JSON.parse(msg.data.toString()).data as WebsocketEvent;
    let event = obj.payload as unknown as TonicEvent;
    const direction = event.is_long ? 'long' : 'short';
    // ETH is under the aurora contract
    const asset = event.underlying_token === 'aurora' ? 'ETH' : 'NEAR';
    let discordMessage = '';

    switch (obj.channel) {
      case 'positions':
        let editPositionEvent = event as EditPositionEvent;
        if (editPositionEvent.new_size_usd === 0) {
          discordMessage = `**Closed Position:** $${editPositionEvent.size_delta_usd} ${direction} on ${asset} at $${editPositionEvent.price_usd} P/L: $${editPositionEvent.realized_pnl_to_date_usd}`;
        } else {
          const prefix =
            editPositionEvent.state === ''
              ? 'New Position'
              : 'Increase Position';
          discordMessage = `
          **${prefix}:** $${editPositionEvent.new_size_usd} ${direction} on ${asset} at $${editPositionEvent.price_usd} 
        `;
        }
        break;
      case 'liquidations':
        let liquidationEvent = event as LiquidatePositionEvent;
        discordMessage = `**LIQUIDATED:** $${liquidationEvent.size_usd} ${direction} at $${liquidationEvent.mark_price} P/L: $${liquidationEvent.collateral}`;
        break;
    }
    onMessage(discordMessage);
  };

  return ws;
}

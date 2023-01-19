export interface EditPositionEvent {
  id: number;
  receipt_id: string;
  account_id: string;
  block_timestamp: string;
  position_id: string;
  direction: string;
  state: string;
  collateral_token: string;
  underlying_token: string;
  size_delta_usd: number;
  collateral_delta_native: number;
  new_size_usd: number;
  is_long: boolean;
  price_usd: number;
  total_fee_usd: number;
  margin_fee_usd: number;
  position_fee_usd: number;
  total_fee_native: number;
  margin_fee_native: number;
  position_fee_native: number;
  usd_out: number;
  realized_pnl_to_date_usd: number;
  referral_code: string;
  liquidator_id?: string;
}

export interface LiquidatePositionEvent {
  id: number;
  receipt_id: string;
  block_timestamp: string;
  liquidator_id: string;
  owner_id: string;
  position_id: string;
  collateral_token: string;
  underlying_token: string;
  is_long: boolean;
  size_usd: number;
  collateral: number;
  reserve_amount: number;
  mark_price: number;
}

export type TonicEvent = EditPositionEvent | LiquidatePositionEvent;

export interface WebsocketEvent {
  channel: string;
  payload: Record<string, unknown>;
}

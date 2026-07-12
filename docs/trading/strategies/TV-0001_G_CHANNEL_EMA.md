# TV-0001 — G-Channel + EMA AI Strategy

## Origin

Recovered from the canonical project source and associated historical Ledger AI documentation. Historical project files displayed performance claims of approximately an 82% win rate, 2.7 profit factor, and 6.8% drawdown, among other promotional/mockup figures. Those claims were **not** supported by the actual backtest performed during this recovery session.

## Test Configuration

- Symbol: SPY
- Timeframe: 5-minute
- Extended hours: enabled
- Period: June 1 – July 10, 2026
- Initial capital: $10,000
- Pine version: v5

## Verified Results

| Metric | Result |
|---|---:|
| Total P&L | +$25.21 |
| Return | +0.25% |
| Total trades | 180 |
| Profitable trades | 66 |
| Win rate | 36.67% |
| Max drawdown | $21.92 |
| Max drawdown percentage | 0.22% |
| Profit factor | 1.152 |

## Interpretation

Marginally profitable. Win rate substantially lower than the historical claim. Remained slightly profitable because average winners exceeded average losers, consistent with an approximately 2:1 take-profit-to-stop-loss structure.

## Status

**TESTED — HISTORICAL PERFORMANCE CLAIM REJECTED.** The Pine Script itself is real and runnable; the archived performance claims should not be repeated as verified facts.

## Pine Source

See `trading/pine/g-channel-ema/` (source file import pending — see `docs/recovery/CANONICAL_SOURCE_MAP.md`).

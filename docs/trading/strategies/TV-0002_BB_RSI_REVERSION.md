# TV-0002 — BB-RSI Reversion

## Mechanism

Indicators: Bollinger Bands, RSI.

Entry logic:
- Long: price crosses below the lower Bollinger Band and RSI is below 30
- Short: price crosses above the upper Bollinger Band and RSI is above 70

Risk logic: stop loss 1.5%, take profit 2.5%.

## Test Configuration

- Symbol: SPY
- Timeframe: 5-minute
- Extended hours: enabled
- Period: June 1 – July 10, 2026
- Initial capital: $100,000
- Pine version: v5

## Verified Results

| Metric | Result |
|---|---:|
| Total P&L | +$50.90 |
| Return | +0.05% |
| Total trades | 30 |
| Profitable trades | 19 |
| Win rate | 63.33% |
| Max drawdown | $21.93 |
| Max drawdown percentage | 0.02% |
| Profit factor | 1.96 |

## Interpretation

Substantially higher win rate, stronger profit factor, and lower drawdown percentage than TV-0001, but with far fewer trades — a less robust sample size. The 63.33% result is real for this specific symbol, timeframe, settings, and date window and must not be generalized without additional testing.

## Status

**TESTED — PROMISING / REQUIRES BROADER VALIDATION.**

## Next Action

Retest with a wider date range, additional symbols, additional timeframes, normalized capital settings (see `PERFORMANCE_METHODOLOGY.md`), and commission/slippage validation.

## Pine Source

See `trading/pine/bb-rsi-reversion/` (source file import pending — see `docs/recovery/CANONICAL_SOURCE_MAP.md`).

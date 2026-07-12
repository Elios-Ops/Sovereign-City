# Performance Methodology

## Known Methodology Gap (as of 2026-07-11)

TV-0001 (G-Channel + EMA) and TV-0002 (BB-RSI Reversion) were tested under the same symbol, timeframe, and date window, but with **different initial capital** ($10,000 vs $100,000). This makes raw dollar P&L a misleading comparison between the two.

## Required Normalized Metrics

Future strategy comparisons must report, at minimum:

- percentage return (not raw dollar profit)
- profit factor
- drawdown percentage (not raw dollar drawdown)
- expectancy
- average trade
- number of trades
- exposure (time in market)
- test duration / date range

## Standardization Requirement

Before selecting a preferred strategy for further simulation development, all candidate strategies must be re-tested under identical:

- symbol set
- timeframe set
- date ranges
- initial capital
- commission assumptions
- slippage assumptions
- session settings

This has not yet been done across TV-0001 and TV-0002 — both were tested on SPY, 5-minute, June 1 – July 10, 2026, extended hours enabled, but with different capital. Normalization is an open action item (see `docs/trading/CURRENT_TRADING_STATE.md`, "Next Action").

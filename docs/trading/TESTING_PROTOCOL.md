# Testing Protocol

All Sovereign City trading research follows this protocol:

1. **Simulation only.** TradingView Strategy Tester only. No live exchange execution, no automated live execution, no real funds.
2. **No performance claims.** No investor claims, no guaranteed-return language, no public claims based on a single backtest window.
3. **Standardized comparison.** Before a strategy is preferred over another, it must be tested under equivalent conditions:
   - same symbol set
   - same timeframe set
   - same date ranges
   - same initial capital
   - same commission assumptions
   - same slippage assumptions
   - same session settings
4. **Numeric source of truth.** Exact percentages, profit figures, timeframes, symbols, dates, and parameters are recorded in the dedicated Google spreadsheet/database (see `DATA_SOURCE_REGISTRY.md`), not reconstructed from memory or chat recollection.
5. **Win rate is not the sole criterion.** Profit factor, drawdown percentage, expectancy, average trade, exposure, and trade count must all be considered — a higher win rate does not mean a strategy is more lucrative (see `docs/trading/CURRENT_TRADING_STATE.md`, "Important Finding").

Current tests (TV-0001, TV-0002) were run on a single symbol (SPY), single timeframe (5-minute), and a single date window (June 1 – July 10, 2026) with different initial capital settings between the two tests — this is a known methodology gap to close before further strategies are compared (see `PERFORMANCE_METHODOLOGY.md`).

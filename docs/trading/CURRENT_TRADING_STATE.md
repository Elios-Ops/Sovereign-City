# TRADINGVIEW MCP + PINE SCRIPT — CURRENT VERIFIED STATE
## Sovereign City Trading Research
### Status: OPERATIONAL / SIMULATION ONLY
### Updated: July 11, 2026

---

# Purpose

This document records the current verified state of the TradingView MCP and Pine Script testing lane.

It supersedes the earlier pre-execution handoff, which accurately stated that TradingView MCP had only been identified and the recovered Pine Script had not yet been run at that earlier moment.

Subsequent work completed the installation, connection, compilation, and backtesting steps.

This document reflects the later verified state.

---

# Current Verified Capability

The TradingView MCP connection is operational.

Confirmed:

- Claude Code connected successfully to TradingView Desktop.
- TradingView chart data was readable through MCP.
- Symbols and chart intervals were changed through MCP.
- Extended-hours display was enabled.
- Pine Script source was injected into TradingView.
- Pine Script v5 compiled successfully.
- Strategies were applied to live TradingView charts.
- Strategy Tester results were read and recorded.
- Multiple strategies were tested under the same chart conditions.

This is no longer a proposed or theoretical integration.

It has been run successfully.

---

# Environment Used

## TradingView

- Application: TradingView Desktop
- Connection: TradingView MCP
- MCP transport: local Chrome remote-debugging/CDP connection
- Tested symbol: SPY
- Exchange shown: NYSE Arca
- Timeframe: 5-minute
- Extended hours: enabled
- Test period visible in Strategy Tester:
  - June 1 through July 10, 2026

## Pine Script

- Pine version tested: v5
- Compiler status:
  - no blocking errors
  - one non-blocking warning recommending Pine v6
- User decision:
  - proceed with Pine v5

---

# Strategy Test 001

## G-Channel + EMA AI Strategy

### Origin

Recovered from the canonical project source and associated historical Ledger AI documentation.

Historical project files had displayed performance claims including approximately:

- 82% win rate
- 2.7 profit factor
- 6.8% drawdown
- other promotional or mockup performance figures

Those historical claims were not supported by the actual backtest performed during this recovery session.

### Test Configuration

- Symbol: SPY
- Timeframe: 5-minute
- Extended hours: enabled
- Period: June 1 through July 10, 2026
- Initial capital: $10,000
- Pine version: v5

### Verified Results

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

### Interpretation

The strategy was marginally profitable during the tested period.

The win rate was substantially lower than the historical 80-something-percent claim.

The strategy remained slightly profitable because average winning trades were larger than average losing trades, consistent with its approximately 2:1 take-profit-to-stop-loss structure.

### Status

**TESTED — HISTORICAL PERFORMANCE CLAIM REJECTED**

The Pine Script itself is real and runnable.

The archived performance claims should not be repeated as verified facts.

---

# Strategy Test 002

## BB-RSI Reversion

### Mechanism

Indicators:

- Bollinger Bands
- RSI

Entry logic:

- Long:
  - price crosses below the lower Bollinger Band
  - RSI is below 30
- Short:
  - price crosses above the upper Bollinger Band
  - RSI is above 70

Risk logic:

- Stop loss: 1.5%
- Take profit: 2.5%

### Test Configuration

- Symbol: SPY
- Timeframe: 5-minute
- Extended hours: enabled
- Period: June 1 through July 10, 2026
- Initial capital: $100,000
- Pine version: v5

### Verified Results

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

### Interpretation

BB-RSI Reversion produced:

- a substantially higher win rate than the G-Channel strategy
- a stronger profit factor
- lower drawdown percentage
- far fewer trades

The smaller number of trades means the sample size is less robust.

The 63.33% result is real for this specific symbol, timeframe, settings, and tested date window.

It must not be generalized beyond those conditions without additional testing.

### Status

**TESTED — PROMISING / REQUIRES BROADER VALIDATION**

---

# Direct Comparison

| Metric | G-Channel + EMA | BB-RSI Reversion |
|---|---:|---:|
| Initial capital | $10,000 | $100,000 |
| Total P&L | +$25.21 | +$50.90 |
| Return | +0.25% | +0.05% |
| Trades | 180 | 30 |
| Win rate | 36.67% | 63.33% |
| Profit factor | 1.152 | 1.96 |
| Max drawdown | $21.92 | $21.93 |
| Drawdown % | 0.22% | 0.02% |

Important:

The two tests used different initial-capital settings.

Raw dollar profit should therefore not be treated as a fair standalone comparison.

The results must be compared using normalized metrics such as:

- percentage return
- profit factor
- drawdown percentage
- expectancy
- average trade
- number of trades
- exposure
- test duration

---

# Important Finding

A higher win rate does not automatically mean a strategy is more lucrative.

The BB-RSI strategy had a significantly higher win rate and profit factor, but the available comparison must account for:

- different initial capital
- different trade count
- different exposure
- limited test duration
- potentially different opportunity frequency

The project must avoid choosing strategies by win rate alone.

---

# Research Expansion

Mini Hermes completed a research pass intended to identify:

- approximately ten currently discussed or trending strategies
- three evergreen strategy families

Claude reviewed the strategy candidates and selected a candidate for implementation and testing rather than blindly accepting rankings or promotional claims.

Detailed research and subsequent test results exist outside this chat and should be imported into the permanent strategy record.

---

# Strategy Results Database

A dedicated Google spreadsheet/database exists for storing actual strategy statistics.

That spreadsheet is the numeric source of truth for:

- strategy name
- Pine Script version
- test date
- symbol
- exchange
- timeframe
- session settings
- date range
- initial capital
- commission
- slippage
- parameter values
- trade count
- win rate
- total return
- net profit
- profit factor
- maximum drawdown
- average trade
- notes
- screenshots
- keep/reject/retest decision

Do not reconstruct exact historical values from memory when the spreadsheet is available.

Three months from now, strategy decisions should be based on this accumulated dataset rather than chat recollection.

**Spreadsheet link:** Not yet available — placeholder pending owner-supplied link/identifier.

---

# Repository Placement

This document is stored at `docs/trading/CURRENT_TRADING_STATE.md`.

The earlier pre-execution document is preserved separately at `docs/recovery/trading/TRADINGVIEW_MCP_PRE_EXECUTION_HANDOFF_2026-07-11.md` and has not been deleted — it remains a valid record of the earlier state before installation and testing occurred.

## Repository Structure

```text
docs/trading/
├── CURRENT_TRADING_STATE.md
├── STRATEGY_REGISTRY.md
├── TESTING_PROTOCOL.md
├── PERFORMANCE_METHODOLOGY.md
├── DATA_SOURCE_REGISTRY.md
└── strategies/
    ├── TV-0001_G_CHANNEL_EMA.md
    ├── TV-0002_BB_RSI_REVERSION.md
    └── future-strategies.md

trading/
├── pine/
│   ├── g-channel-ema/
│   └── bb-rsi-reversion/
└── results/
    └── README.md
```

---

# Strategy Registry Seed

**TV-0001 — G-Channel + EMA AI Strategy**
Status: Tested
Result: Marginally profitable
Win rate: 36.67%
Profit factor: 1.152
Decision: Historical 82% claim rejected
Next action: Retain as recovered reference; do not prioritize without significant improvement

**TV-0002 — BB-RSI Reversion**
Status: Tested
Result: Promising
Win rate: 63.33%
Profit factor: 1.96
Decision: Retest
Next action: wider date range, additional symbols, additional timeframes, normalized capital settings, commission and slippage validation

---

# Testing Constraint

All trading work remains:

- simulation only
- research only
- Strategy Tester only

Do not enable: live exchange connections, automated live execution, real funds, investor performance claims, guaranteed-return language, public claims based on one backtest window.

Backtest results are historical simulation, not proof of future performance.

---

# Current Truth

The accurate current state is:

- TradingView MCP is installed and operational.
- Claude Code successfully controlled and read TradingView.
- Pine Scripts were compiled and applied.
- The recovered G-Channel strategy was tested.
- Its old 80-something-percent performance claim was disproven under the tested conditions.
- G-Channel produced a 36.67% win rate during the recorded SPY 5-minute test.
- BB-RSI Reversion produced a 63.33% win rate during the same visible test window.
- BB-RSI showed stronger win rate and profit factor but used fewer trades and different initial capital.
- Detailed ongoing strategy statistics are maintained in a dedicated Google spreadsheet/database.
- Future strategy selection must use normalized data and repeated testing, not headline win rate.

---

# Next Action

Import the Google strategy spreadsheet reference and any completed later test results into the repository records.

Then standardize future tests so every strategy is compared under equivalent conditions: same symbol set, same timeframe set, same date ranges, same initial capital, same commission assumptions, same slippage assumptions, same session settings.

Only after standardized comparison should a preferred strategy be selected for further simulation development.

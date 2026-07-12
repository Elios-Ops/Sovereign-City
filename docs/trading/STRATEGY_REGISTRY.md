# Strategy Registry

Numeric source of truth for strategy statistics is the dedicated Google spreadsheet/database referenced in `docs/trading/CURRENT_TRADING_STATE.md` (link not yet available — placeholder). Do not reconstruct exact historical values from memory when that spreadsheet is available.

| ID | Name | Status | Win Rate | Profit Factor | Decision | Detail |
|---|---|---|---:|---:|---|---|
| TV-0001 | G-Channel + EMA AI Strategy | Tested | 36.67% | 1.152 | Historical 82% claim rejected | `strategies/TV-0001_G_CHANNEL_EMA.md` |
| TV-0002 | BB-RSI Reversion | Tested | 63.33% | 1.96 | Retest with broader validation | `strategies/TV-0002_BB_RSI_REVERSION.md` |

Approximately ten currently discussed/trending strategies and three evergreen strategy families were researched by Mini Hermes; Claude selected TV-0001/TV-0002 for initial implementation and testing from that research pass. The full research list and any additional tested candidates exist outside this repository (in the referenced spreadsheet/chat history) and should be imported here once available — do not invent the remaining candidate list.

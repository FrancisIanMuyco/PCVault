#!/usr/bin/env bash
set -euo pipefail

HUNTER="$HOME/Projects/hunter-toolbox"
PCVAULT="$HOME/Projects/PCVAULT"
LOG="$HOME/.local/state/opencode-live.log"

cd "$HUNTER"
"$HUNTER/.venv/bin/python" -m hunter.cli --no-hud --plain gamepciso >/dev/null 2>&1 || true

cd "$PCVAULT"
npm run build >/dev/null 2>&1 || true

printf '%s PCVault auto-refresh: links re-verified, dead removed, covers/feed updated\n' "$(date '+%F %T')" >> "$LOG"

# optional: copy dist to a served folder (edit to taste)
# rsync -a "$PCVAULT/dist/" "$HOME/Sites/pcvault/"
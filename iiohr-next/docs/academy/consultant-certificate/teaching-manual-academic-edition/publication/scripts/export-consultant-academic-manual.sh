#!/usr/bin/env bash
# Pandoc export: Consultant Stream academic edition → DOCX (optional PDF if engine available).
# Usage: from anywhere: ./export-consultant-academic-manual.sh
# Optional: EXPORT_VERSION=1.2 ./export-consultant-academic-manual.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PUBL_ROOT="$(dirname "$SCRIPT_DIR")"
EDITION_ROOT="$(dirname "$PUBL_ROOT")"
OUT_DIR="$PUBL_ROOT/output"
TEMPLATES_DIR="$PUBL_ROOT/templates"
REF_DOC="$TEMPLATES_DIR/reference.docx"
VER="${EXPORT_VERSION:-1.1}"

if ! command -v pandoc >/dev/null 2>&1; then
  echo "error: pandoc not found on PATH. Install from https://pandoc.org/installing.html" >&2
  exit 1
fi

mkdir -p "$OUT_DIR"

REF_ARGS=()
if [[ -f "$REF_DOC" ]]; then
  REF_ARGS=(--reference-doc="$REF_DOC")
  echo "using reference document: $REF_DOC"
else
  echo "note: no templates/reference.docx — using Pandoc default Word styles"
fi

run_docx() {
  local out_name="$1"
  shift
  pandoc "${REF_ARGS[@]}" "$@" -o "$OUT_DIR/$out_name"
  echo "wrote $OUT_DIR/$out_name"
}

run_docx "IIOHR-Consultant-Academic-Manual-FULL-v${VER}.docx" \
  "$EDITION_ROOT/README.md" \
  "$EDITION_ROOT/volume-1-foundation.md" \
  "$EDITION_ROOT/volume-2-advanced.md" \
  "$EDITION_ROOT/volume-3-diploma.md" \
  "$EDITION_ROOT/appendix-asset-pack.md"

run_docx "IIOHR-Consultant-Academic-Vol1-Foundation-v${VER}.docx" \
  "$EDITION_ROOT/volume-1-foundation.md"

run_docx "IIOHR-Consultant-Academic-Vol2-Advanced-v${VER}.docx" \
  "$EDITION_ROOT/volume-2-advanced.md"

run_docx "IIOHR-Consultant-Academic-Vol3-Diploma-v${VER}.docx" \
  "$EDITION_ROOT/volume-3-diploma.md"

run_docx "IIOHR-Consultant-Academic-AppendixA-AssetPack-v${VER}.docx" \
  "$EDITION_ROOT/appendix-asset-pack.md"

run_docx "IIOHR-Consultant-Academic-Edition-README-v${VER}.docx" \
  "$EDITION_ROOT/README.md"

if command -v xelatex >/dev/null 2>&1; then
  PDF_OUT="$OUT_DIR/IIOHR-Consultant-Academic-Manual-FULL-v${VER}.pdf"
  if pandoc "${REF_ARGS[@]}" \
    "$EDITION_ROOT/README.md" \
    "$EDITION_ROOT/volume-1-foundation.md" \
    "$EDITION_ROOT/volume-2-advanced.md" \
    "$EDITION_ROOT/volume-3-diploma.md" \
    "$EDITION_ROOT/appendix-asset-pack.md" \
    -o "$PDF_OUT" \
    --pdf-engine=xelatex; then
    echo "wrote $PDF_OUT"
  else
    echo "note: PDF export skipped (pandoc/xelatex failed); use Word → Save as PDF"
  fi
else
  echo "note: xelatex not found — skipping PDF. See EXPORT_WORKFLOW.md (Word → PDF)."
fi

echo "done."

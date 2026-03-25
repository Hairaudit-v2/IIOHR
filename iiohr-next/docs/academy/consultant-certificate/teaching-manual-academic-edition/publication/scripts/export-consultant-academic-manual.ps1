# Pandoc export: Consultant Stream academic edition -> DOCX (optional PDF if xelatex available).
# Usage: .\export-consultant-academic-manual.ps1
# Optional: $env:EXPORT_VERSION = "1.2"

$ErrorActionPreference = "Stop"

$ScriptDir = $PSScriptRoot
$PublicationRoot = Split-Path -Parent $ScriptDir
$EditionRoot = Split-Path -Parent $PublicationRoot
$OutDir = Join-Path $PublicationRoot "output"
$RefDoc = Join-Path $PublicationRoot "templates\reference.docx"
$Version = if ($env:EXPORT_VERSION) { $env:EXPORT_VERSION } else { "1.1" }

$pandoc = Get-Command pandoc -ErrorAction SilentlyContinue
if (-not $pandoc) {
    Write-Host "error: pandoc not found on PATH. Install from https://pandoc.org/installing.html" -ForegroundColor Red
    exit 1
}

New-Item -ItemType Directory -Force -Path $OutDir | Out-Null

$refArgs = @()
if (Test-Path -LiteralPath $RefDoc) {
    $refArgs = @("--reference-doc=$RefDoc")
    Write-Host "using reference document: $RefDoc"
} else {
    Write-Host "note: no templates/reference.docx — using Pandoc default Word styles"
}

function Invoke-PandocDocx {
    param(
        [string]$OutputFileName,
        [string[]]$InputFiles
    )
    $outPath = Join-Path $OutDir $OutputFileName
    $allArgs = @()
    $allArgs += $refArgs
    $allArgs += $InputFiles
    $allArgs += @("-o", $outPath)
    & pandoc @allArgs
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    Write-Host "wrote $outPath"
}

Invoke-PandocDocx "IIOHR-Consultant-Academic-Manual-FULL-v$Version.docx" @(
    (Join-Path $EditionRoot "README.md"),
    (Join-Path $EditionRoot "volume-1-foundation.md"),
    (Join-Path $EditionRoot "volume-2-advanced.md"),
    (Join-Path $EditionRoot "volume-3-diploma.md"),
    (Join-Path $EditionRoot "appendix-asset-pack.md")
)

Invoke-PandocDocx "IIOHR-Consultant-Academic-Vol1-Foundation-v$Version.docx" @(
    (Join-Path $EditionRoot "volume-1-foundation.md")
)

Invoke-PandocDocx "IIOHR-Consultant-Academic-Vol2-Advanced-v$Version.docx" @(
    (Join-Path $EditionRoot "volume-2-advanced.md")
)

Invoke-PandocDocx "IIOHR-Consultant-Academic-Vol3-Diploma-v$Version.docx" @(
    (Join-Path $EditionRoot "volume-3-diploma.md")
)

Invoke-PandocDocx "IIOHR-Consultant-Academic-AppendixA-AssetPack-v$Version.docx" @(
    (Join-Path $EditionRoot "appendix-asset-pack.md")
)

Invoke-PandocDocx "IIOHR-Consultant-Academic-Edition-README-v$Version.docx" @(
    (Join-Path $EditionRoot "README.md")
)

$xelatex = Get-Command xelatex -ErrorAction SilentlyContinue
if ($xelatex) {
    $pdfPath = Join-Path $OutDir "IIOHR-Consultant-Academic-Manual-FULL-v$Version.pdf"
    $pdfArgs = @()
    $pdfArgs += $refArgs
    $pdfArgs += @(
        (Join-Path $EditionRoot "README.md"),
        (Join-Path $EditionRoot "volume-1-foundation.md"),
        (Join-Path $EditionRoot "volume-2-advanced.md"),
        (Join-Path $EditionRoot "volume-3-diploma.md"),
        (Join-Path $EditionRoot "appendix-asset-pack.md"),
        "-o", $pdfPath,
        "--pdf-engine=xelatex"
    )
    & pandoc @pdfArgs
    if ($LASTEXITCODE -eq 0) {
        Write-Host "wrote $pdfPath"
    } else {
        Write-Host "note: PDF export failed; use Word -> Save as PDF (see EXPORT_WORKFLOW.md)"
    }
} else {
    Write-Host "note: xelatex not found — skipping PDF. See EXPORT_WORKFLOW.md (Word -> PDF)."
}

Write-Host "done."

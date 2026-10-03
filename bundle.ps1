# Aenigma Standalone Universal Bundler (PowerShell)
$srcDir = "src"
$distDir = "dist"
$outFile = "dist/bundle.js"

if (-not (Test-Path $distDir)) {
  New-Item -ItemType Directory -Path $distDir -Force | Out-Null
}

$fileOrder = @(
  'audio.js',
  'dialogue_i18n.js',
  'i18n.js',
  'thoughts.js',
  'cases.js',
  'state.js',
  'dice.js',
  'ui.js',
  'main.js'
)

$sb = New-Object System.Text.StringBuilder
[void]$sb.AppendLine("/* Aenigma Detective Mystery RPG - Standalone Bundle */")
[void]$sb.AppendLine("(function() {")
[void]$sb.AppendLine("'use strict';`n")

foreach ($file in $fileOrder) {
  $filePath = Join-Path $srcDir $file
  if (-not (Test-Path $filePath)) {
    Write-Error "File not found: $filePath"
    exit 1
  }
  $content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

  # Remove import statements
  $content = [System.Text.RegularExpressions.Regex]::Replace($content, "(?m)^import\s+[\s\S]*?from\s+['`"][^'`"]+['`"];?\r?\n", "")

  # Remove export keywords
  $content = [System.Text.RegularExpressions.Regex]::Replace($content, "(?m)^export\s+default\s+", "")
  $content = [System.Text.RegularExpressions.Regex]::Replace($content, "(?m)^export\s+(const|let|var|class|function)\s+", "`$1 ")
  $content = [System.Text.RegularExpressions.Regex]::Replace($content, "(?m)^export\s*\{[\s\S]*?\};?\r?\n", "")

  [void]$sb.AppendLine("// --- BEGIN: $file ---")
  [void]$sb.AppendLine($content)
  [void]$sb.AppendLine("// --- END: $file ---`n")
}

[void]$sb.AppendLine("})();")

[System.IO.File]::WriteAllText($outFile, $sb.ToString(), [System.Text.Encoding]::UTF8)
Write-Output "Bundle created successfully at $outFile ($($sb.Length) chars)"

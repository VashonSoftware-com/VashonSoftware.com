# Renders each <slug>.html here to public/images/blog/<slug>.png (1200x630) with headless Chrome.
# Usage: pwsh design/blog-images/render.ps1 [slug ...]   (no args = all)
param([string[]]$Slugs)
$here = $PSScriptRoot
$out = Join-Path $here '..\..\public\images\blog' | Resolve-Path -ErrorAction SilentlyContinue
if (-not $out) { $out = New-Item -ItemType Directory -Force (Join-Path $here '..\..\public\images\blog') }
$chrome = "$env:ProgramFiles\Google\Chrome\Application\chrome.exe"
$files = if ($Slugs) { $Slugs | ForEach-Object { Join-Path $here "$_.html" } } else { Get-ChildItem $here -Filter *.html | ForEach-Object FullName }
foreach ($f in $files) {
  $slug = [IO.Path]::GetFileNameWithoutExtension($f)
  $png = Join-Path $out "$slug.png"
  $url = 'file:///' + ($f -replace '\\', '/')
  & $chrome --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 `
    --allow-file-access-from-files --window-size=1200,630 --virtual-time-budget=3000 "--screenshot=$png" $url 2>&1 | Out-Null
  "$slug -> $png"
}

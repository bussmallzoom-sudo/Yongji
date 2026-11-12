$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot
Copy-Item -Path 'dist\*' -Destination 'portable' -Recurse -Force
$portableRoot = (Resolve-Path -LiteralPath 'portable').Path
$pageCount = 0
foreach ($pageFile in (Get-ChildItem -LiteralPath 'portable' -Filter '*.html' -Recurse)) {
  $pageText = [System.IO.File]::ReadAllText($pageFile.FullName)
  $pageDirectory = $pageFile.DirectoryName
  $pageText = [regex]::Replace($pageText, '(href|src)="/(?!/)([^"\r\n]*)"', {
    param($match)
    $parts = $match.Groups[2].Value.Split('#',2)
    $targetRelative = $parts[0]
    if (-not [System.IO.Path]::HasExtension($targetRelative)) { $targetRelative = $targetRelative.TrimEnd('/') + '/index.html' }
    $targetPath = Join-Path $portableRoot $targetRelative.TrimStart('/')
    if (-not (Test-Path -LiteralPath $targetPath)) { throw "Missing local target: $targetRelative" }
    $relativePath = [System.IO.Path]::GetRelativePath($pageDirectory,$targetPath).Replace('\','/')
    $hashPart = if ($parts.Count -gt 1) { '#' + $parts[1] } else { '' }
    $match.Groups[1].Value + '="' + $relativePath + $hashPart + '"'
  })
  [System.IO.File]::WriteAllText($pageFile.FullName,$pageText,[System.Text.UTF8Encoding]::new($false))
  $pageCount++
}
Write-Output "Updated $pageCount portable pages."

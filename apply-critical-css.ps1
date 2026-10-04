<#
  apply-critical-css.ps1
  ----------------------
  For every HTML file in the project root:
  1. Replaces the two blocking <link> tags for bootstrap.min.css and main.css
     with deferred (media="print") versions + <noscript> fallbacks.
  2. Injects an inline <style> block with critical above-the-fold CSS
     immediately before </head>.

  Run from project root:
    pwsh .\apply-critical-css.ps1
#>

$criticalCss = @'
    <!-- === PERFORMANCE: Critical above-the-fold CSS (inlined) === -->
    <style>
      :root{--body:#060606;--black:#000;--white:#fff;--theme:#b4a086;--header:#fff;--text:#b5b5b5;--border:#fcfcfc;--bg:#1a1a1a}
      *,*::before,*::after{box-sizing:border-box}
      body{margin:0;padding:0;overflow-x:hidden;background-color:var(--body);font-family:"Kanit",sans-serif;color:var(--text)}
      img{max-width:100%;display:block}a{text-decoration:none;color:inherit}ul{list-style:none;padding:0;margin:0}
      .container{width:100%;padding-right:12px;padding-left:12px;margin-right:auto;margin-left:auto}
      @media(min-width:576px){.container{max-width:540px}}@media(min-width:768px){.container{max-width:720px}}
      @media(min-width:992px){.container{max-width:960px}}@media(min-width:1200px){.container{max-width:1140px}}
      @media(min-width:1400px){.container{max-width:1320px}}
      .d-none{display:none!important}.fix{overflow:hidden}
      .preloader{position:fixed;inset:0;z-index:99999;background:#060606;display:flex;align-items:center;justify-content:center;flex-direction:column}
      .preloader svg{position:absolute;inset:0;width:100%;height:100%}
      .preloader-text{position:relative;z-index:1;color:#fff;font-family:"Big Shoulders Display",sans-serif;font-size:2rem;letter-spacing:.1em;text-transform:uppercase}
      header{position:fixed;top:0;left:0;right:0;z-index:999}
      #header-sticky{width:100%;transition:background .3s ease,padding .3s ease}
      .header-main{display:flex;align-items:center;justify-content:space-between;padding:18px 0}
      .header-logo img{height:40px}
      #smooth-wrapper{will-change:transform}
      .back-to-top{position:fixed;bottom:30px;right:30px;z-index:99;width:45px;height:45px;border-radius:50%;display:none;align-items:center;justify-content:center;cursor:pointer;border:none;background:var(--theme)}
      .mouseCursor{position:fixed;pointer-events:none;z-index:10000;border-radius:50%}
      .cursor-outer{width:30px;height:30px;border:2px solid rgba(199,174,134,.5)}
      .cursor-inner{width:8px;height:8px;background:#c7ae86;transform:translate(-50%,-50%)}
    </style>
'@

# Deferred bootstrap block (replaces blocking <link rel="stylesheet" href="assets/css/bootstrap.min.css" />)
$deferredBootstrap = @'
    <!--<< Bootstrap min.css (deferred) >>-->
    <link
      rel="stylesheet"
      href="assets/css/bootstrap.min.css"
      media="print"
      onload="this.media='all'"
    />
    <noscript><link rel="stylesheet" href="assets/css/bootstrap.min.css" /></noscript>
'@

# Deferred main.css block (replaces blocking <link rel="stylesheet" href="assets/css/main.css" />)
$deferredMain = @'
    <!--<< Main.css (deferred) >>-->
    <link
      rel="stylesheet"
      href="assets/css/main.css"
      media="print"
      onload="this.media='all'"
    />
    <noscript><link rel="stylesheet" href="assets/css/main.css" /></noscript>
'@

$projectRoot = $PSScriptRoot
$htmlFiles = Get-ChildItem -Path $projectRoot -Filter "*.html" -File

$count = 0
foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8

    $changed = $false

    # 1. Defer bootstrap.min.css if currently blocking
    if ($content -match '<link\s+rel="stylesheet"\s+href="assets/css/bootstrap\.min\.css"\s*/>') {
        $content = $content -replace '<link\s+rel="stylesheet"\s+href="assets/css/bootstrap\.min\.css"\s*/>', $deferredBootstrap.Trim()
        $changed = $true
    }

    # 2. Defer main.css if currently blocking
    if ($content -match '<link\s+rel="stylesheet"\s+href="assets/css/main\.css"\s*/>') {
        $content = $content -replace '<link\s+rel="stylesheet"\s+href="assets/css/main\.css"\s*/>', $deferredMain.Trim()
        $changed = $true
    }

    # 3. Inject critical CSS before </head> if not already present
    if ($content -notmatch 'PERFORMANCE: Critical above-the-fold CSS') {
        $content = $content -replace '([ \t]*</head>)', ($criticalCss + '  </head>')
        $changed = $true
    }

    if ($changed) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        Write-Host "  Updated: $($file.Name)"
        $count++
    } else {
        Write-Host "  Skipped (already updated): $($file.Name)"
    }
}

Write-Host ""
Write-Host "Done. $count file(s) updated."

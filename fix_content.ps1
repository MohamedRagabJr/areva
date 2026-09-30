$f = 'c:\Users\Mohammed Ragab\Desktop\me\index-2.html'
$c = [System.IO.File]::ReadAllText($f, [System.Text.Encoding]::UTF8)

# ── Phone numbers ────────────────────────────────────────────────────────────
$c = $c -replace [regex]::Escape('tel:+01626479559">01626479559'), 'tel:+201094942833">+20 109 494 2833'
$c = $c -replace [regex]::Escape('tel:01626479559"'), 'tel:+201094942833"'
$c = $c -replace [regex]::Escape('+01 3214 0023 6969'), '+20 109 494 2833'

# ── Email ────────────────────────────────────────────────────────────────────
$c = $c -replace [regex]::Escape('mailto:hi.Areva@gmail.com"'), 'mailto:marketing@arevadevelopment.com"'
$c = $c -replace [regex]::Escape('hi.Areva @gmail.com'), 'marketing@arevadevelopment.com'

# ── Addresses (offcanvas + footer) ──────────────────────────────────────────
# Offcanvas — remove the garbled prefix char and replace the whole address line content
$c = $c -replace '(?s)(<span>Address</span>\s*[\r\n]+)[ \t]*\S*Based on honululu city, USA', '$1               <strong>Sheraton:</strong> Sheraton Heliopolis, Bldg 10, Al Moltaqa Al Araby st.<br />' + [char]10 + '               <strong>New Cairo:</strong> Plot no 158, 90th North, New Cairo, Egypt'
# Footer paragraph
$c = $c -replace '<p>.*?honululu.*?</p>', '<p><strong>Sheraton:</strong> Heliopolis, Bldg 10, Al Moltaqa Al Araby st.<br /><strong>New Cairo:</strong> Plot 158, 90th North, New Cairo, Egypt</p>'

# ── Hero section ─────────────────────────────────────────────────────────────
# Replace old YouTube video-popup link
$c = $c -replace [regex]::Escape('href="https://www.youtube.com/watch?v=-sAOWhvheK8"' + [char]13 + [char]10 + '                    class="video-btn video-popup wow fadeInUp"'), ('href="project.html"' + [char]13 + [char]10 + '                    class="video-btn wow fadeInUp"')
$c = $c -replace [regex]::Escape('>Show Reel<'), '>View Properties<'
$c = $c -replace [regex]::Escape('>Code the <b class="text-1">Future with</b>'), '>Find Your <b class="text-1">Perfect Home</b>'
$c = $c -replace [regex]::Escape('<b class="text-2">Innovative</b>'), '<b class="text-2">with Areva</b>'
$c = $c -replace [regex]::Escape('<span class="sub-text">Development</span>'), '<span class="sub-text">Estates</span>'
$c = $c -replace [regex]::Escape('We''re a team of strategic working globally with largest'), 'We connect people with exceptional properties worldwide.'
$c = $c -replace [regex]::Escape('brands, We believe that progress only you to play things'), 'Our expert agents bring vision, integrity, and unmatched'
$c = $c -replace [regex]::Escape('safe.'), 'market knowledge to every transaction.'

# ── About section ────────────────────────────────────────────────────────────
$c = $c -replace [regex]::Escape('A Senior UX &amp; UI Designer based in Kuala Lumpur with over'), 'Areva is a premier real estate development company with'
$c = $c -replace [regex]::Escape('5 years of experience, crafting user-centric fintech and'), 'offices in Sheraton Heliopolis and New Cairo, delivering'
$c = $c -replace [regex]::Escape('web experiences. Blending product thinking with visual'), 'luxury residential and commercial properties across'
$c = $c -replace [regex]::Escape('design.'), "Egypt's most prestigious addresses."
$c = $c -replace [regex]::Escape('I bring both technical expertise and a collaborative'), 'Our dedicated team brings deep market intelligence,'
$c = $c -replace [regex]::Escape('mindset to every project. My work is driven by a'), 'transparent guidance, and a relentless commitment to'
$c = $c -replace [regex]::Escape('commitment to deliver.'), 'securing the best outcomes for every client.'
$c = $c -replace [regex]::Escape('A Professional Overview of <span>My</span>'), 'A Premium Agency <span>Built on</span>'
$c = $c -replace [regex]::Escape('<span class="no-break"> Background</span> and Expertise'), '<span class="no-break"> Trust</span> &amp; Excellence'
$c = $c -replace [regex]::Escape('>get to know me'), '>explore listings'
$c = $c -replace [regex]::Escape('>download cv '), '>contact us '

# ── CTA section ──────────────────────────────────────────────────────────────
$c = $c -replace [regex]::Escape('have a PROJECT in mind?'), 'looking for your dream property?'
$c = $c -replace [regex]::Escape("let's talk"), "let's connect"
$c = $c -replace [regex]::Escape("Then you're in the right place. Get the best designs you're"), "You're in the right place. Our expert agents are ready"
$c = $c -replace [regex]::Escape('looking for. Just reach out and let me know!'), 'to guide you to the perfect home or investment!'
$c = $c -replace [regex]::Escape('>chat on whatsapp '), '>call us now '
$c = $c -replace [regex]::Escape('>hire me '), '>send enquiry '

# ── Footer ───────────────────────────────────────────────────────────────────
$c = $c -replace [regex]::Escape('Get Started a Projects?'), 'Ready to Find Your Property?'
$c = $c -replace [regex]::Escape('LET''S WORK <span>TOGETHER</span>'), 'FIND YOUR <span>DREAM HOME</span>'
$c = $c -replace [regex]::Escape('>ABOUT ME<'), '>ABOUT US<'
$c = $c -replace [regex]::Escape('>PORTFOLIO<'), '>LISTINGS<'
$c = $c -replace [regex]::Escape('>news &amp; blog<'), '>News &amp; Insights<'
$c = $c -replace [regex]::Escape('contact me</h3>'), 'contact us</h3>'
$c = $c -replace [regex]::Escape("hi.Areva @gmail.com</a"), "marketing@arevadevelopment.com</a"

[System.IO.File]::WriteAllText($f, $c, [System.Text.Encoding]::UTF8)
Write-Host 'All replacements complete.'

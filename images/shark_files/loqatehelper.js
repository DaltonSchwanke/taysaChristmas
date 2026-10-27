var loqateAccountCode = document.getElementById('loqateAccountCode').value;
(function(n,t,i,r){var u,f;n[i]=n[i]||{},n[i].initial={
    accountCode: loqateAccountCode,
    host: loqateAccountCode + '.pcapredict.com'
    },
    n[i].on=n[i].on||function(){(n[i].onq=n[i].onq||[]).push(arguments)},u=t.createElement('script'),u.async=!0,u.src=r,f=t.getElementsByTagName('script')[0],f.parentNode.insertBefore(u,f)})(window,document,'pca','//'+loqateAccountCode+'.pcapredict.com/js/sensor.js');
pca.on('ready', function () {pca.sourceString = 'LoqateDemandwareCartridge';});
document.addEventListener('DOMContentLoaded', function(){
/*
modify the following to specify the correct button
*/
    var elements = document.querySelectorAll('.btn-show-details, .btn-add-new');

    if (elements) {
        elements.forEach(function(a) {
            a.addEventListener('click', function() {
                if (typeof pca !== 'undefined') {
                    setTimeout(function() {
                        var existingScript = document.querySelector('script[src*="platformcaptureplus"]');
                        if (existingScript) {
                            var src = existingScript.src;
                            existingScript.parentNode.removeChild(existingScript);
                            var newScript = document.createElement('script');
                            newScript.src = src;
                            document.head.appendChild(newScript);
                        }
                    }, 1500);
                }
            });
        });
    }
});
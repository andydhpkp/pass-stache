function copyToClipboard() {
    //  Update PLACEHOLDER with appropriate HTML Id 
    var pwToCopy = document.getElementById('PLACEHOLDER');

    pwToCopy.select();
    document.execCommand('copy');

    console.log('copied')
}
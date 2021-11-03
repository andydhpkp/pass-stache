function copyToClipboard() {
    //  Update PLACEHOLDER with appropriate HTML Id 
    var pwToCopy = document.getElementById('copythingy');

    pwToCopy.select();
    document.execCommand('copy');

    console.log('copied')
}
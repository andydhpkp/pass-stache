function copyToClipboard() {
    //  Update PLACEHOLDER with appropriate HTML Id 
    var pwToCopy = document.getElementById('copythingy');

    pwToCopy.select();
    document.execCommand('copy');

    console.log('copied')
}

function copyToClipBoard2() {
    var text_to_copy = document.getElementById("copythingy").innerHTML;

    if (!navigator.clipboard){
        text_to_copy.select();
        document.execCommand('copy');
    
        console.log('copied the old way')
    } else{
        navigator.clipboard.writeText(text_to_copy).then(
            function(){
                console.log('copied the new way')
                alert("Password copied to clipboard!"); // success 
            })
        .catch(
            function() {
                alert("err"); // error
        });
    }  

}
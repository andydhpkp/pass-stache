function copyToClipboard() {
    //  Update PLACEHOLDER with appropriate HTML Id 
    var pwToCopy = document.getElementById('copythingy');

    pwToCopy.select();
    document.execCommand('copy');

    console.log('copied')
}

function copyToClipBoard2() {
    var text_to_copy = document.getElementById("copythingy").innerHTML;

    if (!navigator.clipboard) {
        text_to_copy.select();
        document.execCommand('copy');

        console.log('copied the old way')
    } else {
        navigator.clipboard.writeText(text_to_copy).then(
            function () {

                console.log('copied the new way')

                // display success text for two seconds
                const successTextElements = document.getElementsByClassName('clipboard-confirmation');
                console.log(successTextElements)
                for (let i = 0; i < successTextElements.length; i++) {
                    successTextElements[i].setAttribute("class", "clipboard-confirmation");
                    setTimeout(function () {
                        successTextElements[i].setAttribute("class", "clipboard-confirmation hide");
                    }, 2000);
                }
            })
            .catch(
                function () {
                    alert("err"); // error
                });
    }

}
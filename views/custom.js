//javascripts
AlloyEditor.editable('content')
AlloyEditor.editable('textText')


document.getElementById('submit-button').addEventListener('click', function ( event ) {
    post('/post', buildFormObject(), 'post')
})



function post(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
         }
    }
    console.log('sending form with', form)
    document.body.appendChild(form);
    form.submit();
}

function buildFormObject() {
    return {
        textText : document.getElementById('textText').innerHTML,
        textContent : document.getElementById('content').innerHTML
    }
}

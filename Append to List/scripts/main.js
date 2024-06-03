function add() {
    var inputBox = document.querySelector('.input-box');
    var text = inputBox.value.trim();

    if (text) {
        var listItem = document.createElement('li');
        listItem.textContent = text;
        document.getElementById('list').appendChild(listItem);
        inputBox.value = '';
        inputBox.focus();
    }
}

function reset() {
    document.getElementById('list').innerHTML = '';
    var inputBox = document.querySelector('.input-box');
    inputBox.value = '';
    inputBox.focus();
}

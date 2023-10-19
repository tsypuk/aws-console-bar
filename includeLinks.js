document.addEventListener('DOMContentLoaded', function() {
    var container = document.getElementById('links-container');
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                container.innerHTML = xhr.responseText;
            } else {
                console.error('Error loading links:', xhr.status);
            }
        }
    };

    xhr.open('GET', 'menu.html', true);
    xhr.send();
});
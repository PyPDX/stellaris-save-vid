// https://stackoverflow.com/a/42316936/3248736
function loadFile(input, callback) {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
        const fileContent = event.target.result;
        const data = JSON.parse(fileContent);
        callback(data);
    };

    reader.onerror = (event) => {
        alert(event.target.error.name);
    };

    reader.readAsText(file);
}

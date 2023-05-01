// cpt = close pinned tabs, false to default
// isURL() code taken from https://stackoverflow.com/questions/1701898/how-to-detect-whether-a-string-is-in-url-format-using-javascript

function isURL(str) {
    let regexp = /(http|https|file||chrome):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return regexp.test(str);
}

function saveSettings() {
    let cpt = document.getElementById("cpt").checked;
    if (cpt === true) localStorage.setItem('cpt', 'true');
    else localStorage.setItem('cpt', 'false');
    
    let action = document.querySelector("input[name=action]:checked").value;
    localStorage.setItem("action", action);
    
    let customurl = document.querySelector("input[name=customurl]").value || "";
    localStorage.setItem("customurl", customurl);  
    
    
    let status = document.getElementById('status');
    status.textContent = 'Settings saved!';
    setTimeout(function() {
        status.textContent = '';
    }, 750);
}

let restoreOptions = function() {
    let cpt = localStorage.getItem("cpt") || "false";
    if (cpt === "true") document.getElementById("cpt").checked = true;
    
    let action = localStorage.getItem("action") || "newtab";
    document.querySelector(`input[type="radio"][value="${action}"]`).checked = true;
    
    let customurl = localStorage.getItem("customurl") || "";
    document.querySelector("input[name=customurl]").value = customurl;
}


const saveButton = document.querySelector('#save');

saveButton.addEventListener('click', (event) => {
    let action = document.querySelector("input[name=action]:checked").value;
    
    if(action === "custom") {
        let customurl = document.querySelector("input[name=customurl]").value;
        if(isURL(customurl)) saveSettings();
        else {
            let status = document.getElementById("status");
            let warning = document.getElementById("warning");
            let saveButton = document.getElementById("save");
            status.textContent = "Settings not saved";
            warning.textContent = "Enter a valid URL starting with https://, http://, file:// or chrome://"
            saveButton.style.backgroundColor = "red";
            setTimeout(function() {
                status.textContent = " ";
                warning.textContent = ""
                saveButton.style.backgroundColor = "green";
            }, 1500);
        }
    }
    
    else saveSettings(); 
    
});


document.addEventListener("DOMContentLoaded", restoreOptions);
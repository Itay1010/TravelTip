export const storageService = {
    saveToStorage,
    loadFromStorage
}

function saveToStorage(key, val) {
    console.log('saving');
    var json = JSON.stringify(val)
    localStorage.setItem(key, json)
}

function loadFromStorage(key) {
    console.log('loading');
    const json = localStorage.getItem(key)
    const val = JSON.parse(json)
    return val
}
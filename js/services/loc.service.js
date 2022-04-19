import { utilService } from './util.service.js'
import { storageService } from './storage.service.js'

export const locService = {
    getLocs,
    addLoc,
    deleteLoc
}

const gLocs = storageService.loadFromStorage('locsDB')


function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(gLocs);
        }, 2000)
    });
}

function addLoc(name, lat, lng) {
    gLocs.push(_makeLoc(name, lat, lng))
    saveLocs()
}

function deleteLoc(id) {
    let idx = gLocs.findIndex((loc) => loc.id === id)
    gLocs.splice(idx, 1)
    saveLocs()
    console.log(gLocs)
}

function saveLocs() {
    storageService.saveToStorage('locsDB', gLocs)
}

function _makeLoc(name, lat, lng) {
    return {
        id: utilService.makeId(),
        name,
        lat,
        lng,
        createdAt: new Date().now,
        updatedAt: new Date().now
    }
}

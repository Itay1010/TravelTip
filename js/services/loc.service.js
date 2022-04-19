import { utilService } from './util.service.js'
import { storageService } from './storage.service.js'

export const locService = {
    getLocs,
    addLoc,
    deleteLoc
}

const gLocs = storageService.loadFromStorage('locsDB') || [
    _makeLoc('Greatplace', 32.047104, 34.832384),
    _makeLoc('Neveragain', 32.047201, 34.832581)
]

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
    console.log('gLocs',gLocs)
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

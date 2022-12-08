import { Mongo } from "meteor/mongo"
import {getRandomUrl} from "./urls"

export const ExportsCollection = new Mongo.Collection("exports", {
    transform: (item) => {
        item.isComplete = item.progression === 100
        return item
    }
})

/**
 * @param item
 * @param {Function} cb
 */
export const incrementExportProgression = (item, cb = undefined) => {
    if(item && item.progression < 100) {

        const progression = item.progression + 5
        const url = progression === 100 ? getRandomUrl() : ""

        ExportsCollection.update(item._id, {
            $set: {
                progression,
                url
            }
        }, undefined, cb)
    } else {
        cb(undefined, 0)
    }
}

/**
 * @param item
 * @return {Promise<number>}
 */
export const incrementExportProgressionPromisified = (item) => {
    return new Promise((resolve, reject) => {
        incrementExportProgression(item, (err, affectedRows) => {
            if(err) {
                reject(err)
            } else {
                resolve(affectedRows)
            }
        })
    })
}

/**
 * @param {string} name
 * @param {?Function} cb
 */
export const insertExport = (name, cb = undefined) => {
    ExportsCollection.insert({
        name,
        url: "",
        progression: 0,
        createdAt: new Date()
    }, cb)
}

/**
 * @param name
 * @return {Promise<string>}
 */
export const insertExportPromisified = (name) => {
    return new Promise((resolve, reject) => {
        insertExport(name, (err, uniqueId) => {
            if (err) {
                reject(err)
            } else {
                resolve(uniqueId)
            }
        })
    })
}

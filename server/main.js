import { Meteor } from 'meteor/meteor'
import {ExportsCollection, incrementExportProgression} from "/imports/api/ExportsCollection"

const progressExports = () => {
    const exports = ExportsCollection.find({
        progression: {
            $lt: 100
        }
    })
    exports.forEach(incrementExportProgression)
}

Meteor.startup(() => {
  // code to run on server at startup
    Meteor.setInterval(progressExports, 1000)
})

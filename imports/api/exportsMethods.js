import { check } from 'meteor/check'
import { insertExport } from './ExportsCollection'

Meteor.methods({
    "exports.insert"(name) {
        check(name, String)

        insertExport(name)
    }
})

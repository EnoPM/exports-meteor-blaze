import { Meteor } from "meteor/meteor"
import { ExportsCollection } from "/imports/api/ExportsCollection"

Meteor.publish('exports', function publishExports() {
    return ExportsCollection.find({})
})

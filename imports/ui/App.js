import { Template } from "meteor/templating"
import {ExportsCollection} from "../api/ExportsCollection"

import "./App.html"
import "./Export.js"

Template.mainContainer.helpers({
    exports() {
        return ExportsCollection.find({}, {
            sort: {
                createdAt: -1
            }
        })
    },
})

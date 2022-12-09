import { Template } from "meteor/templating"
import { ReactiveDict } from "meteor/reactive-dict"
import { ExportsCollection } from "../api/ExportsCollection"

import "./App.html"
import "./Export.js"

const IS_LOADING_STRING = "isLoading"

Template.mainContainer.helpers({
    exports() {
        return ExportsCollection.find({}, {
            sort: {
                createdAt: -1
            }
        })
    },
    isLoading() {
        const instance = Template.instance()
        return instance.state.get(IS_LOADING_STRING)
    }
})

Template.mainContainer.onCreated(function mainContainerOnCreated() {
    this.state = new ReactiveDict()

    const handler = Meteor.subscribe('exports')
    Tracker.autorun(() => {
        this.state.set(IS_LOADING_STRING, !handler.ready())
    })
})

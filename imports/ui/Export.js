import { Template } from "meteor/templating"

import "./Export.html"

Template.export.helpers({
    /**
     * @param {string} url
     * @returns {string}
     */
    prettifyUrl(url) {
        const urlWithoutProtocol = url.replace(/^https?:\/\//, '')
        if (urlWithoutProtocol.endsWith('/')) {
            return urlWithoutProtocol.substring(0, urlWithoutProtocol.length - '/'.length)
        }
        return urlWithoutProtocol
    }
})

Template.form.events({
    /**
     * @param {SubmitEvent} event
     */
    "submit .export-form"(event) {
        event.preventDefault()
        const { target } = event
        const name = target.name.value

        if(name.trim() !== "") {
            Meteor.call("exports.insert", name)

            target.name.value = ""
        }
    }
})

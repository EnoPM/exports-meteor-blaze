import assert from "assert"
import {
  ExportsCollection,
  incrementExportProgressionPromisified,
  insertExportPromisified
} from "../imports/api/ExportsCollection";

describe("exports-meteor-blaze", function () {
  it("package.json has correct name", async function () {
    const { name } = await import("../package.json")
    assert.strictEqual(name, "exports-meteor-blaze")
  })

  if (Meteor.isClient) {
    it("client is not server", function () {
      assert.strictEqual(Meteor.isServer, false)
    })
  }

  if (Meteor.isServer) {
    it("server is not client", function () {
      assert.strictEqual(Meteor.isClient, false)
    })
  }
})

describe("exports manipulation", function () {
  const name = "export test name"

  it("the document has been successfully inserted", async function () {
    const uniqueId = await insertExportPromisified(name)
    assert.ok(uniqueId)
  })

  it("the record inserted is the same as the one retrieved", async function () {
    const uniqueId = await insertExportPromisified(name)
    const record = ExportsCollection.findOne({
      _id: uniqueId
    })
    assert.strictEqual(record._id, uniqueId)
    assert.strictEqual(record.name, name)
  })

  it("export is incremented", async function () {
    const uniqueId = await insertExportPromisified(name)
    const record = ExportsCollection.findOne({
      _id: uniqueId
    })
    const affectedRows = await incrementExportProgressionPromisified(record)
    const updatedRecord = ExportsCollection.findOne({
      _id: uniqueId
    })
    assert.strictEqual(affectedRows, 1)
    assert.strictEqual(updatedRecord.progression, 5)
  })

  it("a url is assigned when the export is complete", async function() {
    const uniqueId = await insertExportPromisified(name)
    ExportsCollection.update(uniqueId, {
      $set: {
        progression: 95,
        url: ""
      }
    })
    const record = ExportsCollection.findOne({
      _id: uniqueId
    })
    await incrementExportProgressionPromisified(record)
    const updatedRecord = ExportsCollection.findOne({
      _id: uniqueId
    })
    assert.notStrictEqual(updatedRecord.url, "")
  })
})

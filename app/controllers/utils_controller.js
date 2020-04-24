const { LANGUAGES } = require("../../client/languages.js")
const { Controller } = require("./base_controller.js")

class UtilsController extends Controller {
  constructor(...args) {
      super(...args)
    }
  languages() {
    const langs = [...Object.entries(LANGUAGES)]
      .map(([id, displayName]) =>
        {return {id, displayName}})

    this.text(
      JSON.stringify(langs,null,2),
      {contentType: "application/json"})
  }
}
UtilsController.before = {}

module.exports = { UtilsController }
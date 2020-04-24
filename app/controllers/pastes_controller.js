const { LANGUAGES } = require("../../client/languages.js")
const { THEMES } = require("../../client/themes.js")
const { Controller } = require("./base_controller.js")
const Paste = require("../models/paste.js")

let TICKS = 0
const periodically = async (fn, {every}) => {
  if (TICKS % every === 0)
    fn()
  TICKS++
}

class PastesController extends Controller {

  constructor(...args) {
    super(...args)
    this.beforeAll();
  }

  beforeAll() {
    this.response.locals.theme = this.request.cookies.theme || THEMES.default
  }

  new() {
    this.render("pastes/new", { LANGUAGES, THEMES })
  }

  async loadPaste() {
    const paste = await Paste.findByKey(this.params.key);
    if (!paste) return this.next()

    if (paste.isExpired) {
      paste.destroy()
      return this.next()
    }
    this.data.paste = paste
  }

  async show() {
    await this.loadPaste()

    this.render("pastes/show", {paste: this.data.paste} )
  }

  async raw() {
    await this.loadPaste()

    this.text(this.data.paste.content)
  }

  async create() {
    if (this.params.content.trim() === "") {
      resp.redirect("/")
      return;
    }

    const {content, language} = this.params;
    const paste = new Paste({content, language});
    await paste.save();
    this.response.cookie('language',language, { maxAge: 1000*60*60*24*365 });
    this.redirect(`/p/${paste.key}`)

    periodically(async () => {
      let count = await Paste.deleteExpired();
      console.log(`Deleting old pastes: ${count}`)
    },{every: 100})
  }

}
PastesController.before = {}

exports.PastesController = PastesController
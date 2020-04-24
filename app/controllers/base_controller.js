class Controller {

    constructor(req, resp, next) {
      this.request = req
      this.response = resp
      this._next = next
      this.data = {}
    }

    get params() {
        let pms = this.request.params
        Object.assign(pms, this.request.body)
        return pms
    }

    render(...args) {
      if (this._next_called) return

      this.response.render(...args)
    }

    async handle(action) {
        if (this.constructor.before[action])
            this.constructor.before[action].apply(this)
        await this[action]()
    }

    text(content, { contentType } = { contentType: "text"}) {
      if (this._next_called) return

        this.response.contentType(contentType)
        this.response.send(content)
    }

    redirect(url) {
      this.response.redirect(url)
    }

    next() {
      this._next_called = true
      this._next()
    }
  }

exports.Controller = Controller
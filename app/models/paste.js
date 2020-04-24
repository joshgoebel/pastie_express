const { Model } = require('objection');
const { v4: uuid } = require('uuid');
const uuidBase62 = require('uuid-base62');
const {LANGUAGES} = require("../../client/languages")

const toUTC = (d) => {
  // return new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return d;
}

const round = (n, precision) => {
  return Number(n.toFixed(precision));
}

const MINUTES_IN_HOUR = 60
const SECONDS_PER_MIN = 60
const HOURS_PER_DAY = 24
const DAY_IN_MILLIS = HOURS_PER_DAY * MINUTES_IN_HOUR * SECONDS_PER_MIN * 1000

class Paste extends Model {

  constructor(data) {
    super();
    if (data) {
      Object.assign(this, data);
    }
  }

  $beforeInsert() {
    const oneDayLater = new Date(new Date().getTime() + DAY_IN_MILLIS);
    this.expires_at = oneDayLater.toISOString();
    this.uuid = uuid();
    this.key = uuidBase62.encode(this.uuid);
  }

  $afterGet() {
    this.expires_at = new Date(this.expires_at)
  }

  get ttl() {
    return (this.expires_at - toUTC(new Date())) / 1000 / 60 / 60
  }

  // TODO move to presenter
  get ttlText() {
    if (this.ttl < 1) {
      return `${round(this.ttl * MINUTES_IN_HOUR, 0)} mins`
    } else {
      return `${round(this.ttl, 0)} hours`
    }
  }

  get kbSize() {
    return this.content.length / 1000;
  }

  get kbSizeText() {
    if (this.kbSize > 1) {
      return `${round(this.kbSize,1)}<sup>KB</sup>`
    } else {
      return ""
    }
  }

  get languageName() {
    return LANGUAGES[this.language] || this.language;
  }

  get isExpired() {
    return this.ttl < 0
  }

  get lineCount() {
    return this.content.split("\n").length
  }

  static async deleteExpired() {
    const ONE_DAY_AGO = new Date(new Date().getTime() - DAY_IN_MILLIS);
    const pastes = await Paste
      .query()
      .delete()
      .where("expires_at","<",ONE_DAY_AGO)
    return pastes
  }

  static async expired() {
    const ONE_DAY_AGO = new Date(new Date().getTime() - DAY_IN_MILLIS);
    const pastes = await Paste
      .query()
      .where("expires_at","<",ONE_DAY_AGO)
    return pastes
  }

  static async findByKey(key) {
    const paste = await Paste
      .query()
      .where("key","=", key)
      .first()
    return paste
  }

  async destroy() {
    await Paste.query().deleteById(this.id);
  }

  async save() {
    const inserted = await Paste
      .query()
      .insert(this)
    var data = await Paste.query().findById(this.id);
    Object.assign(this, data);
  }

  static get tableName() {
    return 'pastes';
  }

}

module.exports = Paste
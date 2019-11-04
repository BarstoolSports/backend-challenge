class CommonService {
  /**
   * @constructor
   */
  constructor(model) {
    this._model = model.createModel()
  }

  /**
   * @prop {MongooseModel} model
   */
  get model() {
    return this._model
  }

  /**
   * @method create
   * @param {Object} data
   * @return {Query}
   */
  create() {
    return this.model.create(...arguments)
  }

  /**
   * @method find
   * @param {Object} [query]
   * @return {Query}
   */
  find() {
    return this.model.find(...arguments)
  }

  /**
   * @method findById
   * @param {Object} [query]
   * @return {Query}
   */
  findById() {
    return this.model.findById(...arguments)
  }

  /**
   * @method findByIdAndUpdate
   * @param {Object} [query]
   * @return {Query}
   */
  findByIdAndUpdate(query, update, options = {}) {
    return this.model.findByIdAndUpdate(query, update, { ...options, new: true })
  }

  /**
   * @method findByIdAndDelete
   * @param {Object} [query]
   * @return {Query}
   */
  findByIdAndDelete() {
    return this.model.findByIdAndDelete(...arguments)
  }

  /**
   * @method findOne
   * @param {Object} [query]
   * @return {Query}
   */
  findOne() {
    return this.model.findOne(...arguments)
  }

  /**
   * @method findOneAndUpdate
   * @param {Object} [query]
   * @return {Query}
   */
  findOneAndUpdate(query, update, options = {}) {
    return this.model.findOneAndUpdate(query, update, { ...options, new: true })
  }

  /**
   * @method findOneAndDelete
   * @param {Object} [query]
   * @return {Query}
   */
  findOneAndDelete() {
    return this.model.findOneAndDelete(...arguments)
  }

  /**
   * @method updateMany
   * @param {Object} [query]
   * @return {Query}
   */
  updateMany() {
    return this.model.updateMany(...arguments)
  }

  /**
   * @method deleteMany
   * @param {Object} [query]
   * @return {Query}
   */
  deleteMany() {
    return this.model.deleteMany(...arguments)
  }

  /**
   * @method count
   * @param {Object} [query]
   * @return {Query}
   */
  count() {
    return this.model.countDocuments(...arguments)
  }

  /**
   * @method distinct
   * @param {Object} [query]
   * @return {Query}
   */
  distinct() {
    return this.model.distinct(...arguments)
  }

  /**
   * Start an aggregation chain
   *
   * @method aggregate
   * @return {AggregateQuery}
   */
  aggregate() {
    return this.model.aggregate(...arguments)
  }
}

module.exports = CommonService

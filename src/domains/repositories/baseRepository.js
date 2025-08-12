class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    const doc = new this.model(data);
    return await doc.save();
  }

  async findById(id) {
    return await this.model.findById(id);
  }

  async findOne(filter) {
    return await this.model.findOne(filter);
  }

  async find(filter = {}) {
    return await this.model.find(filter);
  }

  async updateById(id, data) {
    return await this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteById(id) {
    return await this.model.findByIdAndDelete(id);
  }
}

module.exports = BaseRepository;

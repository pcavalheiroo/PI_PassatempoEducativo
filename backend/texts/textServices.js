const Text = require("./textModel");

class TextRepository {


  async create(data) {
    try {
      const newText = new Text({
        _id: data.id,
        h1: data.h1,
        p: data.p
      });
      await newText.save();
      return newText;
    } catch (error) {
      console.error("Erro ao criar texto:", error.message);
      throw new Error("Falha ao criar o texto");
    }
  }  

  async findAll() {
    const allTexts = await Text.find({});
    return allTexts;
  }

  async findOne(id) {
    const text = await Text.findById(id)
    return text
  }

  async remove(id) {
    await Text.findByIdAndDelete(id)
    return
  }

  async update(id, newH1, newP) {
    const updatedText = await Text.findByIdAndUpdate(
      id,
      { h1: newH1 },
      { p: newP },
      { new: true }
    );
    return updatedText;
  }

}

module.exports = TextRepository;
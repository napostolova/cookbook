const Recipe = require('../models/Recipe');

async function getAll() {
    return  Recipe.find({});
}

async function create(data) {
    const result = new Recipe(data);
    await result.save();

    return result;
}

async function getOneById(id) {
    return  Recipe.findOne({_id: id});
    
}

async function getMyItemsById(id) {
    return  Recipe.find({ownerId: id});
    
}

async function update(original, updated) {
    Object.assign(original, updated);
    await original.save();

    return original;

}

async function like(recipeId, userId) {
     await Recipe.updateOne({_id: recipeId},  { $addToSet: { likes: userId } }, { new: true })
}

async function remove(id) {
    return  Recipe.findByIdAndDelete(id);
}

module.exports = {
    getAll,
    getMyItemsById,
    getOneById,
    create,
    update,
    like,
    remove

};
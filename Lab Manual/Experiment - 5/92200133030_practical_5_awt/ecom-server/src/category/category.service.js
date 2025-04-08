const db = require("../helper/db.helper");
const { Op } = require("sequelize");

module.exports = {
    getAll,
    getById,
    create,
    update,
    del,
    changeStatus,
    searchByKeyword,
};

async function getAll() {
    return await db.Category.findAll();
}

async function create(params) {
    if (await db.Category.findOne({ where: { category_name: params.category_name } })) {
        return "Category " + params.category_name + " is already exists";
    }
    const category = new db.Category(params);

    await category.save();
    return category;
}

async function getById(id, callback) {
    getCategory(id)
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function update(id, params) {
    const category = await getCategory(id);
    const nameChanged = params.category_name && params.category_name !== category.category_name;
    if (
        nameChanged &&
        (await db.Category.findOne({ where: { category_name: params.category_name } }))
    ) {
        return "Category with name " + params.category_name + " is already exists";
    }
    Object.assign(category, params);
    await category.save();
    return category;
}

async function changeStatus(id) {
    const category = await getCategory(id);
    //    const ret_msg = '';
    if (category.category_status) {
        category.category_status = false;
        // ret_msg = 'Camp Inactivated';
        console.log("from true");
    } else {
        category.category_status = true;
        console.log("from false");
        // ret_msg = 'Camp Activated';
    }
    await category.save();
    return category;
}

async function searchByKeyword(searchKeyword) {
    const category = await db.Category.findAll({
        where: { category_name: { [Op.like]: "%" + searchKeyword + "%" } },
    });

    if (!category || category == []) return "no category found";
    return category;
}

async function getCategory(id) {
    const category = await db.Category.findByPk(id);
    if (!category) return "category not found";
    return category;
}

async function del(did) {
    return await db.Category.destroy({
        where: {
            id: did
        }
    });
}
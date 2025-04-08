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
    return await db.Product.findAll(
        {
            include: [
                {
                    model: db.Category
                }
            ],
        },
    );
}

async function create(params) {
    if (await db.Product.findOne({ where: { product_name: params.product_name } })) {
        return "Product " + params.product_name + " is already exists";
    }
    const product = new db.Product(params);

    await product.save();
    return product;
}

async function getById(id, callback) {
    getProduct(id)
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function update(id, params) {
    const product = await getProduct(id);
    const nameChanged = params.product_name && params.product_name !== product.product_name;
    if (
        nameChanged &&
        (await db.Product.findOne({ where: { product_name: params.product_name } }))
    ) {
        return "Product with name " + params.product_name + " is already exists";
    }
    Object.assign(product, params);
    await product.save();
    return product;
}

async function changeStatus(id) {
    const product = await getProduct(id);
    //    const ret_msg = '';
    if (product.product_status) {
        product.product_status = false;
        // ret_msg = 'Camp Inactivated';
        console.log("from true");
    } else {
        product.product_status = true;
        console.log("from false");
        // ret_msg = 'Camp Activated';
    }
    await product.save();
    return product;
}

async function searchByKeyword(searchKeyword) {
    const product = await db.Product.findAll({
        where: { product_name: { [Op.like]: "%" + searchKeyword + "%" } },
    });

    if (!product || product == []) return "no product found";
    return product;
}

async function getProduct(id) {
    const product = await db.Product.findByPk(id);
    if (!product) return "product not found";
    return product;
}

async function del(did) {
    return await db.Product.destroy({
        where: {
            id: did
        }
    });
}
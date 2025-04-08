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
    return await db.Varient.findAll(
        {
            include: [
                {
                    model: db.Product
                },
                {
                    model: db.Category
                }
            ],
        },
    );
}

async function create(params) {
    if (await db.Varient.findOne({ where: { varient_name: params.varient_name } })) {
        return "Varient " + params.varient_name + " is already exists";
    }
    const varient = new db.Varient(params);

    await varient.save();
    return varient;
}

async function getById(id, callback) {
    getVarient(id)
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function update(id, params) {
    const varient = await getVarient(id);
    const nameChanged = params.varient_name && params.varient_name !== varient.varient_name;
    if (
        nameChanged &&
        (await db.Varient.findOne({ where: { varient_name: params.varient_name } }))
    ) {
        return "Varient with name " + params.varient_name + " is already exists";
    }
    Object.assign(varient, params);
    await varient.save();
    return varient;
}

async function changeStatus(id) {
    const varient = await getVarient(id);
    //    const ret_msg = '';
    if (varient.varient_status) {
        varient.varient_status = false;
        // ret_msg = 'Camp Inactivated';
        console.log("from true");
    } else {
        varient.varient_status = true;
        console.log("from false");
        // ret_msg = 'Camp Activated';
    }
    await varient.save();
    return varient;
}

async function searchByKeyword(searchKeyword) {
    const varient = await db.Varient.findAll({
        where: { varient_name: { [Op.like]: "%" + searchKeyword + "%" } },
    });

    if (!varient || varient == []) return "no varient found";
    return varient;
}

async function getVarient(id) {
    const varient = await db.Varient.findByPk(id);
    if (!varient) return "varient not found";
    return varient;
}

async function del(did) {
    return await db.Varient.destroy({
        where: {
            id: did
        }
    });
}
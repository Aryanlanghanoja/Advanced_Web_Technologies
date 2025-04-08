const category_service = require("../category/category.service");

exports.create = (req, res, next) => {
    category_service
        .create(req.body)
        .then((response) =>
            res.status(200).send({
                message: typeof response === "string" ? "Error" : "Success",
                data: response,
            })
        )
        .catch(next);
};

exports.findAll = (req, res, next) => {
    category_service
        .getAll()
        .then((response) =>
            res.status(200).send({
                message: typeof response === "string" ? "Error" : "Success",
                data: response,
            })
        )
        .catch(next);
};

exports.findOne = (req, res, next) => {
    category_service.getById(req.params.id, (error, response) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: typeof response === "string" ? "Error" : "Success",
                data: response,
            });
        }
    });
};

exports.update = (req, res, next) => {
    category_service
        .update(req.params.id, req.body)
        .then((response) =>
            res.status(200).send({
                message: typeof response === "string" ? "Error" : "Success",
                data: response,
            })
        )
        .catch(next);
};

exports.delete = (req, res, next) => {
    category_service
        .changeStatus(req.params.id)
        .then((response) =>
            res.status(200).send({ message: "Success", data: response })
        )
        .catch(next);
};

exports.search = (req, res, next) => {
    category_service
        .searchByKeyword(req.params.keyword)
        .then((response) =>
            res.status(200).send({
                message: typeof response === "string" ? "Error" : "Success",
                data: response,
            })
        )
        .catch(next);
};

exports.del = (req, res, next) => {
    category_service
        .del(req.params.id)
        .then((response) =>
            res.status(200).send({ message: "Success", data: response })
        )
        .catch(next);
};

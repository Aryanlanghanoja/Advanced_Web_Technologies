const document_service = require("../services/documents.services");

exports.create = (req, res, next) => {
    document_service
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
    document_service
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
    document_service
        .getById(req.params.id)
        .then((response) =>
            res.status(200).send({
                message: typeof response === "string" ? "Error" : "Success",
                data: response,
            })
        )
        .catch(next);
};

exports.update = (req, res, next) => {
    document_service
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
    document_service
        .deleteByID(req.params.id)
        .then((response) =>
            res.status(200).send({
                message: "Success",
                data: response,
            })
        )
        .catch(next);
};

exports.findByLeadId = (req, res, next) => {
    document_service
        .getByLeadId(req.params.leadId)
        .then((response) =>
            res.status(200).send({
                message: typeof response === "string" ? "Error" : "Success",
                data: response,
            })
        )
        .catch(next);
};

exports.findByFollowupId = (req, res, next) => {
    document_service
        .getByFollowupId(req.params.followupId)
        .then((response) =>
            res.status(200).send({
                message: typeof response === "string" ? "Error" : "Success",
                data: response,
            })
        )
        .catch(next);
};

exports.searchByFileNameInLead = (req, res, next) => {
    const { leadId, fileName } = req.params;

    document_service
        .searchByFileNameInLead(leadId, fileName)
        .then((response) =>
            res.status(200).send({
                message: typeof response === "string" ? "Error" : "Success",
                data: response,
            })
        )
        .catch(next);
};

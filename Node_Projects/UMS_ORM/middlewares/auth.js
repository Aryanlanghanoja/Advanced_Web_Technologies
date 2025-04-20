const isAuthorize = async (req, res, next) => {
    try {
        if(
            !req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer') ||
            !req.headers.authorization.split(' ')[1]
        ) {
            return res.status(422).json({ 
                message: 'Please Provide a Valid Token' 
            });
        }

        next();
    } catch (error) {
        console.log(error.message);
        res.status(401).json({ 
            message: error.message 
        });
    }
}

module.exports = {
    isAuthorize
}
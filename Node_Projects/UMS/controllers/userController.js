const { validationResult } = require("express-validator")
const bcrypt = require("bcryptjs");
const db = require("../config/dbConnection") 
const randomString = require('randomstring')
const sendMail = require("../helpers/sendMail");
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env ;

const register = (req,res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    db.query(
        `SELECT * FROM USERS WHERE LOWER(email) = LOWER(${db.escape(req.body.email)});`,
        (err, result) => {

            if(result && result.length > 0) {
                return res.status(409).json({
                    message: "Email Already Exists",
                });
            }
            else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(400).json({
                            message: "From Hash " + err.message,
                        });
                    }
                    
                    else {
                        db.query(
                            `INSERT INTO USERS (name, email, password, image) 
                            VALUES (${db.escape(req.body.name)}, ${db.escape(req.body.email)}, ${db.escape(hash)}, ${db.escape('images/' + req.file.filename)});`
                            ,
                            (err, result) => {
                                if (err) {
                                    return res.status(400).json({
                                        message: err,
                                    });
                                }

                                let mailSubject = "Verification Email From Griwa Internationals";
                                const randomToken = randomString.generate();
                                let content = '<p> Hello ' + req.body.name + ', \
                                Please<a href="http://127.0.0.1:3000/mail_verification?token='+ randomToken + '">Verify</a> Your Email Address.</p>' ;
                                sendMail(req.body.email, mailSubject, content);

                                db.query( 
                                    `UPDATE USERS SET token = ? WHERE email = ?;`,
                                    [randomToken, req.body.email],
                                    function(err, result){
                                        if(err) {
                                            return res.status(400).json({
                                                message: err,
                                            });
                                        }
                                        
                                        else {
                                            console.log("Token Updated Successfully")
                                            console.log("Token: " + randomToken);
                                        }

                                    }
                                );

                                return res.status(201).json({
                                    message: "User Created Successfully",
                                });
                            }
                        );
                    }

                });
            }
        }
    )
}

const verifyMail = (req,res) => {
    var token = req.query.token;

    db.query(
        'SELECT * FROM USERS WHERE token = ? LIMIT 1',
        token ,
        function (error , result , fields) {
            if(error) {
                console.log(error.message);
            }

            if(result.length > 0) {

                db.query(
                    `UPDATE USERS SET token = NULL, is_verified = 1 WHERE id = '${result[0].id}'`

                );

                return res.render('mail_verification',
                    {
                        message: "Email Verified Successfully",
                    }
                )

            }

            else {
                return res.render('Not_Found')
            }
        }
    )

}

const login = (req,res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    db.query(
        `SELECT * FROM USERS WHERE email = ${db.escape(req.body.email)};`,
        (error , result) => {
            if(error) {
                return res.status(400).json({
                    message: error.message,
                });
            }

            if(!result.length) {
                return res.status(401).json({
                    message: "Email or Password is Incorrect User Not Found",
                });
            }

            else {

                bcrypt.compare(req.body.password, result[0]['password'], (BErr, BResult) => {
                    if(BErr) {
                        return res.status(400).json({
                            message: BErr.message,
                        });
                    }

                    if(BResult) {
                        
                        const token = jwt.sign({ id: result[0]['id'] , is_admin: result[0]['is_admin']}, JWT_SECRET, { expiresIn: '1h' });

                        db.query(
                            `UPDATE USERS SET last_login = now() WHERE id = '${result[0]['id']}'`
                        );

                        return res.status(200).json({
                            message: "Login Successfully",
                            token: token,
                            user: result[0]
                        });
                    }

                    else {
                        return res.status(401).json({
                            message: "Email or Password is Incorrect. Password Is Wrong",
                        });
                    }
                });
            }
        }
    );
}

const getUser = (req,res) => {
    const authtoken = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(authtoken, JWT_SECRET);
    const userId = decoded.id;
    const isAdmin = decoded.is_admin;

    db.query(
        `SELECT * FROM USERS WHERE id = ${db.escape(userId)};`,
        (error , result , fields) => {
            if(error) {
                return res.status(400).json({
                    message: error.message,
                });
            }

            if(!result.length) {
                return res.status(401).json({
                    message: "User Not Found",
                });
            }

            else {
                return res.status(200).json({
                    message: "User Fetched Sucessfully!",
                    user: result[0],
                    isAdmin: isAdmin ,
                    sucess : true
                });
            }
        }
    );
}   

const forgotPassword = (req,res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    var email = req.body.email ;

    db.query(
        'SELECT * FROM users WHERE email = ? LIMIT 1' ,
        email ,
        (error, result, fields) => {
            if (error) {
                return res.status(400).json({
                    message: error.message,
                });
            }

            if(result.length > 0) {

                let mailSubject = "Reset Password Email From Griwa Internationals";
                const randomToken = randomString.generate();
                let content = '<p> Hello ' + result[0].name + ', \
                <p> You have requested a password reset for your account. \
                <p> Please click the link below to reset your password: \
                <a href="http://127.0.0.1:3000/reset-password?token=' + randomToken + '">Reset Password</a> \
                <p> If you did not request this password reset, please ignore this email. \
                <p> Thank you! </p>' ;

                sendMail(email , mailSubject , content);

                db.query(
                    'DELETE FROM password_resets WHERE  email = ?',
                    result[0].email,
                );

                db.query(
                    'INSERT INTO password_resets (email, token) VALUES (?, ?)',
                    [result[0].email , randomToken],
                );

                return res.status(200).json({
                    message: "Email Sent Successfully for Password Reset",
                });

            }

            else {
                return res.status(401).json({
                    message: "Email Not Found",
                });
            }
        }
    );
}

const resetPasswordLoad = (req,res) => {
    try {
        var token = req.query.token;

        if(token == undefined) {
            return res.render('Not_Found');
        }

        db.query(
            'SELECT * FROM password_resets WHERE token = ? LIMIT 1',
            token,
            (error, result , fields) => {
                if (error) {
                    return res.status(400).json({
                        message: error.message,
                    });
                }

                if (result.length > 0) {

                    db.query(
                        'SELECT * FROM users WHERE email = ? LIMIT 1',
                        result[0].email,
                        (error, result , fields) => {
                            if (error) {
                                return res.status(400).json({
                                    message: error.message,
                                });
                            }

                            if (result !== undefined && result.length > 0) {
                                return res.render('reset_password', {
                                    user: result[0],
                                    token: token,
                                    message: "Reset Password",
                                    email: result[0].email,
                                });
                            } else {
                                return res.render('Not_Found');
                            }
                        }
                    );
                } else {
                    return res.render('Not_Found');
                }
            }
        );
        
    } catch (error) {
        console.log(error.message);

    }
}

const resetPassword = (req,res) => {
    console.log(req.body);
    if(!req.body || !req.body.password || !req.body.confirm_password) {
        return res.status(400).json({
            message: "Password and confirm password are required"
        });
    }
    const password = req.body.password;
    const confirm_password = req.body.confirm_password;
    try {
        if(password != confirm_password) {
            return res.render('reset_password', {
                error_message : "Password is Not Matching",
                user: {
                    id: req.body.user_id ,
                    email: req.body.email,
                }
            });
        }

        bcrypt.hash(req.body.confirm_password , 10, (err , hash) => {
            if (err) {
                console.log(err.message);
            }
            db.query(
                'DELETE FROM password_resets WHERE email = ?',
                req.body.email,
            );

            db.query(
                'UPDATE users SET password = ? WHERE id = ?',
                [hash , req.body.user_id],
            );

            res.render('message', {
                message: "Password Reset Successfully",
            })
        })
    } catch (error) {
        console.log(error.message);
        
    }
}

const updateProfile = (req,res) => {

    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }  

        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, JWT_SECRET);
        const id = decode.id;

        var sql = ''
        var data;

        if(req.file != undefined) {
            sql = 'UPDATE users SET name =?, email =?, image =? WHERE id =?';
            data = [req.body.name, req.body.email, 'images/' + req.file.filename, id];
        }

        else {
            sql = 'UPDATE users SET name =?, email =? WHERE id =?';
            data = [req.body.name, req.body.email, id];
        }

        db.query(
            sql,
            data,
            (error, result, fields) => {
                if (error) {
                    return res.status(400).json({
                        message: error.message,
                    });
                }

                res.status(200).json({
                    message: "Profile Updated Successfully",
                })
            }
        )
    } 
    
    catch (error) {
        return res.status(400).json({ errors: error.message });
    }
}



module.exports = {
    register ,
    verifyMail ,
    login,
    getUser ,
    forgotPassword,
    resetPasswordLoad,
    resetPassword ,
    updateProfile
};
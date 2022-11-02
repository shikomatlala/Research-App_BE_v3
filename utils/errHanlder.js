const { Certificate } = require("crypto");

const modelErrHandle = (err)=>{
    const errors = Object.values(err.errors).map((el)=> el.message);
    const message = `Invalid input data : ${errors.join(", ")}`;
    const e = new Error(message);
    e.statusCode = 400;
    e.status = 'fail';
    return e;
};

const handleDublicateEntry = (err) => {
    const message = err.parent.sqlMessage;
    const e = new Error(message);
    e.statusCode = 400;
    e.status = 'fail';
    return e;
};

const handleUnknownID = (err) => {
    const message = `ID does not exist ${err.fields.join(", ")}`;
    const e = new Error(message);
    e.statusCode = 400;
    e.status = 'fail';
    return e;
};

const errResponseHandler = (e, res)=>{
    const message = e.message;
    res.status(e.statusCode).json({
        status: e.status,
        message
    });
};

const errHender = (err, req, res, next)=>{
    const e = err;
    const code = typeof err.parent == "object" && err.parent && "errno" in err.parent
        ? err.parent.errno: 0;
    if(code == 1062) err = handleDublicateEntry(err);
    if(code == 1452) err = handleUnknownID(err);
    if(err.errors) err = modelErrHandle(err);

    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    err.message = err.message || "Oops something went wrong";

    errResponseHandler(err, res);

};
module.exports = errHender;
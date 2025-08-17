

export const validate = (schema) => (req,res,next) => {
    try{
        schema.validate(
            req.body, 
            { abortEarly: false}
        );
        next();

    } catch (err) {
        const errors = err.inner.map(e => ({
            field: e.path,
            message: e.message
        }));
        res.status(400).json({ errors });
        // errorResponse(res, 400, errors);  
    }
}



// export function Validate (schema) { 
//     return async function (req,res,next){        
//     } 
// }
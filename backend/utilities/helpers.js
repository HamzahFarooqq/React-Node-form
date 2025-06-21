// HELPERS FUNCTIONS

export function successResponse(res,status, message, data, token=null) {
    const response = {
            status: status,
            message: message,
            data: data
    }

    if(token) {
        response.token = token
    }
    return res.status(status).json(response);
}



export function errorResponse(res, status, message) {
    return res.status(status).json({
        status: status,
        message: message,        
    })
}


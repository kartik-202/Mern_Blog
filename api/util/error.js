export const errorhandler=(statuscode,message)=>{
    const error=new Error();
    error.status=statuscode;
    error.message=message;
    return error;
}
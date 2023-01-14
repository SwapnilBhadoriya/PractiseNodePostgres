
const asyncWrapper = (func)=>{

    return async (req,res)=>{
        try{
                await func(req,res);
        }
        catch(error){
            console.log(error);
        }
    }
}


module.exports = asyncWrapper;
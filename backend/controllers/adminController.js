
const addDoctor=async(req,res)=>{
    try{
       const {name ,email,password,speciality,degree,experience,about,fees,address}=req.body
       const imageFile=req.file
       console.log({name ,email,password,speciality,degree,experience,about,fees,address},imageFile);
       console.log("BODY:", req.body)
       console.log("FILE:", req.file)
    }
    catch(error){
       console.log(error)
       res.json({sucess:false,message:error.message})
    }
}
export {addDoctor}
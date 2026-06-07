import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary"


// Change doctor availability
const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;

    const docData = await doctorModel.findById(docId);

    if (!docData) {
      return res.json({
        success: false,
        message: "Doctor not found"
      });
    }

    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available
    });

    res.json({
      success: true,
      message: "Availability changed"
    });

  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message
    });
  }
};
const uploadPrescription =
async (req,res)=>{

 try{

  const {
   appointmentId,
   notes
  } = req.body

  const file =
   req.file

  const result =
   await cloudinary.uploader.upload(

    file.path,

    {
      resource_type:"auto"
    }

   )

  await appointmentModel.findByIdAndUpdate(

   appointmentId,

   {

    prescription:
      result.secure_url,

    prescriptionNotes:
      notes,

    isCompleted:true

   }

  )

  res.json({

   success:true,

   message:
   "Prescription Uploaded"

  })

 }

 catch(error){

  console.log(error)

  res.json({

   success:false,

   message:error.message

  })

 }

}
// Get doctors for frontend
const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({})
      .select(['-password','-email']);

    console.log("Doctors from DB:", doctors);

    res.json({
      success: true,
      doctors
    });

  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message
    });
  }
};
const loginDoctor = async (req, res) => {

  try {

    const { email, password } = req.body;

    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {

      return res.json({
        success: false,
        message: "Doctor not found"
      });

    }

    const isMatch = await bcrypt.compare(
      password,
      doctor.password
    );

    if (!isMatch) {

      return res.json({
        success: false,
        message: "Invalid Credentials"
      });

    }

    const token = jwt.sign(
      { id: doctor._id },
      process.env.JWT_SECRET
    );

    res.json({
      success: true,
      token
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: error.message
    });

  }

};
const doctorDashboard = async (req, res) => {

  try {

    const docId = req.docId;

    const appointments =
      await appointmentModel.find({ docId });

    let earnings = 0;

    appointments.forEach((item) => {

      if (
        item.payment &&
        !item.cancelled
      ) {

        earnings += item.amount;

      }

    });

    const dashData = {

      appointments:
        appointments.length,

      patients:
        new Set(
          appointments.map(
            item => item.userId
          )
        ).size,

      earnings,

      latestAppointments:
        appointments.slice(-5).reverse()

    };

    res.json({
      success: true,
      dashData
    });

  } catch (error) {

    res.json({
      success: false,
      message: error.message
    });

  }

};
const doctorAppointments = async (req, res) => {

  try {

    const appointments =
      await appointmentModel.find({

        docId: req.docId

      });

    res.json({

      success: true,

      appointments

    });

  } catch (error) {

    res.json({

      success: false,

      message: error.message

    });

  }

};
const doctorProfile = async (req, res) => {

  try {

    const profileData =
      await doctorModel
        .findById(req.docId)
        .select("-password");

    res.json({

      success: true,

      profileData

    });

  } catch (error) {

    res.json({

      success: false,

      message: error.message

    });

  }

};
const updateDoctorProfile = async (req, res) => {

  try {

    const {
      fees,
      address,
      available,
      about
    } = req.body;

    await doctorModel.findByIdAndUpdate(

      req.docId,

      {
        fees,
        address,
        available,
        about
      }

    );

    res.json({

      success: true,

      message:
        "Profile Updated"

    });

  } catch (error) {

    res.json({

      success: false,

      message: error.message

    });

  }

};
const completeAppointment = async (req, res) => {

  try {

    const { appointmentId } =
      req.body;

    await appointmentModel.findByIdAndUpdate(

      appointmentId,

      {
        isCompleted: true
      }

    );

    res.json({

      success: true,

      message:
        "Appointment Completed"

    });

  } catch (error) {

    res.json({

      success: false,

      message: error.message

    });

  }

};

export { changeAvailability, doctorList,

  loginDoctor,

  doctorDashboard,

  doctorAppointments,

  doctorProfile,

  updateDoctorProfile,

  completeAppointment ,
uploadPrescription
 };
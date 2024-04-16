import connect from "@/lib/db";
import BookingForm from './booking'

export default function BookingPage(){
  const doctorDetails = ()=>{
    const [rows, fields] = connect.execute('SELECT doctors.name AS doc_name, doctors.specialization,hospital.name AS hospital_name, hospital.branch FROM doctors INNER JOIN hospital ON doctors.hospital_id = hospital.id') 
    return rows;
  }
  const serviceDetails = () => {
    const [rows, fields] = connect.execute('SELECT services.name AS s_name, hospital.name AS hospital_name, hospital.branch FROM services INNER JOIN hospital ON services.hospital_id = hospital.id')
    return rows;
  } 

  return (
    <BookingForm/> 
  );

}

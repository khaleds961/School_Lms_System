import "../components/AdminCard/AdminCard.css";
import API from "../api";
import React, { useEffect, useState } from "react";

export default function (props) {
  const [attendance, setAttendance] = useState([]);

  const getData = async (e) => {
    let reqBody = {
      SectionId: props.idSection,
      datee: props.created_at,
    };
    try {
     let res = await API.post(`viewattendaceStudent`, reqBody).then((res) => {
        const result = res.data;
        setAttendance(result);
    });
    } catch (error) {
      console.log("BIG Error : ", error);
    }
}
  console.log(attendance)

  useEffect(() => {
    getData();
  }, [props.created_at]);
if(props.studentsbyname){
  return (
    <>
      {props.studentsbyname.map((att) => (
        <tr>
          <td>
          
          </td>
          <td>{att.FName}</td>
          <td>{att.LName}</td>
          <td>{att.status}</td>
        </tr>
      ))}
    </>
  );

       }
      else{
        return (
          <>
            {attendance.map((att) => (
              <tr>
                <td>
                
                </td>
                <td>{att.FName}</td>
                <td>{att.LName}</td>
                <td>{att.status}</td>
              </tr>
            ))}
          </>
        );
      }
}



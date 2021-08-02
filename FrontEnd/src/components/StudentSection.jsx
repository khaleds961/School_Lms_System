import "../components/AdminCard/AdminCard.css";
import React, { useEffect, useState } from "react";

export default function (props) {
  const [status, setStatus] = useState("");


const test = () =>{
  props.handleClick(props.id, status);
  setStatus("")
}
  
  return (
    <>
    
      <tr>
      <td>
      </td>
      <td>{props.FName}</td>
      <td>{props.LName}</td>
      <td>
        <select id="outside" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Attendance</option>
          <option value="Present" >Present</option>
          <option value="Absent">Absent</option>
          <option value="Late">Late</option>
        </select>
      </td>
      <td>
      <button type="button" class="btn btn-outline-danger" onClick={() =>test()}>
        Done
      </button>
      </td>
    </tr>    
    </>
  );
}

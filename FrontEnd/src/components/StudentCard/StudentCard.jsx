import React from "react";
import { Link } from "react-router-dom";

export default function StudentCard(props) {
  return (
    <tr key={props.key}>
      <td>
        
      </td>

      <td>
        <img className="AdminPic" src={`http://localhost:8000/storage/images/${props.image}`}></img>
      </td>
      <td>{props.fname}</td>
      <td>{props.lname}</td>
     

      <td>{props.class_name}</td>
      <td>{props.section_name}</td>
     

      <td>

      <Link to={`/StudentProfile/${props.id}`} class="edit" data-toggle="modal">
      <i class='bx bx-show-alt' style={{'color':'#2897D6'}}></i>
      </Link>
      <Link to={`/EditStudent/${props.id}`} clasectionss="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></Link>
        <a
          href="#"
          class="delete"
          data-toggle="modal"
          onClick={() => props.delete(props.id)}
        >
          <i class="material-icons" data-toggle="tooltip" title="Delete">
            &#xE872;
          </i>
        </a>
      </td>
    </tr>
  );
}

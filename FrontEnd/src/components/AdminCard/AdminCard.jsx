import {Link} from 'react-router-dom'
import './AdminCard.css'
export default function (props) {
    return (
        <tr>
            <td>
                
            </td>

            <td><img className="AdminPic" src={`http://localhost:8000/storage/images/${props.image}`}></img></td>
            <td>{props.username}</td>
            <td>{props.email}</td>
            <td>{props.number}</td>
            <td>
                <Link to={`/editadmin/${props.id}`} clasectionss="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></Link>
                <a href="#" class="delete" data-toggle="modal" onClick={() => props.delete(props.id)} ><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
            </td>
        </tr>
    );
}
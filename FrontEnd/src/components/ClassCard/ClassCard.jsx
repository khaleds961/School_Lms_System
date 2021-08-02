import { Link } from 'react-router-dom'
import '../AdminCard/AdminCard.css'
import Sections_Class from '../Sections_Class'
export default function (props) {
    return (
        <tr>
            <td>
               
            </td>
            <td>{props.description}</td>
            <td><Sections_Class

                idClass={props.id}

            /></td>
            <td>
            <Link to={`/editclass/${props.id}`} clasectionss="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></Link>
                <a href="#" class="delete" data-toggle="modal" onClick={() => props.delete(props.id)} ><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
            </td>
        </tr>
    );
}
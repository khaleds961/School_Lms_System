import {Link} from 'react-router-dom'
import '../AdminCard/AdminCard.css'
export default function (props) {

    return (
        <tr>
            <td>
               
            </td>
            <td>{props.description}</td>
            <td>{props.class_Description}</td>
            <td>
                <Link href="#" class="delete" data-toggle="modal" onClick={() => props.delete(props.id)} ><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></Link>
            </td>
        </tr>
    );
}
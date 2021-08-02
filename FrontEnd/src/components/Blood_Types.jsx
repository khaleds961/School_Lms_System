import React from 'react';

export default function Blood_Types(props) {

    const bloodtype = ["A+", "B+", "AB+", "O+", "A-", "B-", "O-"]

    return (
        <select onChange={props.Sahar}>
            <option
                value={null}
            >
                Blood
            </option>

            {bloodtype.map(blood => (
                <option
                    value={blood}
                    selected={props.typeB === blood}
                >
                    {blood}
                </option>
            ))}

        </select>
    );
}
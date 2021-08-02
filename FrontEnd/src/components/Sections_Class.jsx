import API from "../api";
import React, { useEffect, useState } from "react";

export default function Sections_Class(props) {
  const [sections, setSections] = useState([]);

  const getData = async () => {
    await API.get(`sec-class/${props.idClass}`).then((res) => {
      const result = res.data;
      setSections(result);
    });
  };
  console.log(sections)

  useEffect(() => { 
    getData();
  }, [props.idClass]);

  return (
    <select id="outside" onChange={props.onChange} >
      <option value={null}>Section</option>
      {sections.map((section) => (
        <option
          selected={props.id === section.id}
          key={section.id}
          value={section.id}
        >
          {section.Description}
        </option>
      ))}
    </select>
  );
}

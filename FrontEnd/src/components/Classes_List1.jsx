import API from "../api";
import React, { useEffect, useState } from "react";

export default function Classes_List(props) {
  const [classes, setClasses] = useState([]);

  const getData = async () => {
    await API.get("getclass").then((res) => {
      const result = res.data;
      setClasses(result);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <select onChange={props.onChange} id="outside">
      <option value={null}>Classes</option>
      {classes.map((classe) => (
        <option
          selected={props.id === classe.id}
          key={classe.id}
          value={classe.id}
        >
          {classe.Description}
        </option>
      ))}
    </select>
  );
}

import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Classes_List(props) {
  const [classes, setClasses] = useState([]);

  const getData = () => {
    axios.get(`//localhost:8000/api/getclass`).then((res) => {
      let result = res.data;
      setClasses(result);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <select onChange={props.khaled}>
        <option value={props.classId}>{props.defaultClassName}</option>

        {classes.map(classs => (
          <option value={classs.id}>{classs.Description}</option>
        ))}
      </select>
    </div>
  );
  
}

import React, { useEffect, useState } from "react";
import API from "../../api";
import "./report.css";
import Classes_List from "../../components/Classes_List";
import Sections_Class from "../../components/Sections_Class";
import SideNav from "../../components/SideNav/SideNav";
import Chart from "./chart";

export default function Report(props) {
  const [classs, setclass] = useState("");
  const [section, setsection] = useState("");
  const [date, setDate] = useState("");

  const [data, Setdata] = useState([]);
  const getData = async (e) => {
    let reqBody = {
      SectionId: section,
      date: date,
    };
    try {
      let res = await API.post(`countbystatus`, reqBody).then((res) => {
        const result = res.data;
        Setdata(result);
      });
    } catch (error) {
      console.log("BIG Error : ", error);
    }
  };

  useEffect(() => {
    getData();
  }, [date]);


  return (
    <>
      <SideNav />

      <div
        className="container"
        style={{ marginTop: "50px", backgroundColor: "white" }}
      >
        <div class="table-title">
          <h2>
            <b>Attendance students</b>
          </h2>
        </div>
        <div>
          <Classes_List
            onChange={(e) => {
              setclass(e.target.value);
            }}
          />

          <Sections_Class
            idClass={classs}
            onChange={(e) => {
              setsection(e.target.value);
            }}
          />

          <label for="date" id="labeldate">
            Choose A Date:
          </label>
          <input
            type="date"
            name="date"
            class="dateview"
            onChange={(e) => {
              setDate(e.target.value);
            }}
          ></input>
        </div>

        <Chart data={data} />
      </div>
    </>
  );
}

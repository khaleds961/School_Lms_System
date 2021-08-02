import { useEffect,useState } from 'react';
import "./report.css"
import { PieChart, Bar, Pie, Sector, Cell, ResponsiveContainer, Tooltip, BarChart, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import Piechart from '../../components/piechart';
    export default function chart(props){


        if(props.data.length!=0){
    return(
    <>
            <h4>Student BarChart:</h4>
              <ResponsiveContainer width="95%" height={400}>
              <BarChart
                data={props.data}
                margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
                barSize={40}
              >
                <XAxis dataKey="name" 
                scale="point" 
                padding={{ left:40 , right: 5 }}
                dataKey="name"
                stroke="#000000" /> 
                <YAxis />
                <Tooltip/>
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar
                    dataKey="value"
                    fill="#ED5B5D"
                    stroke="#ED5B5D"
                    strokeWidth={1}
                />
              </BarChart>
              </ResponsiveContainer>

             
              </>
               );
    }else{
       return <div>
         <Piechart/>
       </div>

    }
    }

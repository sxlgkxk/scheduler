import './App.css';
// import logo from './logo.svg';
// import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React, { useState, useEffect } from "react";

function App() {
  let [rowData, setRowData] = useState([]);

  useEffect(() => {
    // 页面加载时，根据localStorage中的内容来填充表格
    let rowData = [];
    for (let i = 0; i < 24; i++) {
      rowData.push({
        key: i,
        num: i,
        input: localStorage.getItem(`input${i}`),
      });
    }
    setRowData(rowData);
  }, []);

  // 每当input框内容更改时，保存到localStorage中
  const handleChange = (e, key) => {
    let newRowData = rowData.map(item => {
      if (item.key === key) {
        item.input = e.target.value;
        localStorage.setItem(`input${item.key}`, item.input);
      }
      return item;
    });
    setRowData(newRowData);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App">
        <DatePicker />
        <table>
          <tbody>
            {rowData.map(item => {
              return (
                <tr key={item.key}>
                  <td>{item.num}</td>
                  <td>
                    <input
                      type="text"
                      value={item.input}
                      onChange={e => handleChange(e, item.key)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </LocalizationProvider>
  );
}

export default App;

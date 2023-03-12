import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React, { useState, useEffect, useCallback } from "react";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  let [rowData, setRowData] = useState([]);
  let [date, setDate] = useState(new Date());

  let getRowKey = useCallback((i) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-input${i}`;
  }, [date]);

  useEffect(() => {
    // 页面加载时，根据localStorage中的内容来填充表格
    let rowData = [];
    for (let i = 0; i < 24; i++) {
      rowData.push({
        key: i,
        input: localStorage.getItem(getRowKey(i)) || "",
      });
    }
    setRowData(rowData);
  }, [getRowKey]);

  // 每当input框内容更改时，保存到localStorage中
  const handleChange = (e, key) => {
    let newRowData = rowData.map(item => {
      if (item.key === key) {
        localStorage.setItem(getRowKey(key), e.target.value);
        return {
          ...item,
          input: e.target.value
        };
      }
      return item;
    });
    setRowData(newRowData);
  };

  return (

    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className="App">
          <DatePicker
            sx={{ width: '60%' }}
            value={date}
            format="yyyy / MM / dd"
            onChange={(newDate) => {
              setDate(newDate);
            }}
          />
          <table>
            <tbody>
            </tbody>
          </table>
          <Table sx={{ width: '100%' }} size="small">
            <TableBody>
              {rowData.map(item => {
                return (
                  <TableRow key={item.key}>
                    <TableCell sx={{ width: '20px' }}>{item.key}</TableCell>
                    <TableCell>
                      <TextField
                        // set width 100%
                        sx={{
                          width: '100%',
                          '& .MuiInput-underline:before': {
                            borderBottom: 'none',
                          },
                          '& .MuiInput-underline:after': {
                            borderBottom: 'none',
                          },
                          '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                            borderBottom: 'none',
                          },
                        }}
                        variant="standard"
                        type="text"
                        value={item.input}
                        onChange={(e) => handleChange(e, item.key)}
                      />

                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;

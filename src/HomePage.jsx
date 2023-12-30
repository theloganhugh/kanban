import React, { useState, useEffect } from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CardComponent from "./components/Card";
import axios from "axios";
import HeaderComponent from "./components/Header";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import ListIcon from "@mui/icons-material/List";
const PRIORITY_NAME = [
  { name: "No priority", id: 0 },
  { name: "Urgent", id: 4 },
  { name: "High", id: 3 },
  { name: "Medium", id: 2 },
  { name: "Low", id: 1 },
];
const STATUS = ["In progress", "Backlog", "Todo", "Canceled", "Done"];
function orderByTitle(a, b) {
  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }
  return 0;
}
function orderByPriority(a, b) {
    if (a.priority > b.priority) {
      return -1;
    }
    if (a.priority > b.priority) {
      return 1;
    }
    return 0;
  }
export default function HomePage() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [display, setDispaly] = useState([]);
  const [mode, setMode] = useState("status");
  const [order, setOrder] = useState('priority')
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOrder = (event) => {
    changeOrder(event.target.value)
    setOrder(event.target.value);
  };

  const handleChange = (event) => {
    displayHandler(event.target.value, tickets, users);
    setMode(event.target.value);
  };
  function changeOrder (ord){
    if(ord==='priority'){
        let disp = display;
        for(let d of disp){
            d.items= d.items.sort(orderByPriority)
        }
        setDispaly(disp)
    }
    if(ord==='title'){
        let disp = display;
        for(let d of disp){
            d.items= d.items.sort(orderByTitle)
        }
        setDispaly(disp)
    }

  }
  function displayHandler(mode, tick, usr) {
    let tickerData = tickets.length === 0 ? tick : tickets;
    let userData = users.length === 0 ? usr : users;
    if (mode === "status") {
      let result = [];
      for (let s of STATUS) {
        let items = [];
        for (let t of tickerData) {
          if (t.status === s) {
            items.push(t);
          }
        }
        let data = {
          name: s,
          items: items.sort(order==='priority' ? orderByPriority : orderByTitle),
          number: items.length,
        };
        result.push(data);
      }
      console.log(result);
      setDispaly(result);
    }
    if (mode === "priority") {
      let result = [];
      for (let s of PRIORITY_NAME) {
        let items = [];
        for (let t of tickerData) {
          if (t.priority === s.id) {
            items.push(t);
          }
        }
        let data = {
          name: s.name,
          items: items.sort(order==='priority' ? orderByPriority : orderByTitle),
          number: items.length,
        };
        result.push(data);
      }
      console.log(result);
      setDispaly(result);
    }
    if (mode === "users") {
      let result = [];
      for (let s of userData) {
        let items = [];
        for (let t of tickerData) {
          if (t.userId === s.id) {
            items.push(t);
          }
        }
        let data = {
          name: s.name,
          items: items.sort(order==='priority' ? orderByPriority : orderByTitle),
          number: items.length,
        };
        result.push(data);
      }
      console.log(result);
      setDispaly(result);
    }
  }
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );

      displayHandler(
        mode,
        res.data.tickets.sort((a, b) => a.title - b.title),
        res.data.users
      );
      setTickets(res.data.tickets.sort((a, b) => a.title - b.title));
      setUsers(res.data.users);
    }
    fetchData();
  }, []);
  return (
    <div className="home-parent">
      <header className="home-header">
        <Button
          id="basic-button"
          style={{ display: "flex", alignItems: "center" }}
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <ListIcon sx={{ mr: 1, mb: 0.25 }} />
          Display
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem sx={{ display: "flex" }} onClick={handleClose}>
            Grouping{" "}
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                value={mode}
                onChange={handleChange}
                size="small"
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem defaultChecked value={"status"}>
                  Status
                </MenuItem>
                <MenuItem defaultChecked value={"priority"}>
                  Priority
                </MenuItem>
                <MenuItem value={"users"}>Users</MenuItem>
              </Select>
            </FormControl>
          </MenuItem>
          <MenuItem sx={{ display: "flex" }} onClick={handleClose}>
            Ordering{" "}
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                value={order}
                onChange={handleOrder}
                size="small"
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem defaultChecked value={"priority"}>
                  Priority
                </MenuItem>
                <MenuItem  value={"title"}>
                  Title
                </MenuItem>
                
              </Select>
            </FormControl>
          </MenuItem>
        </Menu>
      </header>
      <div className="home-main">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container columns={{ xs: 1, sm: 2, md: 2 * display.length }}>
            {display.map((i) => (
              <Grid item xs={1} md={2}>
                <HeaderComponent
                  item={i.name}
                  mode={mode}
                  number={i.items.length}
                />

                {i.items.map((x) => (
                  <CardComponent
                    item={x}
                    user={users.find((u) => u.id === x.userId)}
                    mode={mode}
                  />
                ))}
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </div>
  );
}

import styles from "./styles.module.css";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import { deepOrange, deepPurple, grey } from "@mui/material/colors";
import Badge from "@mui/material/Badge";
import SignalCellular0BarIcon from "@mui/icons-material/SignalCellular0Bar";
import SignalCellular1BarIcon from "@mui/icons-material/SignalCellular1Bar";
import SignalCellular2BarIcon from "@mui/icons-material/SignalCellular2Bar";
import SignalCellular3BarIcon from "@mui/icons-material/SignalCellular3Bar";
import SignalCellular4BarIcon from "@mui/icons-material/SignalCellular4Bar";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DonutLargeOutlinedIcon from "@mui/icons-material/DonutLargeOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import PendingIcon from "@mui/icons-material/Pending";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddIcon from "@mui/icons-material/Add";

function HeaderComponent({ item, mode, number }) {
  return (
    <div className={styles.header}>
      <div className={styles.center}>
        {mode === "users" && (
          <Badge
            color={item.available ? "success" : "error"}
            sx={{ color: "#6C757D" ,mr:1 }}
            overlap="circular"
            badgeContent=" "
            variant="dot"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <Avatar
              sx={{
                bgcolor: deepOrange[500],
                width: "28px",
                height: "28px",
                fontSize: "12px",
              }}
            >
              {item.slice(0, 2)}
            </Avatar>
          </Badge>
        )}
        {mode === "status" && (
          <>
            {item === "Todo" && (
              <DonutLargeOutlinedIcon fontSize={"12px"} sx={{ mr: 0.5 }} />
            )}
            {item === "In progress" && (
              <AccessTimeFilledIcon fontSize={"12px"} sx={{ mr: 0.5 }} />
            )}
            {item === "Backlog" && (
              <PendingIcon fontSize={"12px"} sx={{ mr: 0.5 }} />
            )}
            {item === "Canceled" && (
              <CancelIcon fontSize={"12px"} sx={{ mr: 0.5 }} />
            )}
            {item === "Done" && (
              <CheckCircleIcon fontSize={"12px"} sx={{ mr: 0.5 }} />
            )}
          </>
        )}
        {mode === "priority" && (
          <>
            {item === "Urgent" && <SignalCellular4BarIcon sx={{ mr: 0.5 }} />}
            {item === "High" && <SignalCellular3BarIcon sx={{ mr: 0.5 }} />}
            {item === "Medium" && <SignalCellular2BarIcon sx={{ mr: 0.5 }} />}
            {item === "Low" && <SignalCellular1BarIcon   sx={{ mr: 0.5 }}/>}
            {item === "No priority" && <SignalCellular0BarIcon sx={{ mr: 0.5 }}  />}
          </>
        )}
        <span style={{marginBottom:'1.5px'}}>{item}</span>
        <span style={{marginLeft:'7px' , color:'#343A40' , fontWeight:'bold'}}>{number}</span>
      </div>
      <div>
        <AddIcon />
        <MoreHorizIcon />
      </div>
    </div>
  );
}


export default HeaderComponent
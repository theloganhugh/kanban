import styles from "./styles.module.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { deepOrange, deepPurple, grey } from "@mui/material/colors";
import Badge from "@mui/material/Badge";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
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

function CardComponent({ item, user, mode }) {
  return (
    <Card
      sx={{
        width: "90%",
        mx: 2,
        boxSizing: "border-box",
        padding: "0px",
        mb: 2,
      }}
    >
      {item && item.length !== 0 && user && user.length !== 0 && (
        <CardContent>
          <div className={styles.id_div}>
            <Typography
              sx={{ fontSize: 14, textAlign: "left" }}
              color="text.secondary"
              gutterBottom
            >
              {item.id}
            </Typography>
            {mode !== "users" && <Badge
              color={user.available ? "success" : "error"}
              sx={{ color: "#6C757D" }}
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
                {user.name.slice(0, 2)}
              </Avatar>
            </Badge>}
          </div>
          <Typography
            variant="div"
            sx={{
              fontSize: 14,
              textAlign: "left",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
            }}
            component="div"
          >
            {mode !== "status" && (
              <>
                {item.status === "Todo" && (
                  <DonutLargeOutlinedIcon fontSize={"12px"} sx={{ mr: 0.5 }} />
                )}
                {item.status === "In progress" && (
                  <AccessTimeFilledIcon fontSize={"12px"} sx={{ mr: 0.5 }} />
                )}
                {item.status === "Backlog" && (
                  <PendingIcon fontSize={"12px"} sx={{ mr: 0.5 }} />
                )}
                {item.status === "Canceled" && (
                  <CancelIcon fontSize={"12px"} sx={{ mr: 0.5 }} />
                )}
                {item.status === "Done" && (
                  <CheckCircleIcon fontSize={"12px"} sx={{ mr: 0.5 }} />
                )}
              </>
            )}
            {item.title.length > 40
              ? `${item.title.slice(0, 40)} ...`
              : item.title}
          </Typography>
          <div className={styles.tag}>

            { mode !== "priority" &&item.priority === 4 && <SignalCellular4BarIcon />}
            { mode !== "priority" &&item.priority === 3 && <SignalCellular3BarIcon />}
            { mode !== "priority" &&item.priority === 2 && <SignalCellular2BarIcon />}
            { mode !== "priority" &&item.priority === 1 && <SignalCellular1BarIcon />}
            { mode !== "priority" &&item.priority === 0 && <SignalCellular0BarIcon />}
            <Stack
              direction="row"
              spacing={1}
              sx={{
                ml: 1,
                mt: 1,
                alignItems: "center",
                display: "flex",
                height: "auto",
              }}
            >
              {item.tag.map((i) => (
                <Chip
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    height: "auto",
                    p: 0.5,
                    boxSizing: "border-box",
                  }}
                  label={i}
                />
              ))}
            </Stack>
          </div>
        </CardContent>
      )}
    </Card>
  );
}

export default CardComponent;

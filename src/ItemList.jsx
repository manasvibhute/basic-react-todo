import React from "react";
import {
  IconButton,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";

const StyledListItem = styled(ListItem)({
  padding: "12px 0",
  borderBottom: "1px solid #e0e0e0",
  "&:last-child": {
    borderBottom: "none",
  },
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const ItemList = ({ items, onDelete, onToggleComplete }) => {
  return (
    <>
      {items.map((item, index) => (
        <StyledListItem key={index}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Checkbox
              checked={item.completed}
              onChange={() => onToggleComplete(index)}
            />
            <ListItemText
              primary={item.text}
              style={{
                textDecoration: item.completed ? "line-through" : "none",
                color: item.completed ? "gray" : "inherit",
                marginLeft: "8px",
              }}
            />
          </div>
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => onDelete(index)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </StyledListItem>
      ))}
    </>
  );
};

export default ItemList;

import React, { useState, useEffect } from "react";
import { TextField, Button, List, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import ItemList from "./ItemList"; // Assuming ItemList.js is in the same directory

// Styled components for better customization
const StyledInput = styled(TextField)({
  "& .MuiInputBase-input": {
    padding: "10px 12px",
  },
  marginBottom: "20px",
  width: "100%",
});

const StyledButton = styled(Button)({
  marginLeft: "10px",
  padding: "10px 20px",
});

const StyledList = styled(List)({
  width: "100%",
});

const StyledPaper = styled(Paper)({
  padding: "20px",
  maxWidth: "500px",
  margin: "0 auto",
  borderRadius: "12px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
});

const App = () => {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);

  // Load items from local storage on component mount
  useEffect(() => {
    const savedItems = localStorage.getItem("myItems");
    if (savedItems) {
      try {
        setItems(JSON.parse(savedItems));
      } catch (error) {
        console.error("Error parsing saved items:", error);
        // Handle the error, e.g., clear the invalid data
        localStorage.removeItem("myItems");
      }
    }
  }, []);

  // Save items to local storage whenever the items state changes
  useEffect(() => {
    if (items.length > 0) {
      // Only save if there are items
      localStorage.setItem("myItems", JSON.stringify(items));
    }
  }, [items]);

  const handleAddItem = () => {
    if (newItem.trim() !== "") {
      const capitalizedNewItem =
        newItem.charAt(0).toUpperCase() + newItem.slice(1);
      setItems([...items, { text: capitalizedNewItem, completed: false }]);
      setNewItem("");
    }
  };

  const handleDeleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleToggleComplete = (index) => {
    const newItems = [...items];
    newItems[index].completed = !newItems[index].completed;
    setItems(newItems);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f0f0",
      }}
    >
      <StyledPaper>
        <h2>My Items</h2>
        <div style={{ display: "flex" }}>
          <StyledInput
            variant="outlined"
            placeholder="Enter item"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddItem();
              }
            }}
          />
          <StyledButton
            variant="contained"
            color="primary"
            onClick={handleAddItem}
          >
            Add Item
          </StyledButton>
        </div>
        <StyledList>
          <ItemList
            items={items}
            onDelete={handleDeleteItem}
            onToggleComplete={handleToggleComplete}
          />
        </StyledList>
      </StyledPaper>
    </div>
  );
};

export default App;

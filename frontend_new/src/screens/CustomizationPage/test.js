import React from "react";
import { Menu, MenuItem, IconButton, Paper, Box } from "@mui/material";

import Draggable from "react-draggable";
import { useState } from "react";

const DraggableMenu = () => {
  const [menuPosition, setMenuPosition] = React.useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 20, y:100 });
  const handleDrag = (_, { x, y }) => {
    setMenuPosition({ x, y });
  };

  return (
    <Draggable onDrag={handleDrag}>
      <Paper
        style={{
          position: "absolute",
          left: position.x,
          top: position.y,
        }}
      >
        <Box p={2}>
          {/* Menu content */}
          <p>Draggable Menu</p>
        </Box>
      </Paper>
    </Draggable>
  );
};

const Test = () => {
  return (
    <div style={{ marginTop: "200px" }}>
      {/* Other components */}
      <DraggableMenu />
    </div>
  );
};

export default Test;

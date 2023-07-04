import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "rgba(40, 30, 94, 0.932)",
    height : "8%",
  },
  logo: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 550,
    color: "#FFFEFE",
    textAlign: "left",
  },
}));

function Signpageheader() {
  const { header, logo } = useStyles();

  
  return (
    <header>
      <AppBar className={header}>
            <Toolbar>
                <Typography variant="h6" component="h1" className={logo}>
                    Your Mart
                </Typography>
            </Toolbar>
      </AppBar>
    </header>
  );
}

export default Signpageheader;
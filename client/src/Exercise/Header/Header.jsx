import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { headerButtons } from './headerButtons.js';

export default function Header() {

  return (
    <>
      <AppBar>
        <Toolbar>
          {headerButtons.map((headerButton, index) => (
            <Button sx={{ m: 2, textTransform: "none" }} color="inherit" key={index}>{headerButton.title}</Button>
          ))}
        </Toolbar>
      </AppBar>
      {/* <Toolbar /> */}
    </>
  );
}
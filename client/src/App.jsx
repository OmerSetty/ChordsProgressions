import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import React, { createContext } from 'react';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from "@mui/material/IconButton";
import { headerButtons, headerButtonsForAuthenticated, headerButtonsForUnauthenticated } from './Exercise/Header/headerButtons.js';
import MusicVideoIcon from '@mui/icons-material/MusicVideo';

import HotSongs from './HotSongs/HotSongs.jsx';
import MyPosts from './MyPosts/MyPosts.jsx';
import Favorites from './Favorites/Favorites.jsx';
import PostSong from './PostSong/PostSong.jsx';
import Progressions from './Progressions/Progressions.jsx';
import ExerciseLayout from './Exercise/ExerciseLayout.jsx';
import Protected from './Auth/Protected.jsx';
import Login from './Auth/Login.jsx';
import Register from './Auth/Register.jsx';
import Logout from './Auth/Logout.jsx';

import RoutesForAuthenticated from './RoutesForAuthenticated.jsx';
import RoutesForUnauthenticated from './RoutesForUnauthenticated.jsx';
import { useProvideAuth } from './customHooks/useProvideAuth.jsx';
import { theme } from './ThemeProviderConfig.ts';
import { ThemeProvider } from '@mui/material/styles';

export const authContext = createContext();

function App() {
  const auth = useProvideAuth();
  const totalButtons = [...headerButtons];
  if (!auth.loading) totalButtons.push(...(auth.user ? headerButtonsForAuthenticated : headerButtonsForUnauthenticated));
  return (
    <authContext.Provider value={auth}>
      <div>
        <ThemeProvider theme={theme}>
          <Grid container direction="column">
            <BrowserRouter>
              <Grid item xs={12}>
                <AppBar>
                  <Toolbar>
                    <IconButton component={Link} to={'/'}>
                      <MusicVideoIcon sx={{ fontSize: {xs: 'h4.fontSize', sm: 'h3.fontSize'}, color: 'primary.white' }}></MusicVideoIcon>
                    </IconButton>
                    {totalButtons.map((headerButton, index) => (
                      <Button component={Link} to={`/${headerButton.path}`} key={index}
                      sx={{ m: { xs: 0, md: 2 }, p: { xs: '2px', sm: '6px 8px'}, fontSize: { xs: '11px', sm: '14px' }, textTransform: "none", color: 'primary.white' }}>{headerButton.title}</Button>
                    ))}
                  </Toolbar>
                </AppBar>
                <Toolbar/>
              </Grid>
              <Routes>
                <Route path="/" element={<ExerciseLayout/>} />
                <Route path="/Exercise" element={<ExerciseLayout/>} />
                <Route path="/HotSongs" element={<HotSongs/>} />
                <Route path="/MyPosts" element={<MyPosts/>} />
                <Route path="/Favorites" element={<Favorites/>} />
                <Route path="/PostSong" element={<PostSong/>} />
                <Route path="/Progressions" element={<Progressions/>} />
                <Route element={<RoutesForAuthenticated/>}>
                  <Route path="/Protected" element={<Protected/>} />
                  <Route path="/Logout" element={<Logout/>} />
                </Route>
                <Route element={<RoutesForUnauthenticated/>}>
                  <Route path="/Login" element={<Login/>} />
                  <Route path="/Register" element={<Register/>} />
                </Route>
              </Routes>
            </BrowserRouter>
          </Grid>  
        </ThemeProvider>
      </div>
    </authContext.Provider>
    
  )
}

export default App;
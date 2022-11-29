import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import TabContent from '../Tab/TabContent.jsx';
import SliderConfiguration from './SliderConfiguration.jsx';
import SelectionConfiguration from './SelectionConfiguration.jsx';
import useLocalStorage from '../LocalStorage/useLocalStorage.jsx';

const useStyles = makeStyles((theme) => ({
  tab: {
    textTransform: "none",
    '&.Mui-selected': {
      color: 'primary',
      fontSize: '1rem',
    }
  },
  tabsContainer: {
    backgroundColor: '#efefef',
    borderRadius: '20px',
    marginTop: '20px',
  }
}));

export default React.memo(function Settings() {
  const classes = useStyles();

  const tabs = ['Bars', 'Degrees', 'Tempo', 'Keys'];

  const [currentTab, setCurrentTab] = useLocalStorage('currentSettingsTab', 0);

  return (
    <Box className={classes.tabsContainer} sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs TabIndicatorProps={{style: {backgroundColor: "#efefef"}}} value={currentTab} onChange={(_, newTab) => setCurrentTab(newTab)} aria-label="basic tabs example" centered>
          {tabs.map((tab, index) => (
            <Tab sx={{ textTransform: 'none' }} key={index} className={classes.tab} label={tab} id={`simple-tab-${index}`} aria-controls={`simple-tabpanel-${index}`}/>
          ))}
        </Tabs>
      </Box>
      
      <TabContent value={currentTab} index={0}>
        <SliderConfiguration settingsKey='bars'/>
      </TabContent>

      <TabContent value={currentTab} index={1}>
        <SelectionConfiguration settingsKey='degrees'/>
      </TabContent>

      <TabContent value={currentTab} index={2}>
        <SliderConfiguration settingsKey='tempo'/>
      </TabContent>

      <TabContent value={currentTab} index={3}>
        <SelectionConfiguration settingsKey='keys'/>
      </TabContent>
      
    </Box>
  );
});
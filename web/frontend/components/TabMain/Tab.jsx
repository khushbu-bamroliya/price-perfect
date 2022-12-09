import { Card, Tabs } from '@shopify/polaris'
import { useState, useCallback } from 'react';
import Faq from '../Faq';
import Dashboard from './Dashboard';
import Analytics from './Slider';



const Tab = () => {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  );

  const tabs = [
    {
      id: 'Dashboard',
      content: 'Dashboard'
    },
    {
      id: 'Slider',
      content: 'Slider',
    },
    {
      id: 'Faq',
      content: 'Faq',
    },
  ];
 
  return (
    <>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} fitted>
        <Card.Section>
          {selected === 0 && <Dashboard/>}
        {/* <Analytics/> */}
          {selected === 1 &&  ( <Analytics/>)}
          {selected === 2 && ( <Faq />)}
        </Card.Section>
      </Tabs>
    </>
  )
}

export default Tab
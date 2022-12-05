import { Card, Tabs } from '@shopify/polaris'
import { useState, useCallback } from 'react';
// import Analytics from './Slider';



const displayMainTab = () => {
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
  ];

  return (
    <>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} fitted>
        <Card.Section>
          {selected === 0 && "Hello0"}
        {/* <Analytics/> */}
          {selected === 1 &&  ( <Analytics/>)}
        </Card.Section>
      </Tabs>
    </>
  )
}

export default displayMainTab;
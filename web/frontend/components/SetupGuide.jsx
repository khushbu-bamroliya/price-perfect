import { Button, ButtonGroup, Card, Tabs, TextContainer } from '@shopify/polaris';
import React, { useCallback, useState } from 'react';
import '../components/Styles/style.css';
import AddTheme from './SetupGuide/AddTheme';

const SetupGuide = () => {
    const [selected, setSelected] = useState(0);

    const handleTabChange = useCallback(
        (selectedTabIndex) => setSelected(selectedTabIndex),
        [],
    );

    const tabs = [
        {
            id: 'ADD THEME',
            content: 'ADD THEME'
        },
        {
            id: 'CREATE TEST',
            content: 'CREATE TEST',
        },
        {
            id: 'SELECT PRICES',
            content: 'SELECT PRICES',
        },
        {
            id: 'ACTIVATE PRODUCTS',
            content: 'ACTIVATE PRODUCTS',
        },
        {
            id: 'COMPLETE',
            content: 'COMPLETE',
        },
    ];
    return (
        <>
            <TextContainer>
                <b>Setup Guide</b>
                <p>To complete your integration please go through the steps below and complete each one. Select Mark Complete when you are finished with each step. </p>
                <p> <b>NOTE:</b> If your store is headless, please contact us at apc@xyz.io for information on how to integrate. </p>
            </TextContainer>
            <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} fitted>
                <Card.Section>
                    {selected === 0 && <AddTheme />}
                    {/* <Analytics/> */}
                </Card.Section>
            </Tabs>
            <div id='markBtn'>
                <div>
                    <Button plain>Skip</Button>
                </div>
                <Button primary>Mark Complete</Button>

            </div>

        </>
    )
}

export default SetupGuide
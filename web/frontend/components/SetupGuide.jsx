import { Button, ButtonGroup, Card, Tabs, TextContainer, Badge, Icon, VisuallyHidden } from '@shopify/polaris';
import React, { useCallback, useState } from 'react';
import '../Styles/style.css';
import AddTheme from './SetupGuide/AddTheme';
import {
    CircleTickMajor
} from '@shopify/polaris-icons';

const SetupGuide = () => {
    const [selected, setSelected] = useState(0);

    const handleTabChange = useCallback(
        (selectedTabIndex) => {
            console.log("Tab index", selectedTabIndex)
            setSelected(selectedTabIndex);
        },
        [],
    );
    const changeTabWithIndexes = () => {
        setSelected(selected + 1);
        return (<>Hello world from changeTabWithIndexes</>)
    }
    const tabs = [
        {
            id: 'ADD-THEME',
            content: (<><Icon source={CircleTickMajor} color="success" /> <p>ADD THEME</p> </>)
        },
        {
            id: 'CREATE-TEST',
            content: (<><Badge className="tabBadge">2</Badge> <p>CREATE TEST</p></>),
            // content: changeTabWithIndexes
        },
        {
            id: 'SELECT-PRICES',
            content: (<><Badge>3</Badge> <p>SELECT PRICES</p></>),
        },
        {
            id: 'ACTIVATE-PRODUCTS',
            content: (<><Badge>4</Badge> <p>ACTIVATE PRODUCTS</p></>),
        },
        {
            id: 'COMPLETE',
            content: (<><Badge>5</Badge> <p>COMPLETE</p></>),
        },
    ];

    return (
        <>

            <TextContainer>


                <b>Setup Guide</b>

                <p>To complete your integration please go through the steps below and complete each one. Select Mark Complete when you are finished with each step. </p>
                <p> <b>NOTE:</b> If your store is headless, please contact us at  for information on how to integrate. </p>
            </TextContainer>
            <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} fitted>
                <Card.Section>
                    {selected === 0 && <AddTheme />}
                    {selected === 1 && "Hello1111"}
                    {selected === 2 && "Hello2222"}
                    {selected === 3 && "Hello3333"}
                    {selected === 4 && "Hello4444"}
                    {/* <Analytics/> */}
                </Card.Section>
            </Tabs>
            <div id='markBtn'>

                <div className={selected === tabs.length - 1 ? "Polaris-VisuallyHidden":""}>
                    <Button plain onClick={changeTabWithIndexes}>Skip</Button>
                </div>
                <Button
                    primary
                    onClick={changeTabWithIndexes}
                    disabled={selected === tabs.length - 1 && true}
                >
                    {selected === tabs.length - 1 ? "Complete" : "Next"}
                </Button>

            </div>
        </>
    )
}

export default SetupGuide
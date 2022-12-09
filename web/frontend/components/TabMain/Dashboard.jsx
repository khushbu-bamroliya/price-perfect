import { ResourcePicker } from '@shopify/app-bridge-react';
import { Badge, Button, Card, DataTable, Heading, Tag } from '@shopify/polaris'
import React from 'react'
import { useState } from 'react';

const Dashboard = () => {
    const [activateResourcePicker, setActivateResourcePicker] = useState(false);
    const [productsSelected, setProductsSelected] = useState();
    const rows = [
        ['Emerald Silk Gown', '23 Feb 2022', "24 Feb 2022", <Badge status='success'>Active</Badge>, '100%', "...",],
        ['Emerald Silk Gown', '23 Feb 2022', "24 Feb 2022", <Badge status='success'>Active</Badge>, '100%', "...",],
        ['Emerald Silk Gown', '23 March 2022', "24 Feb 2022", <Badge status='critical'>Inactive</Badge>, '100%', "...",],
        ['Emerald Silk Gown', '23 Feb 2022', "24 Feb 2022", <Badge status='success'>Active</Badge>, '100%', "...",],
        ['Emerald Silk Gown', '23 Feb 2022', "24 Feb 2022", <Badge status='success'>Active</Badge>, '100%', "...",],

    ];

    const selectProducts = (products) => {
        console.log("products are", products);
        setActivateResourcePicker(false)
        setProductsSelected(products.selection)
    }

    return (
        <>


            {rows.length ? <Card>
                <DataTable
                    columnContentTypes={[
                        'text',
                        'text',
                        'text',
                        'text',
                        'text',
                        'numeric',
                    ]}
                    headings={[
                        'Experiment Name',
                        'Start',
                        'End',
                        'Status',
                        'Progress',
                        '',
                    ]}
                    rows={rows}
                />
            </Card>
                : (
                    <div className="createTestBtn">
                        <Heading>No Experiments Created</Heading>
                    </div>
                )}



            <div className="createTestBtn">
                <Button onClick={() => setActivateResourcePicker(true)} primary >Create New Test</Button>
            </div>

            <ResourcePicker
                resourceType='Product'
                open={(activateResourcePicker)}
                onCancel={() => setActivateResourcePicker(false)}
                onSelection={(products) => selectProducts(products)}
            />
        </>
    )
}

export default Dashboard
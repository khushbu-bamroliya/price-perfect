import { Card, Layout, Page } from '@shopify/polaris'
import React from 'react'
import Faq from '../components/Faq'

const Support = () => {
  return (
    <Page fullWidth>
    <Layout>
        <Layout.Section>
        {/* <Card sectioned> */}
            <Faq/>
        {/* </Card> */}
        </Layout.Section>
    </Layout>
    </Page>
  )
}

export default Support
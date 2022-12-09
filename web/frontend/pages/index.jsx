import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Heading,
  Banner,

} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

import { trophyImage } from "../assets";

import { ProductsCard } from "../components";
import Tab from "../components/TabMain/Tab";
import SetupGuide from "../components/SetupGuide";
import Faq from "../components/Faq";

export default function HomePage() {
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <Banner
            title="Your app is currently inactive"
            // status="success"
            status="warning"
            action={{ content: 'Disable' }}
          />
        </Layout.Section>
        <Layout.Section>
          <Card sectioned>
            <SetupGuide />
          </Card>
          <Card sectioned>
            <Tab />
          </Card>
          {/* <Card sectioned>
            <Faq />
          </Card> */}
        </Layout.Section>
      </Layout>
    </Page>
  );
}

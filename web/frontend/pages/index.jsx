import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Heading,

} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

import { trophyImage } from "../assets";

import { ProductsCard } from "../components";
import displayMainTab from "../components/TabMain/displayMainTab";
import SetupGuide from "../components/SetupGuide";

export default function HomePage() {
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <SetupGuide/>
          </Card>
          {/* <Card sectioned>
            <displayMainTab/>
          </Card> */}
        </Layout.Section>
      </Layout>
    </Page>
  );
}

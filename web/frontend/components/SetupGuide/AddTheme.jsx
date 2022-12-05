import { Icon, TextContainer } from '@shopify/polaris'
import React from 'react'
import {
  ClipboardMinor
} from '@shopify/polaris-icons';

const AddTheme = () => {
  return (
    <>
      <TextContainer>

        <b>Manually Add Script</b>
        <p className='scriptDescription'>Add this script inside the head tag of your store’s theme.liquid file <br />
          &lt;script src="https://cdn..io/e8ff637a25fd.js"&gt;&lt;/script&gt;
  

          <Icon
          source={ClipboardMinor}
          color="base"
        />

        </p>
        
      </TextContainer>
    </>
  )
}

export default AddTheme
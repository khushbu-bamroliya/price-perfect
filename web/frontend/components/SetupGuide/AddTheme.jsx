import { Button, Icon, TextContainer, Tooltip } from '@shopify/polaris'
import React, { useState } from 'react'
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  ClipboardMinor
} from '@shopify/polaris-icons';
import { useEffect } from 'react';

const AddTheme = () => {
  const [text, setText] = useState("Rishi865");
  const [isCopied, setIsCopied] = useState(false);

  const onCopyText = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 5000);
  };
  function script() {

    var script = document.getElementById("scriptDescription").innerHTML;
    let result = script.replace(/&lt;/gi, "<")
    let result2 = result.replace(/&gt;/gi, ">");

    setText(result2)
    console.log(result2);
  }
  useEffect(() => {
    script();
  }, [])

  return (
    <>
      <TextContainer>

        <b>Manually Add Script</b>
        <p >Add this script inside the head tag of your store’s theme.liquid file.
        </p>

        <div className='scriptCopy'>

          <pre id='scriptDescription'>&lt;script src="https://cdn...io/e8ff637a25fd.js"&gt;&lt;/script&gt;

          </pre>
          <div className=''>

            <CopyToClipboard text={text} onCopy={onCopyText}>
              <div className="copy-area tooltip" id='copy-area' >
                <Tooltip  content={isCopied === true ? "Copied" : "Copy"}>
                <Icon
                  source={ClipboardMinor}
                  color="base"
                />
                  {/* <p>
                  
                <span className="tooltiptext">{isCopied === true ? "Copied" : "Copy"}</span>
                  </p> */}
                </Tooltip>
              </div>
            </CopyToClipboard>
          </div>
        </div>
      
      </TextContainer>
    </>
  )
}

export default AddTheme
import React, { useState } from 'react'
import Slider from 'rc-slider';
import Circle from 'react-circle';
import '../../assets/index.less';
import {
    CirclePlusMajor
} from '@shopify/polaris-icons';
import { Button, Icon, Tag } from '@shopify/polaris';
import { useEffect } from 'react';
import { useCallback } from 'react';

const Analytics = () => {

    const [rangeValue, setRangeValue] = useState([20, 30, 40])

    function log(value) {
        setRangeValue(value)
        console.log(value);
    }

    let updatedArray;
    let newArray = [];

    const addNewRange = () => {
        const pushLastIndex = rangeValue[rangeValue.length - 1]
        updatedArray = rangeValue.push(pushLastIndex + 10)

        console.log("updatedArray value", updatedArray);
        setRangeValue(rangeValue)
        log(rangeValue)
        for (let index = 0; index < rangeValue.length; index++) {
            newArray.push(rangeValue[index])
        }
        console.log("new Array data", newArray);
        setRangeValue(newArray)


    }
    function getRandomItem(arr) {

        // get random index value
        const randomIndex = Math.floor(Math.random() * arr.length);

        // get random item
        const item = arr[randomIndex];

        return item;
    }
    const result = getRandomItem(rangeValue);

    return (
        <>
            <div>
                {rangeValue.map((i) => (<>
                    <Circle
                        key={i}
                        progress={i} progressColor=""
                    />
                </>))}
                <Button disabled={rangeValue.length === 10 ? true : false} onClick={() => addNewRange()} >

                    <Icon source={CirclePlusMajor} color="base" />
                </Button>
                <Slider range min={0} max={100} onChange={log} defaultValue={[20, 25, 30, 40]} value={rangeValue} allowCross={false} />

            </div>
        </>
    )
}

export default Analytics
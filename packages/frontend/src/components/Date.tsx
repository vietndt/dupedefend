import { useEffect, useState } from 'react';
import { Skeleton } from '@mui/material';

import moment from 'moment';
import { ethers } from 'ethers';

const Date = (props: {
  blockNumber: number
}) => {
  const [date, setDate] = useState<number>();

  useEffect(() => {
    if (props.blockNumber) {
      const getDate = async () => {
        const provider = new ethers.providers.JsonRpcProvider(`https://polygon-mumbai.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_ID}`);
        const block = await provider.getBlock(props.blockNumber);
        setDate(block.timestamp * 1000)
      }
      getDate();
    }
  }, [props.blockNumber]);
  return (
    <>
      {!date ? <Skeleton variant="rectangular" width={120} height={20} /> : <>{moment(date).format('DD-MM-yyyy, HH:mm')}</>}
    </>
  )
}
export default Date;

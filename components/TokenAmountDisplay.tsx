import _ from 'lodash';
import numeral from 'numeral'

import {
  Box
} from '@chakra-ui/react'

export default function TokenUsdAmount(props) {
  const symbol = props.symbol || '';
  const amountUsd = props.amountUsd || 0;
  const amountTokens = props.amountTokens || 0;

	return (
    <Box>
      {
        !_.isUndefined(props.amountUsd) && (
          <Box fontSize="sm" fontWeight="medium">
            {`${numeral(amountUsd).format('$0,00')}`}
          </Box>
        )
      }
      {
        !_.isUndefined(props.amountTokens) && (
          <Box fontSize="sm" fontWeight={_.isUndefined(props.amountUsd) ? "medium" : "light"}>
            {`${numeral(amountTokens).format('0,00.0a')} ${symbol}`}
          </Box>
        )
      }
    </Box>
  )
}
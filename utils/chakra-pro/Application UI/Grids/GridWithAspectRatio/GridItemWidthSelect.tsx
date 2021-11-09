import { FormControl, FormLabel, Select, SelectProps } from '@chakra-ui/react'
import * as React from 'react'

export const GridItemWidthSelect = (props: SelectProps) => (
  <FormControl>
    <FormLabel>Min Width</FormLabel>
    <Select {...props}>
      <option value="240">240px</option>
      <option value="320">320px</option>
      <option value="400">400px</option>
    </Select>
  </FormControl>
)

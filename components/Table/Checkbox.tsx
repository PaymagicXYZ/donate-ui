import { forwardRef, useRef, useEffect } from "react";
import { Checkbox } from "@chakra-ui/react";

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <Checkbox ref={resolvedRef} {...rest} />
    </>
  );
});

IndeterminateCheckbox.displayName = "IndeterminateCheckbox";
export default IndeterminateCheckbox;

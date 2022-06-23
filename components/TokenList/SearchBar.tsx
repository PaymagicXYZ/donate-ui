import { useState, useMemo } from "react";
import { Input } from "@chakra-ui/react";
import { debounce } from "lodash";

const DEBOUNCE_TIME = 300;

const SearchBar = ({
  setSearchTerm,
}: {
  setSearchTerm: (term: string) => void;
}) => {
  const [term, setTerm] = useState("");

  const handleChange = (e) => {
    setTerm(e.target.value);
    debouncedUpdateTerm(e.target.value);
  };

  const debouncedUpdateTerm = useMemo(
    () => debounce(setSearchTerm, DEBOUNCE_TIME),
    []
  );

  return (
    <Input
      border="0"
      h="input"
      marginTop="24px"
      color="input.placeholder"
      _placeholder={{
        color: "input.placeholder",
      }}
      opacity={0.3}
      _focus={{
        opacity: 1,
      }}
      bg="modal.input"
      value={term}
      onChange={handleChange}
      placeholder="Search name or paste address"
    />
  );
};

export default SearchBar;

import { useState } from "react";

const useToggle = () => {
    const [toggle, setToggle] = useState(false);

    const toggleOff = () => setToggle(false);

    const toggleOn = () => setToggle(true);

    return [toggle, toggleOff, toggleOn]
};

export default useToggle;
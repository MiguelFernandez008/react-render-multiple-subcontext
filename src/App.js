import "./styles.css";
import React, { useContext, useMemo, useState } from "react";

const OuterContext = React.createContext({});

const InnerContext = React.createContext({});

export default function App() {
  console.log("render app");
  return (
    <div className="App">
      <Provider>
        <OuterComponent />
        <InnerComponent />
      </Provider>
    </div>
  );
}

const Provider = ({ children }) => {
  const [outer, setOuter] = useState(1);
  const [inner, setInner] = useState(2);
  const outerValue = useMemo(() => ({ outer, setOuter }), [outer]);
  const innerValue = useMemo(() => ({ inner, setInner }), [inner]);

  return (
    <OuterContext.Provider value={outerValue}>
      <InnerContext.Provider value={innerValue}>
        {children}
      </InnerContext.Provider>
    </OuterContext.Provider>
  );
};

const OuterComponent = () => {
  const { outer, setOuter } = useContext(OuterContext);
  console.log("render outer");
  return (
    <button onClick={() => setOuter(outer * 2)}>
      Outer component: {outer}
    </button>
  );
};

const InnerComponent = () => {
  const { inner, setInner } = useContext(InnerContext);
  console.log("render inner");
  return (
    <button onClick={() => setInner(inner * 2)}>
      Inner component: {inner}
    </button>
  );
};

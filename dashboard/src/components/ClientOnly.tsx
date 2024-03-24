import React from 'react';

const ClientOnly = ({ children }) => {
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted ? children : null;
};

export default ClientOnly;

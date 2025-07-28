import React from 'react';

interface RootProps {
  children: React.ReactNode;
}

export default function Root({ children }: RootProps): React.ReactElement {
  return <>{children}</>;
} 

'use client';

import dynamic from 'next/dynamic';

const MigrationCard = dynamic(
  () => import('./migration-card').then((mod) => mod.MigrationCard),
  {
    loading: () => <p>Loading migration tools...</p>,
    ssr: false,
  }
);

export function MigrationCardWrapper() {
    return <MigrationCard />;
}

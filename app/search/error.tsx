'use client';

// Error boundaries don't work yet in development...
export default function SearchError({ error }:{
  error: Error
}) {
  console.error(error);

  return (
    <div className="p-20 rounded bg-rose-200 text-2xl">
      <p className="text-center">Uh uh, there was an error!</p>
    </div>
  );
} 
import Link from 'next/link';

export default function Home() {
  const modelsPage = [
    'crownCorkPage',
    'screenPage',
  ];

  return (
    <div className="h-screen w-screen bg-background text-foreground flex flex-wrap justify-start items-start gap-4 p-4">
      {modelsPage.map((model) => (
        <Link 
          key={model} 
          href={`/${model}`} 
          className="flex items-center justify-center h-12 p-4 border rounded"
        >
          {model}
        </Link>
      ))}
    </div>
  );
}
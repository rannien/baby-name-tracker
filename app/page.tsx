import BabyNameSelector from '@/components/baby-name-selector';

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-10 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col">
        <BabyNameSelector />
      </main>
    </div>
  );
}

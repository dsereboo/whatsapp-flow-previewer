import { TestSuitePage } from "@/components/testing-suite/test-suite-page";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <main className="flex min-h-screen w-full max-w-5xl flex-col items-center justify-between py-14 px-8 bg-white dark:bg-black sm:items-start">
        <TestSuitePage />
      </main>
    </div>
  );
}

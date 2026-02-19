import { FlowJsonEditor } from "./editor";
import { Preview } from "./previewer";
import { TestingSuiteLayout } from "./test-layout";

export const TestSuitePage = () => {
  return (
    <TestingSuiteLayout className="border border-gray-300 rounded-md p-1">
      <div className="flex flex-row  h-[90vh]">
        <article className="flex-1 flex flex-col justify-between">
          <header className="p-4 border-b">
            <p className="font-semibold text-lg">Flow JSON</p>
          </header>
          <FlowJsonEditor />
        </article>

        <article className="flex flex-1  w-full">
          <Preview />
        </article>
      </div>
    </TestingSuiteLayout>
  );
};

import { RenderComponent } from "./flow-component.";
import { FlowScreen } from "./lib/flow";

export function RenderScreen({ screen }: { screen: FlowScreen }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col flex-1 space-y-4  overflow-y-auto">
        {screen.layout.children.map((component, i) => (
          <RenderComponent key={i} component={component} />
        ))}
      </div>
    </div>
  );
}
import { RenderComponent } from "./flow-component.";
import { FlowScreen } from "./lib/flow";

interface Props {
  screen: FlowScreen;
}

export function RenderScreen(props: Props) {
  const { screen } = props;

  return (
    <div className={`flex flex-col h-full relative`}>
      <div className="flex flex-col flex-1 justify-between mt-6 h-full overflow-y-auto">
        {screen.layout.children.map((component, i) => (
          <RenderComponent key={i} component={component} />
        ))}
      </div>
    </div>
  );
}

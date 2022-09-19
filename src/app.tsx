/* @refresh reload */
import { render } from 'solid-js/web';
import { StyletronProvider } from './providers/StyletronProvider';
import { Client } from 'styletron-engine-atomic';
import { useStyletron } from './hooks/useStyletron';

const client = new Client({ prefix: '_' });

function App() {
  return <OtherTestingComponent />;
}

render(() => {
  return (
    <StyletronProvider client={client} theme={{ color: '#444' } as never}>
      <App />
    </StyletronProvider>
  );
}, document.getElementById('app') as HTMLElement);

export function OtherTestingComponent() {
  const [css, $theme] = useStyletron();

  return (
    <div
      class={css({
        color: ($theme as object as { color: string }).color,
      })}
    >
      <p class={css({ textAlign: 'center' })}>Something</p>
      Some text content
    </div>
  );
}

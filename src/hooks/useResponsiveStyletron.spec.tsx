import { useResponsiveStyletron } from './useResponsiveStyletron';
import { StyletronProvider } from '../providers/StyletronProvider';
import { Server } from 'styletron-engine-atomic';
import { cleanup, render } from 'solid-testing-library';

describe('useResponsiveStyletron', () => {
  afterEach(() => cleanup());

  it('should render the stuff', async () => {
    const client = new Server();

    const Component = () => {
      const [css] = useResponsiveStyletron();

      return (
        <div
          class={css({
            margin: ['12px'],
            padding: '12px',
          })}
        />
      );
    };

    const App = () => {
      return (
        <StyletronProvider
          client={client}
          theme={{
            mediaQuery: { sm: '@media screen and (max-width: 1200px)' },
          }}
        >
          <Component />
        </StyletronProvider>
      );
    };

    const ele = await render(() => (
      <div>
        <App />
        {client.getStylesheets().map((res) => {
          return <style media={res.attrs.media}>{res.css}</style>;
        })}
      </div>
    ));

    expect(ele.container).toMatchSnapshot();
  });
});

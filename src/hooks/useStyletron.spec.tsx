import { render } from 'solid-testing-library';
import { StyletronProvider } from '../providers/StyletronProvider';
import { Server } from 'styletron-engine-atomic';
import { useStyletron } from './useStyletron';

describe('useStyletron', () => {
  it('should ', function () {
    const Dl = () => {
      const [css] = useStyletron();

      return (
        <div>
          <div
            class={css([
              { 'marginLeft': '12px', ':hover': { top: '12px' } },
              { 'marginRight': '12px', ':hover': { padding: '12px' } },
            ])}
          />
          <div class={css({ padding: '12px' })}></div>
        </div>
      );
    };

    const client = new Server();

    const ele = render(() => (
      <StyletronProvider client={client} theme={{}}>
        <Dl />
        {client.getStylesheets().map((style) => {
          return <style innerHTML={style.css} />;
        })}
      </StyletronProvider>
    ));

    expect(ele.container).toMatchSnapshot();
  });
});

import { usePlay } from '@/contexts/play';
import FlowersSVG from '@/svg/flowers.svg';
import classNames from 'classnames';
import { usePreloaderReadyState } from '@/atoms/preloader-ready';
import { useDebounce } from '@/hooks/use-debounce';

type Props = {
    text?: string;
    names?: string;
    pair: boolean;
    pron?: string;
};

const HelloHtml = ({ text, names, pair, pron }: Props) => {
    const { play, setPlay } = usePlay();
    const [preloaderReady] = usePreloaderReadyState();
    const debouncedPreloaderReady = useDebounce(preloaderReady, 200);
    return (
        <div
            className={classNames('hello-layout', {
                'hello-layout--out': play,
                'hello-layout--in': debouncedPreloaderReady,
            })}
        >
            <div className="hello-layout__inner">
                <div className="hello-layout__top hello-item">
                    <div>4 августа</div>
                    <div>Красноярск, Дрокино парк</div>
                </div>
                <div className="hello-layout__content hello-item">
                    {names !== '' && (
                        <div className="hello-hello">
                            {pair ? 'Дорогие' : pron} {names}!
                        </div>
                    )}
                    <div className="hello-layout__message">
                        {text && (
                            <div className="hello-layout__personal" dangerouslySetInnerHTML={{ __html: text }}></div>
                        )}
                        <div className="hello-layout__sign">
                            С наилучшими пожеланиями,
                            <br />
                            Роман и Кристина
                        </div>
                        <button
                            className="button discover-button"
                            onClick={() => {
                                setPlay(true);
                            }}
                        >
                            <div className="button__inner">Discover</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelloHtml;

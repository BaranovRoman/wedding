import { usePlay } from '@/contexts/play';
import FlowersSVG from '@/svg/flowers.svg';
import classNames from 'classnames';
import { usePreloaderReadyState } from '@/atoms/preloader-ready';
import { useDebounce } from '@/hooks/use-debounce';

type Props = {
    text?: string;
};

const HelloHtml = ({ text }: Props) => {
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
                <div className="hello-layout__content">
                    <div className="hello-layout__left hello-item">
                        <div className="hello-layout__decor">
                            <FlowersSVG />
                        </div>
                        <div className="hello-message__first">
                            Мы радостно объявляем, что мы собираемся пожениться! Желаем поделиться этой радостной
                            новостью с вами, нашими близкими друзьями и родными.
                        </div>
                        <div className="hello-message__second">
                            Мы приглашаем вас на нашу свадьбу, которая состоится 4 августа. Мы с нетерпением ждем этого
                            особого дня и будем рады видеть вас рядом с нами, чтобы разделить нашу радость и счастье.
                        </div>
                        <div className="hello-message__third">
                            Не забудьте ознакомиться с цветовой палитрой и подтвердить своё участие, по кнопке, в нижней
                            части экрана.
                        </div>
                    </div>
                    <div className="hello-layout__right hello-item">
                        <div className="hello-layout__message">
                            {text && (
                                <div
                                    className="hello-layout__personal"
                                    dangerouslySetInnerHTML={{ __html: text }}
                                ></div>
                            )}
                            <div className="hello-layout__sign">
                                С наилучшими пожеланиями,
                                <br />
                                Роман и Кристина
                            </div>
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

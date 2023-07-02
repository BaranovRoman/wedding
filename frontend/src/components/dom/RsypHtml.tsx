import { usePlay } from '@/contexts/play';
import { motion } from 'framer-motion';
import axios from 'axios';
import type { PersonData } from '@/types';
import CrossSVG from '@/svg/cross.svg';
import { useState } from 'react';
import classNames from 'classnames';

type Props = {
    data: PersonData;
};

const RsypHtml = ({ data }: Props) => {
    const { end, setEnd } = usePlay();
    const [accepted, setAccepted] = useState(false);
    const [declined, setDeclined] = useState(false);
    const [error, setError] = useState('');
    const [isAcceptLoading, setIsAcceptLoading] = useState(false);
    const [isDeclineLoading, setIsDeclineLoading] = useState(false);

    const fetchToSheet = (script_id: string, status: 'accept' | 'decline') => {
        axios
            .get(`https://script.google.com/macros/s/${script_id}/exec`)
            .then(function (response) {
                if (status === 'accept') {
                    setAccepted(true);
                    setDeclined(false);
                }
                if (status === 'decline') {
                    setAccepted(false);
                    setDeclined(true);
                }
            })
            .catch(function (error) {
                setError(
                    `При подтверждении произошла ошибка - ${error}. Пожалуйста, отпишите любому из нас в личные сообщения, о том, сможете ли вы прийти.`,
                );
            })
            .finally(() => {
                setIsAcceptLoading(false);
                setIsDeclineLoading(false);
            });
    };

    return (
        <motion.div
            variants={{
                visible: {
                    pointerEvents: 'auto',
                },
                hidden: {
                    pointerEvents: 'none',
                },
            }}
            animate={end ? 'visible' : 'hidden'}
            className="rsyp-popup"
        >
            <motion.div
                variants={{
                    visible: {
                        opacity: 1,
                    },
                    hidden: {
                        opacity: 0,
                    },
                }}
                animate={end ? 'visible' : 'hidden'}
                className="rsyp-popup__overlay"
                onClick={() => {
                    setEnd(false);
                }}
            ></motion.div>
            <motion.div
                variants={{
                    visible: {
                        opacity: 1,
                    },
                    hidden: {
                        opacity: 0,
                    },
                }}
                animate={end ? 'visible' : 'hidden'}
                transition={{ ease: 'easeOut' }}
                className="rsyp-popup__inner"
            >
                <div className="rsyp-content">
                    <button
                        type="button"
                        className="rsyp-popup__close"
                        onClick={() => {
                            setEnd(false);
                        }}
                    >
                        <div className="button__inner close-button-inner">
                            <CrossSVG />
                        </div>
                    </button>
                    <div className="rsyp-title">Уважаемые {data.names}</div>
                    <div className="rsyp-text">
                        <div>
                            <p>Мы хотим узнать, сможете ли вы присутствовать на нашей свадьбе.</p>
                            <p>
                                Ваше присутствие очень важно для нас, и мы хотели бы знать, будете ли вы рады быть с
                                нами в этот особый день.
                            </p>
                            <p>Пожалуйста, дайте нам знать, придёте ли вы на нашу свадьбу.</p>
                        </div>

                        <div>
                            <p>Пожалуйста, дайте нам знать свой выбор. </p>
                            <p>
                                Если у тебя есть какие-либо вопросы или пожелания, не стесняйся{' '}
                                <a href="https://t.me/ramzes2045" target="_blank" className="link">
                                    обратиться к нам.
                                </a>
                            </p>
                            <p>
                                Мы надеемся, что ты сможешь присоединиться к нам и сделать наш день еще более особенным.
                            </p>
                        </div>
                        <div>
                            <p>С наилучшими пожеланиями,</p>
                            <p>Роман и Кристина</p>
                        </div>
                    </div>
                    <div className="rsyp-popup__buttons">
                        <button
                            type="button"
                            className={classNames('button accept button-confirm', {
                                'is-done': accepted,
                                'is-loading': isAcceptLoading,
                            })}
                            onClick={() => {
                                setIsAcceptLoading(true);
                                fetchToSheet(data.accept_script_id, 'accept');
                            }}
                        >
                            <div className="button__inner">Обязательно придем</div>
                        </button>
                        <button
                            type="button"
                            className={classNames('button decline button-confirm', {
                                'is-done': declined,
                                'is-loading': isDeclineLoading,
                            })}
                            onClick={() => {
                                setIsDeclineLoading(true);
                                fetchToSheet(data.decline_script_id, 'decline');
                            }}
                        >
                            <div className="button__inner">К сожалению, не сможем присутствовать</div>
                        </button>
                        {error !== '' && <p>{error}</p>}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default RsypHtml;

import FlowersSVG from '@/svg/flowers.svg';

const HelloHtml = () => {
    return (
        <div className="hello-layout">
            <div className="hello-layout__top">4 августа</div>
            <div className="hello-layout__center">
                <div className="center__decor">
                    <FlowersSVG />
                </div>
                <div className="center__title">Добро пожаловать</div>
                <div className="center__description">на наше драгоценное событие</div>
            </div>
            <div className="hello-layout__bottom">Красноярск, дрокино парк</div>
        </div>
    );
};

export default HelloHtml;

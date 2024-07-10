import { h, render } from 'https://unpkg.com/preact@latest?module';
import { useState, useEffect, useCallback, useRef } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';

function Header() {
    let [expanded, setExpanded] = useState(false);
    let [toggled, setToggled] = useState(false);

    const onClick = useCallback(() => {
        if (!toggled) {
            setToggled(true);
        }

        setExpanded(!expanded);
    }, [toggled]);

    return h('header', { className: 'header' },
        h('a', { href: '/', className: 'header__logo', 'aria-label': 'Яндекс.Дом' }),
        h('button', {
                className: 'header__menu',
                'aria-expanded': expanded ? 'true' : 'false',
                onClick: onClick
            },
            h('span', { className: 'header__menu-text a11y-hidden' },
                expanded ? 'Закрыть меню' : 'Открыть меню'
            )
        ),
        h('ul', {
                className: 'header__links' +
                    (expanded ? ' header__links_opened' : '') +
                    (toggled ? ' header__links-toggled' : '')
            },
            h('li', { className: 'header__item' },
                h('a', {
                    className: 'header__link header__link_current',
                    href: '/',
                    'aria-current': 'page'
                }, 'Сводка')
            ),
            h('li', { className: 'header__item' },
                h('a', { className: 'header__link', href: '/devices' }, 'Устройства')
            ),
            h('li', { className: 'header__item' },
                h('a', { className: 'header__link', href: '/scripts' }, 'Сценарии')
            )
        )
    );
}

function Event(props) {
    const ref = useRef();

    const { onSize } = props;

    useEffect(() => {
        const width = ref.current.offsetWidth;
        if (onSize) {
            onSize(width);
        }
    });

    return h('li', { ref: ref, className: 'event' + (props.slim ? ' event_slim' : '') },
        h('button', { className: 'event__button' },
            h('span', {
                className: `event__icon event__icon_${props.icon}`,
                role: 'img',
                'aria-label': props.iconLabel
            }),
            h('h4', { className: 'event__title' }, props.title),
            props.subtitle &&
            h('span', { className: 'event__subtitle' }, props.subtitle)
        )
    );
}

const TABS = {
    all: {
        title: 'Все',
        items: [{
            icon: 'light2',
            iconLabel: 'Освещение',
            title: 'Xiaomi Yeelight LED Smart Bulb',
            subtitle: 'Включено'
        }, {
            icon: 'light',
            iconLabel: 'Освещение',
            title: 'D-Link Omna 180 Cam',
            subtitle: 'Включится в 17:00'
        }, {
            icon: 'temp',
            iconLabel: 'Температура',
            title: 'Elgato Eve Degree Connected',
            subtitle: 'Выключено до 17:00'
        }, {
            icon: 'light',
            iconLabel: 'Освещение',
            title: 'LIFX Mini Day & Dusk A60 E27',
            subtitle: 'Включится в 17:00'
        }, {
            icon: 'light2',
            iconLabel: 'Освещение',
            title: 'Xiaomi Mi Air Purifier 2S',
            subtitle: 'Включено'
        }, {
            icon: 'light',
            iconLabel: 'Освещение',
            title: 'Philips Zhirui',
            subtitle: 'Включено'
        }, {
            icon: 'light',
            iconLabel: 'Освещение',
            title: 'Philips Zhirui',
            subtitle: 'Включено'
        }, {
            icon: 'light2',
            iconLabel: 'Освещение',
            title: 'Xiaomi Mi Air Purifier 2S',
            subtitle: 'Включено'
        }]
    },
    kitchen: {
        title: 'Кухня',
        items: [{
            icon: 'light2',
            iconLabel: 'Освещение',
            title: 'Xiaomi Yeelight LED Smart Bulb',
            subtitle: 'Включено'
        }, {
            icon: 'temp',
            iconLabel: 'Температура',
            title: 'Elgato Eve Degree Connected',
            subtitle: 'Выключено до 17:00'
        }]
    },
    hall: {
        title: 'Зал',
        items: [{
            icon: 'light',
            iconLabel: 'Освещение',
            title: 'Philips Zhirui',
            subtitle: 'Выключено'
        }, {
            icon: 'light2',
            iconLabel: 'Освещение',
            title: 'Xiaomi Mi Air Purifier 2S',
            subtitle: 'Выключено'
        }]
    },
    lights: {
        title: 'Лампочки',
        items: [{
            icon: 'light',
            iconLabel: 'Освещение',
            title: 'D-Link Omna 180 Cam',
            subtitle: 'Включится в 17:00'
        }, {
            icon: 'light',
            iconLabel: 'Освещение',
            title: 'LIFX Mini Day & Dusk A60 E27',
            subtitle: 'Включится в 17:00'
        }, {
            icon: 'light2',
            iconLabel: 'Освещение',
            title: 'Xiaomi Mi Air Purifier 2S',
            subtitle: 'Включено'
        }, {
            icon: 'light',
            iconLabel: 'Освещение',
            title: 'Philips Zhirui',
            subtitle: 'Включено'
        }]
    },
    cameras: {
        title: 'Камеры',
        items: [{
            icon: 'light2',
            iconLabel: 'Освещение',
            title: 'Xiaomi Mi Air Purifier 2S',
            subtitle: 'Включено'
        }]
    }
};

for (let i = 0; i < 6; i++) {
    TABS.all.items.push(...TABS.all.items);
}
const TABS_KEYS = ['all', 'kitchen', 'hall', 'lights', 'cameras'];

function Main() {
    const ref = useRef();
    const initedRef = useRef(false);
    const [activeTab, setActiveTab] = useState('');
    const [hasRightScroll, setHasRightScroll] = useState(false);

    useEffect(() => {
        if (!activeTab && !initedRef.current) {
            initedRef.current = true;
            setActiveTab(new URLSearchParams(location.search).get('tab') || 'all');
        }
    });

    let width = 0;
    const onSize = newWidth => {
        width += newWidth;
    };

    useEffect(() => {
        const newHasRightScroll = width > ref.current.offsetWidth;
        if (newHasRightScroll !== hasRightScroll) {
            setHasRightScroll(newHasRightScroll);
        }
    });

    const onArrowCLick = () => {
        const scroller = ref.current.querySelector('.section__panel:not(.section__panel_hidden)');
        if (scroller) {
            scroller.scrollTo({
                left: scroller.scrollLeft + 400,
                behavior: 'smooth'
            });
        }
    };

    const onSelectInput = event => {
        setActiveTab(event.target.value);
    };

    return h('main', { className: 'main' },
        h('section', { className: 'section main__general' },
            h('h2', { className: 'section__title section__title-header section__main-title' }, 'Главное'),
            h('div', { className: 'hero-dashboard' },
                h('div', { className: 'hero-dashboard__primary' },
                    h('h3', { className: 'hero-dashboard__title' }, 'Привет, Геннадий!'),
                    h('p', { className: 'hero-dashboard__subtitle' }, 'Двери и окна закрыты, сигнализация включена.'),
                    h('ul', { className: 'hero-dashboard__info' },
                        h('li', { className: 'hero-dashboard__item' },
                            h('div', { className: 'hero-dashboard__item-title' }, 'Дома'),
                            h('div', { className: 'hero-dashboard__item-details' },
                                '+23',
                                h('span', { className: 'a11y-hidden' }, '°')
                            )
                        ),
                        h('li', { className: 'hero-dashboard__item' },
                            h('div', { className: 'hero-dashboard__item-title' }, 'За окном'),
                            h('div', { className: 'hero-dashboard__item-details' },
                                '+19',
                                h('span', { className: 'a11y-hidden' }, '°'),
                                h('div', {
                                    className: 'hero-dashboard__icon hero-dashboard__icon_rain',
                                    role: 'img',
                                    'aria-label': 'Дождь'
                                })
                            )
                        )
                    )
                ),
                h('ul', { className: 'hero-dashboard__schedule' },
                    h(Event, {
                        icon: 'temp',
                        iconLabel: 'Температура',
                        title: 'Philips Cooler',
                        subtitle: 'Начнет охлаждать в 16:30'
                    }),
                    h(Event, {
                        icon: 'light',
                        iconLabel: 'Освещение',
                        title: 'Xiaomi Yeelight LED Smart Bulb',
                        subtitle: 'Включится в 17:00'
                    }),
                    h(Event, {
                        icon: 'light',
                        iconLabel: 'Освещение',
                        title: 'Xiaomi Yeelight LED Smart Bulb',
                        subtitle: 'Включится в 17:00'
                    })
                )
            )
        ),

        h('section', { className: 'section main__scripts' },
            h('h2', { className: 'section__title section__title-header' }, 'Избранные сценарии'),
            h('ul', { className: 'event-grid' },
                h(Event, {
                    slim: true,
                    icon: 'light2',
                    iconLabel: 'Освещение',
                    title: 'Выключить весь свет в доме и во дворе'
                }),
                h(Event, {
                    slim: true,
                    icon: 'schedule',
                    iconLabel: 'Расписание',
                    title: 'Я ухожу'
                }),
                h(Event, {
                    slim: true,
                    icon: 'light2',
                    iconLabel: 'Освещение',
                    title: 'Включить свет в коридоре'
                }),
                h(Event, {
                    slim: true,
                    icon: 'temp2',
                    iconLabel: 'Температура',
                    title: 'Набрать горячую ванну',
                    subtitle: 'Начнётся в 18:00'
                }),
                h(Event, {
                    slim: true,
                    icon: 'temp2',
                    iconLabel: 'Температура',
                    title: 'Сделать пол тёплым во всей квартире'
                })
            )
        ),

        h('section', { className: 'section main__devices' },
            h('div', { className: 'section__title' },
                h('h2', { className: 'section__title-header' }, 'Избранные устройства'),

                h('select', { className: 'section__select', defaultValue: 'all', onInput: onSelectInput },
                    TABS_KEYS.map(key =>
                        h('option', { key: key, value: key }, TABS[key].title)
                    )
                ),

                h('ul', { role: 'tablist', className: 'section__tabs' },
                    TABS_KEYS.map(key =>
                        h('li', {
                            key: key,
                            role: 'tab',
                            'aria-selected': key === activeTab ? 'true' : 'false',
                            tabIndex: key === activeTab ? '0' : undefined,
                            className: 'section__tab' + (key === activeTab ? ' section__tab_active' : ''),
                            id: `tab_${key}`,
                            'aria-controls': `panel_${key}`,
                            onClick: () => setActiveTab(key)
                        }, TABS[key].title)
                    )
                )
            ),

            h('div', { className: 'section__panel-wrapper', ref: ref },
                TABS_KEYS.map(key =>
                    h('div', {
                            key: key,
                            role: 'tabpanel',
                            className: 'section__panel' + (key === activeTab ? '' : ' section__panel_hidden'),
                            'aria-hidden': key === activeTab ? 'false' : 'true',
                            id: `panel_${key}`,
                            'aria-labelledby': `tab_${key}`
                        },
                        h('ul', { className: 'section__panel-list' },
                            TABS[key].items.map((item, index) =>
                                h(Event, {
                                    key: index,
                                    ...item,
                                    onSize: onSize
                                })
                            )
                        )
                    )
                ),
                hasRightScroll &&
                h('div', { className: 'section__arrow', onClick: onArrowCLick })
            )
        )
    );
}

function Footer() {
    return h('footer', { className: 'footer' },
        h('ul', { className: 'footer__list' },
            h('li', { className: 'footer__item' },
                h('a', { className: 'footer__link', href: '/' }, 'Помощь')
            ),
            h('li', { className: 'footer__item' },
                h('a', { className: 'footer__link', href: '/' }, 'Обратная связь')
            ),
            h('li', { className: 'footer__item' },
                h('a', { className: 'footer__link', href: '/' }, 'Разработчикам')
            ),
            h('li', { className: 'footer__item' },
                h('a', { className: 'footer__link', href: '/' }, 'Условия использования')
            )
        ),
        h('div', { className: 'footer__copyright' },
            '© 1997–2023 ООО «Яндекс»'
        )
    );
}

setTimeout(() => {
    render(
        h('div', {},
            h(Header),
            h(Main),
        ),
        document.getElementById('app')
    );
    render(h(Footer), document.getElementById('footer'));
}, 0);
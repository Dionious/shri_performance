document.addEventListener('DOMContentLoaded', function() {
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

    // Дублирование элементов для демонстрации
    for (let i = 0; i < 6; i++) {
        TABS.all.items.push(...TABS.all.items);
    }

    const TABS_KEYS = ['all', 'kitchen', 'hall', 'lights', 'cameras'];

    const headerContainer = document.getElementsByClassName('header')[0];
    const mainContainer = document.getElementsByClassName('main')[0];
    const footerContainer = document.getElementById('footer');

    function Header() {
        let expanded = false;
        let toggled = false;

        const header = `
        <a href="/" class="header__logo" aria-label="Яндекс.Дом"></a>
        <button class="header__menu" aria-expanded="${expanded ? 'true' : 'false'}">
            <span class="header__menu-text a11y-hidden">${expanded ? 'Закрыть меню' : 'Открыть меню'}</span>
        </button>
        <ul class="header__links${expanded ? ' header__links_opened' : ''}${toggled ? ' header__links-toggled' : ''}">
            <li class="header__item">
                <a class="header__link header__link_current" href="/" aria-current="page">Сводка</a>
            </li>
            <li class="header__item">
                <a class="header__link" href="/devices">Устройства</a>
            </li>
            <li class="header__item">
                <a class="header__link" href="/scripts">Сценарии</a>
            </li>
        </ul>
    `;


        headerContainer.innerHTML = header;
        // Находим кнопку меню в заголовке
        const menu = document.querySelector('.header__menu');

        // Добавляем обработчик клика на кнопку меню
        menu.addEventListener('click', function(event) {
            toggled = !toggled;
            expanded = !expanded;

            // Обновляем состояние кнопки меню и ссылок в заголовке
            menu.setAttribute('aria-expanded', expanded ? 'true' : 'false');
            document.querySelector('.header__links').className = `header__links${expanded ? ' header__links_opened' : ''}${toggled ? ' header__links-toggled' : ''}`;
        });
    }

    function Event(props) {
        const { icon, iconLabel, title, subtitle, slim } = props;

        return `
            <li class="event${slim ? ' event_slim' : ''}">
                <button class="event__button">
                    <span class="event__icon event__icon_${icon}" role="img" aria-label="${iconLabel}"></span>
                    <h4 class="event__title">${title}</h4>
                    ${subtitle ? `<span class="event__subtitle">${subtitle}</span>` : ''}
                </button>
            </li>
        `;
    }

    function setActiveTab(tabKey) {
        Main(tabKey);
    }

    function Main(activeTab) {
        let hasRightScroll = false;
        let width = 0;

        function onSize(newWidth) {
            width += newWidth;
        }

        function renderMain() {
            const main = `
                    <section class="section main__general">
                        <h2 class="section__title section__title-header section__main-title">Главное</h2>
                        <div class="hero-dashboard">
                            <div class="hero-dashboard__primary">
                                <h3 class="hero-dashboard__title">Привет, Геннадий!</h3>
                                <p class="hero-dashboard__subtitle">Двери и окна закрыты, сигнализация включена.</p>
                                <ul class="hero-dashboard__info">
                                    <li class="hero-dashboard__item">
                                        <div class="hero-dashboard__item-title">Дома</div>
                                        <div class="hero-dashboard__item-details">+23<span class="a11y-hidden">°</span></div>
                                    </li>
                                    <li class="hero-dashboard__item">
                                        <div class="hero-dashboard__item-title">За окном</div>
                                        <div class="hero-dashboard__item-details">+19<span class="a11y-hidden">°</span>
                                            <div class="hero-dashboard__icon hero-dashboard__icon_rain" role="img" aria-label="Дождь"></div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <ul class="hero-dashboard__schedule">
                                ${Event({ icon: 'temp', iconLabel: 'Температура', title: 'Philips Cooler', subtitle: 'Начнет охлаждать в 16:30' })}
                                ${Event({ icon: 'light', iconLabel: 'Освещение', title: 'Xiaomi Yeelight LED Smart Bulb', subtitle: 'Включится в 17:00' })}
                                ${Event({ icon: 'light', iconLabel: 'Освещение', title: 'Xiaomi Yeelight LED Smart Bulb', subtitle: 'Включится в 17:00' })}
                            </ul>
                        </div>
                    </section>

                    <section class="section main__scenes">
                        <h2 class="section__title section__title-header">Избранные сценарии</h2>
                        <ul class="event-grid">
                            ${Event({ slim: true, icon: 'light2', iconLabel: 'Освещение', title: 'Выключить весь свет в доме и во дворе' })}
                            ${Event({ slim: true, icon: 'schedule', iconLabel: 'Расписание', title: 'Я ухожу' })}
                            ${Event({ slim: true, icon: 'light2', iconLabel: 'Освещение', title: 'Включить свет в коридоре' })}
                            ${Event({ slim: true, icon: 'temp2', iconLabel: 'Температура', title: 'Набрать горячую ванну', subtitle: 'Начнётся в 18:00' })}
                            ${Event({ slim: true, icon: 'temp2', iconLabel: 'Температура', title: 'Сделать пол тёплым во всей квартире' })}
                        </ul>
                    </section>

                    <section class="section main__devices">
                        <div class="section__title">
                            <h2 class="section__title-header">Избранные устройства</h2>
                            <select class="section__select">
                                ${TABS_KEYS.map(key => `<option value="${key}" ${key === activeTab ? 'selected' : ''}>${TABS[key].title}</option>`).join('')}
                            </select>
                            <ul role="tablist" class="section__tabs">
                                ${TABS_KEYS.map(key => `
                                    <li role="tab" aria-selected="${key === activeTab ? 'true' : 'false'}" tabindex="${key === activeTab ? '0' : '-1'}" class="section__tab${key === activeTab ? ' section__tab_active' : ''}" id="tab_${key}" aria-controls="panel_${key}">
                                        ${TABS[key].title}
                                    </li>`).join('')}
                            </ul>
                        </div>
                        <div class="section__panel-wrapper" id="panel_wrapper" onscroll="onScroll()">
                            ${TABS_KEYS.map(key => `
                                <div role="tabpanel" class="section__panel${key === activeTab ? '' : ' section__panel_hidden'}" aria-hidden="${key !== activeTab}">
                                    <ul class="section__panel-list ${key}">
                                        ${TABS[key].items.map(item => Event({ ...item, onSize })).join('')}
                                    </ul>
                                </div>
                            `).join('')}
                            ${hasRightScroll ? `<div class="section__arrow"></div>` : ''}
                        </div>
                    </section>
            `;
            mainContainer.innerHTML = main;
            const tabs = document.querySelectorAll('.section__tab');
            tabs.forEach(tab => {
                tab.addEventListener('click', function(event) {
                    const tabKey = event.target.getAttribute('id').replace('tab_', '');
                    setActiveTab(tabKey);
                });
            });
            const arrow = document.querySelector('.section__arrow');

            arrow?.addEventListener('click', function(event) {
                const scroller = document.querySelector('.section__panel:not(.section__panel_hidden)');
                if (scroller) {
                    scroller.scrollTo({
                        left: scroller.scrollLeft + 400,
                        behavior: 'smooth'
                    });
                }
            });

            const select = document.querySelector('.section__select');

            select?.addEventListener('change', function(event) {
                activeTab = event.target.value;
                setActiveTab(activeTab);
            });
        }

        function onScroll() {
            const wrapper = document.getElementsByClassName(`section__panel-list ${activeTab}`)[0];
            const newHasRightScroll = wrapper.children.length > 20;
            if (newHasRightScroll !== hasRightScroll) {
                hasRightScroll = newHasRightScroll;
                renderMain();
            }
        }

        renderMain();
        onScroll();
    }

    function Footer() {
        const footer = `
            <footer class="footer">
                <ul class="footer__list">
                    <li class="footer__item"><a class="footer__link" href="/">Помощь</a></li>
                    <li class="footer__item"><a class="footer__link" href="/">Обратная связь</a></li>
                    <li class="footer__item"><a class="footer__link" href="/">Разработчикам</a></li>
                    <li class="footer__item"><a class="footer__link" href="/">Условия использования</a></li>
                </ul>
                <div class="footer__copyright">© 1997–2023 ООО «Яндекс»</div>
            </footer>
        `;
        footerContainer.innerHTML = footer;
    }

    function onTabClick(event) {
        const tabKey = event.target.getAttribute('data-tab-key');
        setActiveTab(tabKey);
    }

    Header();
    Main('all');
    Footer();


});
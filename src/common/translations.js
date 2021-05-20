/* eslint-disable react/display-name */
import { h } from 'preact';
const LOCALE_DATE_OPTIONS = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', weekday: 'long' };
export const SUPPORTED_LANGS = ['en', 'ru'];

const DICT = {
  'PCR Time Calculator - what time should I make an appointment for the pcr test before flight?':
    { ru: 'PCR Time Calculator - в какое время я должен записаться на ПЦР-тест перед полетом?' },
  'What time should I make an appointment for the pcr test before flight?':
    { ru: 'В какое время я должен записаться на ПЦР-тест перед полетом?' },
  'Departure time from the country:': { ru: 'Время вылета из страны:' },
  '72 hours before departure is': { ru: '72 часа до вылета это' },
  'What country are you flying to?': { ru: 'В какую страну вы летите?' },
  'My flight leaves at': { ru: 'Я вылетаю' },
  to: { ru: 'в' },
  Turkey: { ru: 'Турцию' },
  UAE: { ru: 'ОАЭ' },
  'other country': { ru: 'другую страну' },
  'Also, I will be unavailable since': { ru: 'При этом, я буду недоступен, начиная с' },
  'show formula settings': { ru: 'показать настройки формулы' },
  '(for the private HES code receiving) must be completed after the above date/time (72 hours before departure).':
    { ru: 'необходимо заполнять после вышеуказанной даты/времени (72 часа до вылета).' },
  'The form for entry to Turkey':
    { ru: 'Форму для получения HES-кода Турции' },
  'Check the UAE information site':
    { ru: 'Посмотрите официальный сайт ОАЭ' },
  'to get the latest information.':
    { ru: 'чтобы прочитать последнюю актуальную информацию.' },
  'UAE airports can have their own additional restrictions. E.g. 72 hours test validity against 96 allowed by government.':
    { ru: 'Аэропорты ОАЭ могут иметь свои собственные дополнительные ограничения, например, 72 часа действия теста против 96, разрешенных правительством.' },
  'Check the Dubai Airports site':
    { ru: 'Проверьте сайт Dubai Airports' },
  'for example.':
    { ru: 'для примера.' },
  'The negative COVID-19 PCR test result must be presented in printed certificate format by the traveller on arrival. The certificate must be in English or Arabic only. Handwritten certificates will not be accepted.':
    { ru: 'Отрицательный результат ПЦР-теста должен быть на бумаге с мокрой печатью. ОАЭ принимает сертификаты только на английском или арабском языках. Рукописные сертификаты не принимаются.' },
  'Check everything carefully - at the specified time, you risk not having time to get the test results!':
    { ru: 'Проверьте всё внимательно - по указанному времени вы рискуете не успеть получить результаты теста!' },
  'It is necessary to make an appointment for the PCR test in the interval:':
    { ru: 'Записаться на сдачу ПЦР теста необходимо в промежутке:' },
  'When PCR test or what time you need to take a PCR analysis for a trip abroad, 72 hours before departure':
    { ru: 'Когда сдавать лабораторный ПЦР тест на коронавирус COVID-19, или как считается время, в которое необходимо сдать ПЦР анализ для поездки за границу, за 72 часа до вылета' },
  'This site helps you calculate when PCR test or what date time you need to take a PCR analysis for a trip abroad, 72 hours before departure.':
    { ru: 'Этот сайт помогает вычислить, когда сдавать лабораторный ПЦР тест на коронавирус COVID-19, или как считается время, в которое необходимо сдать ПЦР анализ для поездки за границу, за 72 часа до вылета.' },
  'pcr, 72hours, 72, analysis, test, coronavirus, covid-19, time, date, flight, departure, calculate':
    { ru: 'пцр, 72 часа, 72, анализ, тест, коронавирус, covid-19, время, дата, рейс, вылет, расчет, калькулятор' },
  'The information provided on this site is for informational purposes only, based on personal speculation.':
    { ru: 'Информация, представленная на этом сайте - носит исключительно информационный характер, на основе личных домыслов.' },
  'The result of the PCR test must be in English and contain the number of your passport (ID). Do not perform a PCR test on the domestic passport (if applicable).':
    { ru: 'Результат ПЦР теста должен быть на английском языке и содержать номер вашего загранпаспорта. Не делайте ПЦР-тест по внутреннему паспорту.' },
  'The result of the PCR test can be shown on departure in electronic form, if there is a QR code that can be used to check this test.':
    { ru: 'Результат ПЦР теста может быть показан при вылете в электронной форме, при наличии QR кода, по которому можно проверить данный тест.' },
  'If there is no QR code the result should be on paper with a "live" stamp of the clinic.':
    { ru: 'Если QR кода нет - результат должен быть на бумаге с "живой" печатью клиники.' },
  'Do a bookmark! Developed for fun by Ivan Maslov':
    { ru: '🙂 Сделайте закладку - этот сайт будет работать и без наличия интернета. Разработал для вас Иван Маслов.' },
  'Expected time to receive the PCR test result:':
    { ru: 'Ожидаемое время получения результата ПЦР-теста:' },
  'Maximum time to get the PCR test result:':
    { ru: 'Максимальное время получения результата ПЦР-теста:' },
  'Minimum time in stock:':
    { ru: 'Минимальное время в запасе:' },
  'Maximum time in stock:':
    { ru: 'Максимальное время в запасе:' },
};

const HOURS_STRINGS = {
  zero: { ru: 'часов', en: 'hours' },
  one: { ru: 'час', en: 'hour' },
  two: { ru: 'часа', en: 'hours' },
  few: { ru: 'часа', en: 'hours' },
  other: { ru: 'часов', en: 'hours' },
  many: { ru: 'часов', en: 'hours' },
};

export const getLDateFromDateObj = (dateObj, lang) => dateObj.toLocaleDateString(lang, LOCALE_DATE_OPTIONS);
export const detectLanguage = () => navigator.language.split('-').shift();
export const translate = (source, lang = 'en') => lang === 'en' || !DICT[source] ? source : DICT[source][lang] || source;
export const translatePlural = (n, lang = 'en', dict) => `${ n } ${ dict[(new Intl.PluralRules(lang)).select(n)][lang] }`;
const getCorrectTextForTranslation = c => c && c.trim().replace(/\n(?:\s+)?/g, ' ');
const isDateValid = d => d instanceof Date && !isNaN(d);

export const langIsNotFound = ({ lang, defaultLang }) => !SUPPORTED_LANGS.includes(lang) || (lang === 'en' && !defaultLang);

export const createTranslateComponent = ({ lang }) => {
  return ({ children, component = 'span', ...props }) => h(component, { ...props, children: (Array.isArray(children) ? children : [children])
      .map(ch => typeof ch === 'object'
        ? { ...ch, props: { ...ch.props, children: translate(getCorrectTextForTranslation(ch.props.children), lang) } }
        : translate(getCorrectTextForTranslation(ch), lang)
      )
    });
};

export const createLocalizedDatetimeComponent = ({ lang }) => {
  return ({ dateTime, component = 'time', ...props }) => h(component, { ...props, dateTime: (isDateValid(dateTime) ? dateTime : new Date()).toISOString(),
    children: getLDateFromDateObj((isDateValid(dateTime) ? dateTime : new Date()), lang) });
};
export const createLocalizedHoursComponent = ({ lang }) => {
  return ({ hours, component = 'output', ...props }) => h(component, { ...props, children: translatePlural(hours, lang, HOURS_STRINGS) });
};

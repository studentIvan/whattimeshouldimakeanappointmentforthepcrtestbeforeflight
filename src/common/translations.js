/* eslint-disable react/display-name */
import { h } from 'preact';
const LOCALE_DATE_OPTIONS = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', weekday: 'long' };

export const SUPPORTED_LOCALES = [
  { label: 'Language: English', code: 'en' },
  { label: 'Язык: Русский', code: 'ru' },
  { label: 'Idioma: Español', code: 'es' },
  { label: 'Langue: Français', code: 'fr' },
  { label: 'Sprache: Deutsch', code: 'de' },
  { label: '网站语言：中文', code: 'zh' },
  { label: 'لغة الموقع: العربية', code: 'ar' },
];

export const SUPPORTED_LANGS = SUPPORTED_LOCALES.map(locale => locale.code);

const DICT = {
  'PCR Time Calculator - what time should I make an appointment for the pcr test before flight?': {
    ru: 'PCR Time Calculator - в какое время я должен записаться на ПЦР-тест перед полетом?',
    es: 'PCR Time Calculator - ¿a qué hora debo inscribirme en una prueba de PCR antes del vuelo?',
    fr: 'PCR Time Calculator - à quelle heure dois-je m\'inscrire pour un test PCR avant le vol?',
    de: 'PCR Time Calculator - wann sollte ich mich vor dem Flug für einen PCR-Test anmelden?',
    zh: 'PCR Time Calculator - PCR时间计算器',
    ar: 'PCR Time Calculator-في أي وقت يجب تحديد موعد لاختبار pcr قبل الرحلة؟',
  },
  'What time should I make an appointment for the pcr test before flight?': {
    ru: 'В какое время я должен записаться на ПЦР-тест перед полетом?',
    es: '¿A qué hora debo hacer una cita para la prueba de pcr antes del vuelo?',
    fr: 'À quelle heure dois-je prendre rendez-vous pour le test pcr avant le vol?',
    de: 'Wann sollte ich vor dem Flug einen Termin für den PCR-Test vereinbaren?',
    zh: 'PCR时间计算器',
    ar: 'في أي وقت يجب تحديد موعد لاختبار pcr قبل الرحلة؟',
  },
  'Departure time from the country:': {
    ru: 'Время вылета из страны:',
    es: 'Hora de salida del país:',
    fr: 'Heure de départ du pays:',
    de: 'Abfahrtszeit vom Land:',
    zh: '从该国出发时间:',
    ar: 'وقت المغادرة من البلاد:',
  },
  '72 hours before departure is': {
    ru: '72 часа до вылета это',
    es: '72 horas antes de la salida es',
    fr: '72 heures avant le départ est',
    de: '72 stunden vor Abflug ist',
    zh: '出发前72小时为',
    ar: 'قبل 72 ساعة من المغادرة',
  },
  'What country are you flying to?': {
    ru: 'В какую страну вы летите?',
    es: '¿A qué país volarás?',
    fr: 'Dans quel pays volez-vous?',
    de: 'In welches Land fliegst du?',
    zh: '你飞往哪个国家？',
    ar: 'إلى أي بلد تسافر؟',
  },
  'My flight leaves at': {
    ru: 'Я вылетаю',
    es: 'Mi vuelo sale a las',
    fr: 'Mon vol part à',
    de: 'Mein Flug geht um',
    zh: '我的航班于',
    ar: 'رحلتي يترك في',
  },
  to: {
    ru: 'в',
    es: 'a',
    fr: 'pour',
    de: 'Uhr in',
    zh: '起飞至',
    ar: 'إلى',
  },
  Turkey: {
    ru: 'Турцию',
    es: 'Turquía',
    fr: 'la Turquie',
    de: 'die Türkei',
    zh: '土耳其',
    ar: 'تركيا',
  },
  UAE: {
    ru: 'ОАЭ',
    es: 'los EAU',
    fr: 'les Émirats',
    de: 'die VAE',
    zh: '阿联酋',
    ar: 'الإمارات',
  },
  'other country': {
    ru: 'другую страну',
    es: 'otro país',
    fr: 'vers un autre',
    de: 'ein anderes Land',
    zh: '其他国家',
    ar: 'بلد آخر',
  },
  'Also, I will be unavailable since': {
    ru: 'При этом, я буду недоступен, начиная с',
    es: 'Además, no estaré disponible desde las',
    fr: 'De plus, je serai indisponible depuis',
    de: 'Außerdem werde ich seither nicht mehr verfügbar sein',
    zh: '因此，我将从以下时间开始处于离线状态',
    ar: 'أيضا, وسوف تكون غير متوفرة منذ',
  },
  'show formula settings': {
    ru: 'показать настройки формулы',
    es: 'mostrar la configuración de la fórmula',
    fr: 'afficher les paramètres de la formule',
    de: 'formel-Einstellungen anzeigen',
    zh: '显示公式设置',
    ar: 'عرض إعدادات الصيغة',
  },
  '(for the private HES code receiving) must be completed after the above date/time (72 hours before departure).': {
    ru: 'необходимо заполнять после вышеуказанной даты/времени (72 часа до вылета).',
    es: '(para recibir el código privado HES) debe completarse después de la fecha/hora anterior (72 horas antes de la salida).',
    fr: '(pour la réception du code HES privé) doit être rempli après la date/heure ci-dessus (72 heures avant le départ).',
    de: '(für den privaten HES-Code-Empfang) muss nach dem oben genannten Datum/Uhrzeit (72 Stunden vor Abflug) ausgefüllt werden.',
    zh: '（对于私人HES代码接收）必须在上述日期/时间之后（出发前72小时）完成。',
    ar: '(للحصول على رمز هس الخاص تلقي) يجب أن تكتمل بعد التاريخ/الوقت أعلاه (72 ساعة قبل المغادرة).',
  },
  'The form for entry to Turkey': {
    ru: 'Форму для получения HES-кода Турции',
    es: 'El formulario de entrada a Turquía',
    fr: 'Le formulaire d\'entrée en Turquie',
    de: 'Das Formular für die Einreise in die Türkei',
    zh: '入境土耳其的表格',
    ar: 'نموذج الدخول إلى تركيا',
  },
  'Check the UAE information site': {
    ru: 'Посмотрите официальный сайт ОАЭ',
    es: 'Consulte el sitio de información de los EAU',
    fr: 'Consultez le site d\'information des EAU',
    de: 'Überprüfen Sie die VAE-Informationsseite',
    zh: '查看阿联酋信息网站',
    ar: 'تحقق من موقع معلومات الإمارات العربية المتحدة',
  },
  'to get the latest information.': {
    ru: 'чтобы прочитать последнюю актуальную информацию.',
    es: 'para obtener la información más reciente',
    fr: 'pour obtenir les dernières informations',
    de: 'um die neuesten Informationen zu erhalten',
    zh: '要获取最新信息',
    ar: 'للحصول على أحدث المعلومات',
  },
  'UAE airports can have their own additional restrictions. E.g. 72 hours test validity against 96 allowed by government.': {
    ru: 'Аэропорты ОАЭ могут иметь свои собственные дополнительные ограничения, например, 72 часа действия теста против 96, разрешенных правительством.',
    es: 'Los aeropuertos de los EAU pueden tener sus propias restricciones adicionales. Por ejemplo, 72 horas de validez de prueba contra 96 permitidos por el gobierno.',
    fr: 'Les aéroports des EAU peuvent avoir leurs propres restrictions supplémentaires. Par exemple, 72 heures de validité du test contre 96 autorisées par le gouvernement.',
    de: 'Flughäfen der VAE können ihre eigenen zusätzlichen Einschränkungen haben. ZB 72 Stunden Test Gültigkeit gegen 96 von der Regierung erlaubt.',
    zh: '阿联酋机场可能有自己的额外限制。 例如，72小时测试有效期针对政府允许的96。',
    ar: 'يمكن أن يكون لمطارات الإمارات قيود إضافية خاصة بها. على سبيل المثال 72 ساعة صلاحية الاختبار مقابل 96 المسموح بها من قبل الحكومة.',
  },
  'Check the Dubai Airports site': {
    ru: 'Проверьте сайт Dubai Airports',
    es: 'Consulte el sitio de Dubai Airports',
    fr: 'Consultez le site des aéroports de Dubaï',
    de: 'Überprüfen Sie die Dubai Flughäfen Website',
    zh: '查看迪拜机场网站',
    ar: 'تحقق من موقع مطارات دبي',
  },
  'for example.': {
    ru: 'для примера.',
    es: 'por ejemplo.',
    fr: 'exemple.',
    de: 'beispielsweise.',
    zh: '例如。',
    ar: 'على سبيل المثال.',
  },
  'The negative COVID-19 PCR test result must be presented in printed certificate format by the traveller on arrival. The certificate must be in English or Arabic only. Handwritten certificates will not be accepted.': {
    ru: 'Отрицательный результат ПЦР-теста должен быть на бумаге с мокрой печатью. ОАЭ принимает сертификаты только на английском или арабском языках. Рукописные сертификаты не принимаются.',
    es: 'El resultado negativo de la prueba de PCR de COVID-19 debe ser presentado en formato de certificado impreso por el viajero a su llegada. El certificado debe estar en inglés o árabe solamente. No se aceptarán certificados escritos a mano.',
    fr: 'Le résultat négatif du test PCR COVID-19 doit être présenté sous forme de certificat imprimé par le voyageur à son arrivée. Le certificat doit être en anglais ou en arabe uniquement. Les certificats manuscrits ne seront pas acceptés.',
    de: 'Das negative COVID-19-PCR-Testergebnis muss vom Reisenden bei der Ankunft im gedruckten Zertifikatsformat vorgelegt werden. Das Zertifikat muss nur in englischer oder arabischer Sprache vorliegen. Handschriftliche Zertifikate werden nicht akzeptiert.',
    zh: 'COVID-19 PCR 阴性检测结果必须由旅客在抵达时以打印形式提交。 证书必须是英文或阿拉伯文。 不接受手写证书。',
    ar: 'يجب تقديم نتيجة اختبار COVID-19 PCR السلبية بتنسيق شهادة مطبوعة من قبل المسافر عند الوصول. يجب أن تكون الشهادة في الإنجليزية أو العربية فقط. لن يتم قبول الشهادات المكتوبة بخط اليد.',
  },
  'Check everything carefully - at the specified time, you risk not having time to get the test results!': {
    ru: 'Проверьте всё внимательно - по указанному времени вы рискуете не успеть получить результаты теста!',
    es: 'Compruebe todo cuidadosamente - en el momento especificado, corre el riesgo de no tener tiempo para obtener los resultados de la prueba!',
    fr: 'Vérifiez tout attentivement - à l\'heure spécifiée, vous risquez de ne pas avoir le temps d\'obtenir les résultats du test!',
    de: 'Überprüfen Sie alles sorgfältig - zum angegebenen Zeitpunkt riskieren Sie, keine Zeit zu haben, um die Testergebnisse zu erhalten!',
    zh: '请在指定的时间内仔细检查所有必要文件，因为您可能没有足够的时间得到检测结果！',
    ar: 'تحقق من كل شيء بعناية-في الوقت المحدد ، فإنك تخاطر بعدم وجود وقت للحصول على نتائج الاختبار!',
  },
  'It is necessary to make an appointment for the PCR test in the interval:': {
    ru: 'Записаться на сдачу ПЦР теста необходимо в промежутке:',
    es: 'Es necesario hacer una cita para la prueba de PCR en el intervalo:',
    fr: 'Il est nécessaire de prendre rendez-vous pour le test PCR dans l\'intervalle:',
    de: 'Es ist notwendig, einen Termin für den PCR-Test im Intervall zu vereinbaren:',
    zh: '必须在以下时间段内预约进行PCR检测：',
    ar: 'من الضروري تحديد موعد لاختبار PCR في الفاصل الزمني:',
  },
  'When PCR test or what time you need to take a PCR analysis for a trip abroad, 72 hours before departure': {
    ru: 'Когда сдавать лабораторный ПЦР тест на коронавирус COVID-19, или как считается время, в которое необходимо сдать ПЦР анализ для поездки за границу, за 72 часа до вылета',
    es: 'Cuando la prueba de PCR o a qué hora necesita tomar un análisis de PCR para un viaje al extranjero, 72 horas antes de la salida',
    fr: 'Quand test PCR ou à quelle heure vous devez effectuer une analyse PCR pour un voyage à l \'étranger, 72 heures avant le départ',
    de: 'Wann PCR-Test oder zu welcher Zeit Sie eine PCR-Analyse für eine Auslandsreise benötigen, 72 Stunden vor Abflug',
    zh: '在出发前72小时进行PCR测试时或出国旅行需要什么时候进行PCR分析',
    ar: 'عند اختبار PCR أو في أي وقت تحتاج إلى إجراء تحليل PCR لرحلة إلى الخارج ، قبل 72 ساعة من المغادرة',
  },
  'This site helps you calculate when PCR test or what date time you need to take a PCR analysis for a trip abroad, 72 hours before departure.': {
    ru: 'Этот сайт помогает вычислить, когда сдавать лабораторный ПЦР тест на коронавирус COVID-19, или как считается время, в которое необходимо сдать ПЦР анализ для поездки за границу, за 72 часа до вылета.',
    es: 'Este sitio le ayuda a calcular cuándo es la prueba de PCR o qué fecha y hora necesita tomar un análisis de PCR para un viaje al extranjero, 72 horas antes de la salida.',
    fr: 'Ce site vous aide à calculer le moment du test PCR ou la date à laquelle vous devez effectuer une analyse PCR pour un voyage à l\'étranger, 72 heures avant le départ.',
    de: 'Diese Seite hilft Ihnen bei der Berechnung, wann PCR-Test oder welches Datum Zeit, die Sie benötigen, um eine PCR-Analyse für eine Reise ins Ausland zu nehmen, 72 Stunden vor Abflug.',
    zh: '本网站可以帮助您计算在出国旅行前多久您需要进行COVID-19 PCR检测',
    ar: 'يساعدك هذا الموقع على حساب وقت اختبار PCR أو وقت التاريخ الذي تحتاجه لإجراء تحليل PCR لرحلة إلى الخارج, 72 قبل ساعات من المغادرة.',
  },
  'pcr, 72hours, 72, analysis, test, coronavirus, covid-19, time, date, flight, departure, calculate': {
    ru: 'пцр, 72 часа, 72, анализ, тест, коронавирус, covid-19, время, дата, рейс, вылет, расчет, калькулятор',
    es: 'pcr, 72 horas, 72, análisis, prueba, coronavirus, covid-19, hora, fecha, vuelo, salida, calculadora',
    fr: 'pcr, 72 heures, 72, analyse, test, coronavirus, covid-19, heure, date, vol, départ, calculatrice',
    de: 'PCR, 72 Stunden, 72, Analyse, Test, Coronavirus, Covid-19, Uhrzeit, Datum, Flug, Abflug, Taschenrechner',
    zh: 'pcr，72 小时，72，分析，测试，冠状病毒，covid-19，时间，日期，航班，出发，计算器',
    ar: 'pcr, 72hours, 72, تحليل, اختبار, كورونافيروس, covid-19, الوقت, تاريخ, رحلة, المغادرة, حساب',
  },
  'The information provided on this site is for informational purposes only, based on personal speculation.': {
    ru: 'Информация, представленная на этом сайте - носит исключительно информационный характер, на основе личных домыслов.',
    es: 'La información proporcionada en este sitio es solo para fines informativos, basado en la especulación personal.',
    fr: 'Les informations fournies sur ce site sont fournies à titre informatif uniquement, sur la base de spéculations personnelles.',
    de: 'Die auf dieser Website bereitgestellten Informationen dienen nur zu Informationszwecken und basieren auf persönlichen Spekulationen.',
    zh: '本网站提供的信息仅供参考，基于个人猜测。',
    ar: 'المعلومات المقدمة على هذا الموقع هي لأغراض إعلامية فقط ، على أساس الشخصية المضاربة.',
  },
  'The result of the PCR test must be in English and contain the number of your passport (ID). Do not perform a PCR test on the domestic passport (if applicable).': {
    ru: 'Результат ПЦР теста должен быть на английском языке и содержать номер вашего загранпаспорта. Не делайте ПЦР-тест по внутреннему паспорту.',
    es: 'El resultado de la prueba PCR debe estar en inglés y contener el número de su pasaporte (DNI). No realice una prueba de PCR en el pasaporte nacional (si corresponde).',
    fr: 'Le résultat du test PCR doit être en anglais et contenir le numéro de votre passeport (pièce d\'identité). N\'effectuez pas de test PCR sur le passeport national (le cas échéant).',
    de: 'Das Ergebnis des PCR-Tests muss in englischer Sprache vorliegen und die Nummer Ihres Reisepasses (Personalausweises) enthalten. Führen Sie keinen PCR-Test im inländischen Pass durch (falls zutreffend).',
    zh: 'PCR检测报告必须是英文的，并包含您的护照号码。请不要使用身份证出具PCR检测报告',
    ar: 'يجب أن تكون نتيجة اختبار PCR باللغة الإنجليزية وتحتوي على رقم جواز سفرك (ID). لا تقم بإجراء اختبار PCR على جواز السفر المحلي (إن وجد).',
  },
  'The result of the PCR test can be shown on departure in electronic form, if there is a QR code that can be used to check this test.': {
    ru: 'Результат ПЦР теста может быть показан при вылете в электронной форме, при наличии QR кода, по которому можно проверить данный тест.',
    es: 'El resultado de la prueba de PCR se puede mostrar a la salida en forma electrónica, si hay un código QR que se puede utilizar para verificar esta prueba.',
    fr: 'Le résultat du test PCR peut être affiché au départ sous forme électronique, s\'il existe un code QR qui peut être utilisé pour vérifier ce test.',
    de: 'Das Ergebnis des PCR-Tests kann bei der Abreise in elektronischer Form angezeigt werden, wenn ein QR-Code zur Überprüfung dieses Tests verwendet werden kann.',
    zh: '在有QR码的情况下，PCR检测结果可以在出发前以电子版形式出示。',
    ar: 'يمكن عرض نتيجة اختبار PCR عند المغادرة في شكل إلكتروني ، إذا كان هناك رمز QR يمكن استخدامه للتحقق من هذا الاختبار.',
  },
  'If there is no QR code the result should be on paper with a "live" stamp of the clinic.': {
    ru: 'Если QR кода нет - результат должен быть на бумаге с "живой" печатью клиники.',
    es: 'Si no hay código QR, el resultado debe estar en papel con un sello "en vivo" de la clínica.',
    fr: 'S\'il n\'y a pas de code QR, le résultat doit être sur papier avec un tampon "en direct" de la clinique.',
    de: 'Wenn es keinen QR-Code gibt, sollte das Ergebnis auf Papier mit einem "Live" - Stempel der Klinik sein.',
    zh: '如果在检测报告上没有QR码，那么在报告上需要有检测机构（如医院）的印章',
    ar: 'إذا لم يكن هناك رمز الاستجابة السريعة يجب أن تكون النتيجة على الورق مع ختم "مباشر" للعيادة.',
  },
  'Do a bookmark! Developed for fun by Ivan Maslov': {
    ru: '🙂 Сделайте закладку - этот сайт будет работать и без наличия интернета. Разработал для вас Иван Маслов.',
    es: '¡Haz un marcador! Desarrollado para la diversión por Ivan Maslov',
    fr: 'Faites un signet! Développé pour le plaisir par Ivan Maslov',
    de: 'Mach ein Lesezeichen! Entwickelt für Spaß von Ivan Maslov',
    zh: '做一个书签！ 由伊万*马斯洛夫开发的乐趣',
    ar: 'هل المرجعية! وضعت للمتعة من قبل إيفان ماسلوف',
  },
  'Expected time to receive the PCR test result:': {
    ru: 'Ожидаемое время получения результата ПЦР-теста:',
    es: 'Tiempo esperado para recibir el resultado de la prueba PCR:',
    fr: 'Temps prévu pour recevoir le résultat du test PCR:',
    de: 'Erwartete Zeit bis zum Erhalt des PCR-Testergebnisses:',
    zh: '预计收到PCR检测结果的时间:',
    ar: 'الوقت المتوقع لتلقي نتيجة اختبار PCR:',
  },
  'Maximum time to get the PCR test result:': {
    ru: 'Максимальное время получения результата ПЦР-теста:',
    es: 'Tiempo máximo para obtener el resultado de la prueba de PCR:',
    fr: 'Temps maximum pour obtenir le résultat du test PCR:',
    de: 'Maximale Zeit, um das PCR-Testergebnis zu erhalten:',
    zh: '获得PCR检测结果的最长时间:',
    ar: 'الحد الأقصى للوقت للحصول على نتيجة اختبار PCR:',
  },
  'Minimum time in stock:':{
    ru: 'Минимальное время в запасе:',
    es: 'Tiempo mínimo en stock:',
    fr: 'Temps minimum en stock:',
    de: 'Minimale Zeit auf Lager:',
    zh: '最短库存时间:',
    ar: 'الحد الأدنى من الوقت في الأوراق المالية:',
  },
  'Maximum time in stock:': {
    ru: 'Максимальное время в запасе:',
    es: 'Tiempo máximo en stock:',
    fr: 'Temps maximum en stock:',
    de: 'Maximale Lagerzeit:',
    zh: '最长库存时间:',
    ar: 'الحد الأقصى للوقت في المخزون:',
  },
};

const HOURS_STRINGS = {
  zero: { ru: 'часов', en: 'hours', es: 'horas', fr: 'heures', de: 'Stunde', zh: '小时', ar: 'ساعة' },
  one: { ru: 'час', en: 'hour', es: 'hora', fr: 'heure', de: 'Stunde', zh: '小时', ar: 'ساعة' },
  two: { ru: 'часа', en: 'hours', es: 'horas', fr: 'heures', de: 'Stunden', zh: '小时', ar: 'ساعة' },
  few: { ru: 'часа', en: 'hours', es: 'horas', fr: 'heures', de: 'Stunden', zh: '小时', ar: 'ساعات' },
  other: { ru: 'часов', en: 'hours', es: 'horas', fr: 'heures', de: 'Stunden', zh: '小时', ar: 'ساعات' },
  many: { ru: 'часов', en: 'hours', es: 'horas', fr: 'heures', de: 'Stunden', zh: '小时', ar: 'ساعات' },
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

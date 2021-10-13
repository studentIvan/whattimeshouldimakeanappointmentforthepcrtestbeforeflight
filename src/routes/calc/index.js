import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { createTranslateComponent, createLocalizedHoursComponent,
  createLocalizedDatetimeComponent, translate, langIsNotFound } from '../../common/translations';
import extendDatePrototype from '../../common/extend-date-prototype';
import DatetimeLocalInput from '../../components/datetime-local';
import Header from '../../components/header';
import style from './style.css';

const Calc = (props) => {
  extendDatePrototype();

  const [arrivalCountry, setArrivalCountry] = useState('Turkey');

  useEffect(() => {
    if (!langIsNotFound(props)) {
      document.documentElement.lang = props.lang;
      document.title = translate('PCR Time Calculator - what time should I make an appointment for the pcr test before flight?', props.lang);
      document.head.querySelector('meta[name="description"]').content =
        translate('When PCR test or what time you need to take a PCR analysis for a trip abroad, 72 hours before departure', props.lang);
      document.head.querySelector('meta[name="keywords"]').content =
        translate('pcr, 72hours, 72, analysis, test, coronavirus, covid-19, time, date, flight, departure, calculate', props.lang);
      document.head.querySelector('link[rel="canonical"]').href =
        `https://whattimeshouldimakeanappointmentforthepcrtestbeforeflight.com/${ props.lang === 'en' ? '' : 'ru/' }`;
    }
    /** @todo provide arrivalCountry into the path or query param */
  });

  /** state values */
  const [flightDate, setFlightDate] = useState(new Date((new Date()).setDate((new Date()).getDate() + 1)).getDatetimeLocalValue());
  const [busyDate, setBusyDate] = useState(new Date((new Date()).setDate((new Date()).getDate() + 1)).getDatetimeLocalValue());
  const [testHoursMin, setTestHoursMin] = useState(24);
  const [testHoursMax, setTestHoursMax] = useState(48);
  const [minBufferHours, setMinBufferHours] = useState(18);
  const [maxBufferHours, setMaxBufferHours] = useState(5);
  const [showExtraSettings, setShowExtraSettings] = useState(false);

  const mode96 = arrivalCountry === 'Maldives';

  const minDatetime = (new Date()).getDatetimeLocalValue();
  const flightDateObj = new Date(flightDate);
  const busyDateObj = new Date(busyDate);
  const endPCRDateObj = flightDateObj.subtractHours(maxBufferHours);
  const bufferHoursShift = endPCRDateObj > busyDateObj ? (-1 * Math.ceil((endPCRDateObj - busyDateObj) / (1000 * 60 * 60))) : 0;

  const Translate = createTranslateComponent(props);
  const LocalizedDatetime = createLocalizedDatetimeComponent(props);
  const LocalizedHours = createLocalizedHoursComponent(props);

  if (langIsNotFound(props)) {
    return (
      <div class={style.home}>
        <h1>Not Found</h1>
        <p>404</p>
      </div>
    );
  }

  console.log(minBufferHours, testHoursMax, minBufferHours + testHoursMax);
  const pcrDateTimeBegin = flightDateObj.subtractHours(minBufferHours + testHoursMax);
  let pcrDateTimeEnd = flightDateObj.subtractHours((maxBufferHours - bufferHoursShift) + testHoursMax);
  const impossibleUnavailableTime = Boolean(pcrDateTimeBegin > pcrDateTimeEnd);
  const minUnavailableDatetime = (flightDateObj ? flightDateObj.subtractHours(mode96 ? 96: 72) : minDatetime);
  if (pcrDateTimeEnd < minUnavailableDatetime) {
    pcrDateTimeEnd = minUnavailableDatetime;
  }

  return (
    <div dir={ props.lang === 'ar' ? 'rtl' : 'ltr' }>
      <Header {...props} />
      <div class={ style.calc }>
        <div class={ style.calcForm }>
          <div class={ style.calcBlock }>
            <Translate component="label" for="flightDate">
              My flight leaves at
            </Translate>
            &nbsp;&nbsp;<span role="img" aria-label="departure icon">🛫</span>
            &nbsp;
            <DatetimeLocalInput
              id="flightDate"
              name="flightDate"
              value={ flightDate }
              min={ minDatetime }
              onChange={ value => { setFlightDate(value); setBusyDate(value); } }
            />
            &nbsp;
            <Translate>to</Translate>
            &nbsp;
            <select name="arrivalCountry" value={ arrivalCountry } onChange={ event => setArrivalCountry(event.target.value) }>
              <Translate component="option" value="Turkey">
                Turkey
              </Translate>
              <Translate component="option" value="UAE">
                UAE
              </Translate>
              <Translate component="option" value="Maldives">
                Maldives
              </Translate>
              <Translate component="option" value="other">
                other country
              </Translate>
            </select>
          </div>
          <div class={ style.calcBlock }>
            <Translate component="label" for="busyDate">
              Also, I will be unavailable since
            </Translate>
            &nbsp;
            <DatetimeLocalInput
              name="busyDate"
              id="busyDate"
              value={ busyDate }
              min={ minUnavailableDatetime }
              max={ flightDate }
              onChange={ value => setBusyDate(value) }
            />
          </div>
          <div class={ style.calcBlock }>
            <input
              type="checkbox"
              id="showExtraSettings"
              name="showExtraSettings"
              checked={ showExtraSettings }
              onChange={ event => setShowExtraSettings(event.target.checked) }
            />
            <Translate component="label" for="showExtraSettings">
              show formula settings
            </Translate>
          </div>
          { showExtraSettings && (
            <div class={ style.extraSettings }>
              <div>
                <Translate component="label" for="testHoursMin">
                  Expected time to receive the PCR test result:
                </Translate>
                <input
                  type="range"
                  name="testHoursMin"
                  min="6"
                  max="48"
                  step="1"
                  value={ testHoursMin }
                  onChange={ event => setTestHoursMin(+event.target.value) }
                />
                <LocalizedHours hours={ testHoursMin } for="testHoursMin" />
              </div>
              <div>
                <Translate component="label" for="testHoursMax">
                  Maximum time to get the PCR test result:
                </Translate>
                <input
                  type="range"
                  name="testHoursMax"
                  min="24"
                  max="48"
                  step="1"
                  value={ testHoursMax }
                  onChange={ event => setTestHoursMax(+event.target.value) }
                />
                <LocalizedHours hours={ testHoursMax } for="testHoursMax" />
              </div>
              <div>
                <Translate component="label" for="minBufferHours">
                  Minimum time in stock:
                </Translate>
                <input
                  type="range"
                  name="minBufferHours"
                  min="2"
                  max="40"
                  step="1"
                  value={ minBufferHours }
                  onChange={ (event) => {
                    setMinBufferHours(+event.target.value);
                    if (maxBufferHours >= event.target.value) {
                      setMaxBufferHours(+event.target.value - 1);
                    }
                  } }
                />
                <LocalizedHours hours={ minBufferHours } for="minBufferHours" />
              </div>
              <div>
                <Translate component="label" for="maxBufferHours">
                  Maximum time in stock:
                </Translate>
                <input
                  type="range"
                  name="maxBufferHours"
                  min="1"
                  max={ minBufferHours }
                  step="1"
                  value={ maxBufferHours }
                  onChange={ event => setMaxBufferHours(+event.target.value) }
                />
                <LocalizedHours hours={ maxBufferHours } for="maxBufferHours" />
              </div>
            </div>) }
        </div>
        <div style={{ maxWidth: 700 }}>
          { !mode96 && <div class={ style.heroResult }>
            <Translate>
              72 hours before departure is
            </Translate>&nbsp;
            <LocalizedDatetime dateTime={ flightDateObj.subtractHours(72) } />
          </div> }
          { mode96 && <div class={ style.heroResult }>
            <Translate>
              96 hours before departure is
            </Translate>&nbsp;
            <LocalizedDatetime dateTime={ flightDateObj.subtractHours(96) } />
          </div> }
          { arrivalCountry === 'Turkey' && <div>
            <Translate component="div">
              <a href="https://register.health.gov.tr" target="_blank" rel="noopener noreferrer">The form for entry to Turkey</a>
              (for the private HES code receiving) must be completed after the above date/time (72 hours before departure).
            </Translate>
          </div> }
          { arrivalCountry === 'Maldives' && <div style={{ fontSize: 15, marginTop: 10 }}>
            <Translate component="div">
              <a href="https://imuga.immigration.gov.mv/ethd/create" target="_blank" rel="noopener noreferrer">The Traveller Health Declaration for entry to Maldives</a>
              (for the private QR code receiving) must be completed within 24 hours prior departure to Maldives.
            </Translate>
            <Translate component="div">Beginning with date/time:</Translate>
            <LocalizedDatetime dateTime={ flightDateObj.subtractHours(24) } />
            <Translate component="div">and before the start of the boarding</Translate>
            <Translate component="div">
              Save the image to your phone, or print it out. Also, do not forget to fill this declaration again before the return flight.
            </Translate>
            <Translate component="div">
              If you use iPad or iPhone and you take a photo directly from this form, go to Settings - Camera - formats and select "most compatible".
            </Translate>
            { props.lang === 'ru' && <div>
              <a href="https://telegra.ph/Kak-zapolnyat-deklaraciyu-zdorovya-na-Maldivah-Rossiyanam-10-13" target="_blank" rel="noopener noreferrer">
                Подробная инструкция для Россиян, как заполнять форму.
              </a>
            </div> }
          </div> }
          { arrivalCountry === 'UAE' && <div style={{ marginTop: 20 }}>
            <Translate component="div">
              The negative COVID-19 PCR test result must be presented in printed certificate format by the traveller on arrival. The certificate must be in English or Arabic only. Handwritten certificates will not be accepted.
            </Translate>
          </div> }
          { arrivalCountry === 'UAE' && <div style={{ marginTop: 10 }}>
            <Translate component="div">
              <a href="https://u.ae/en/information-and-services/justice-safety-and-the-law/handling-the-covid-19-outbreak/travelling-amid-covid-19/travelling-to-the-uae" target="_blank" rel="noopener noreferrer">Check the UAE information site</a>
              to get the latest information.
            </Translate>
          </div> }
          { arrivalCountry === 'UAE' && <div style={{ marginTop: 10, marginBottom: 20 }}>
            <Translate component="div">
              UAE airports can have their own additional restrictions. E.g. 72 hours test validity against 96 allowed by government.
              <a href="https://www.dubaiairports.ae/alert/latest-covid-19-update-" target="_blank" rel="noopener noreferrer">Check the Dubai Airports site</a>
              for example.
            </Translate>
          </div> }
          { impossibleUnavailableTime ? (
            <div class={ style.heroResult } style={{ marginTop: 20, marginBottom: 20 }}>
              <Translate component="div">
                Check everything carefully - at the specified time, you risk not having time to get the test results!
              </Translate>
              <Translate component="div">
                It is necessary to make an appointment for the PCR test in the interval:
              </Translate>
              <LocalizedDatetime dateTime={ pcrDateTimeEnd } />
              &nbsp;&minus;&nbsp;
              <LocalizedDatetime dateTime={ pcrDateTimeBegin } />
            </div>
          ) : (
            <div class={ style.heroResult } style={{ marginTop: 20, marginBottom: 20 }}>
              <Translate component="div">
                It is necessary to make an appointment for the PCR test in the interval:
              </Translate>
              <LocalizedDatetime dateTime={ pcrDateTimeBegin } />
              &nbsp;&minus;&nbsp;
              <LocalizedDatetime dateTime={ pcrDateTimeEnd } />
            </div>
          ) }
          <Translate component="p">
            The result of the PCR test must be in English and contain the number of your passport (ID). Do not perform a PCR test on the domestic passport (if applicable).
          </Translate>
          <Translate component="p">
            The result of the PCR test can be shown on departure in electronic form, if there is a QR code that can be used to check this test.
          </Translate>
          <Translate component="p">
            If there is no QR code the result should be on paper with a "live" stamp of the clinic.
          </Translate>
          <p class={ style.small }>
            <Translate>
              This site helps you calculate when PCR test or what date time you need to take a PCR analysis for a trip abroad, 72 hours before departure.
            </Translate>&nbsp;
            <Translate>
              The information provided on this site is for informational purposes only, based on personal speculation.
            </Translate>
          </p>
        </div>
      </div>
      <Translate component="footer">
        <span>Do a bookmark! Developed for fun by Ivan Maslov</span>
        { props.lang === 'ru' && !showExtraSettings ? <a href="https://t.me/joinchat/WQZ3VS1X2D_gIZk4" class={ style.telegram } target="_blank" rel="noopener noreferrer">
          Подпишитесь на мой telegram канал
        </a> : '' }
        { props.lang === 'zh' ? <a href="https://t.me/tmzhang91" class={ style.telegram } target="_blank" rel="noopener noreferrer">感谢@tmzhang91</a> : '' }
        { props.lang === 'zh' ? <span>博士生在俄罗斯母亲的帮助翻译成中文。</span> : '' }
      </Translate>
    </div>
  );
};

export default Calc;

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
  });

  /** state values */
  const [flightDate, setFlightDate] = useState(new Date((new Date()).setDate((new Date()).getDate() + 1)).getDatetimeLocalValue());
  const [busyDate, setBusyDate] = useState(new Date((new Date()).setDate((new Date()).getDate() + 1)).getDatetimeLocalValue());
  const [testHoursMin, setTestHoursMin] = useState(24);
  const [testHoursMax, setTestHoursMax] = useState(48);
  const [minBufferHours, setMinBufferHours] = useState(18);
  const [maxBufferHours, setMaxBufferHours] = useState(5);
  const [arrivalCountry, setArrivalCountry] = useState('Turkey');
  const [showExtraSettings, setShowExtraSettings] = useState(false);

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

  return (
    <div>
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
              min={ minDatetime }
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
                  max="20"
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
          <div class={ style.heroResult }>
            <Translate>
              72 hours before departure is
            </Translate>&nbsp;
            <LocalizedDatetime dateTime={ flightDateObj.subtractHours(72) } />
          </div>
          { arrivalCountry === 'Turkey' && <div>
            <Translate component="div">
              <a href="https://register.health.gov.tr" target="_blank" rel="noopener noreferrer">The form for entry to Turkey</a>
              (for the private HES code receiving) must be completed after the above date/time (72 hours before departure).
            </Translate>
          </div>}
          <div class={ style.heroResult } style={{ marginTop: 20, marginBottom: 20 }}>
            <Translate component="div">
              It is necessary to make an appointment for the PCR test in the interval:
            </Translate>
            <LocalizedDatetime dateTime={ flightDateObj.subtractHours(minBufferHours + testHoursMax) } />
            &nbsp;&minus;&nbsp;
            <LocalizedDatetime dateTime={ flightDateObj.subtractHours((maxBufferHours - bufferHoursShift) + testHoursMax) } />
          </div>
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
        { props.lang === 'ru' ? <a href="https://t.me/joinchat/WQZ3VS1X2D_gIZk4" class={ style.telegram } target="_blank" rel="noopener noreferrer">
          Подпишитесь на мой telegram канал
        </a> : '' }
      </Translate>
    </div>
  );
};

export default Calc;

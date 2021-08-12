import { h } from 'preact';
import { route } from 'preact-router';
import { Link } from 'preact-router/match';
import { createTranslateComponent, SUPPORTED_LOCALES } from '../../common/translations';
import style from './style.css';

const Header = (props) => {
  const Translate = createTranslateComponent(props);
  return (
    <header class={ style.header }>
      <div class={ style.mobileHeader }>PCR Time Calculator</div>
      <Translate component="h1">What time should I make an appointment for the pcr test before flight?</Translate>
      <select
        class={ style.langChoose }
        onChange={ ({ target: { value }}) => {
          route(`/${ value === 'en' ? '' : `${ value }/` }`)
        } }
      >
        { SUPPORTED_LOCALES.map(locale =>
          <option selected={ locale.code === props.lang } value={ locale.code }>{ locale.label }</option>)}
      </select>
      <nav style={{ display: 'none' }}>
        { SUPPORTED_LOCALES.map(locale =>
          <Link activeClassName={ style.active } href={ `/${ locale.code === 'en' ? '' : `${ locale.code }/` }` }>{ locale.label }</Link>)}
      </nav>
    </header>
  );
}

export default Header;

import { h } from 'preact';
import { Link } from 'preact-router/match';
import { createTranslateComponent } from '../../common/translations';
import style from './style.css';

const Header = (props) => {
  const Translate = createTranslateComponent(props);
  return (
    <header class={ style.header }>
      <div class={ style.mobileHeader }>PCR Time Calculator</div>
      <Translate component="h1">What time should I make an appointment for the pcr test before flight?</Translate>
      <nav>
        <Link activeClassName={ style.active } href="/">English</Link>
        <Link activeClassName={ style.active } href="/ru/">Русский</Link>
      </nav>
    </header>
  );
}

export default Header;

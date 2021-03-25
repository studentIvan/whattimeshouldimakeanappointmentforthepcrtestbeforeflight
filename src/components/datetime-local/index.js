const DatetimeLocalInput = ({ onChange, ...props}) => (
  <input
    type="datetime-local"
    pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
    onChange={ event => onChange(event.target.value) }
    step="60"
    { ...props }
  />
);

export default DatetimeLocalInput;

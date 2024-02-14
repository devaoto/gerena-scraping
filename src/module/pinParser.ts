export function parsePin(pin: string) {
  const splittedPin = pin.split('-');

  return {
    pinOne: splittedPin[0],
    pinTwo: splittedPin[1],
    pinThree: splittedPin[2],
    pinFour: splittedPin[3],
  };
}

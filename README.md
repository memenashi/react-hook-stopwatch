# React Stopwatch Hook

React Stopwatch Hook is a customizable stopwatch component that can be easily integrated into your React projects. This hook provides the functionality of a stopwatch, including starting, pausing, resetting, and retrieving elapsed time.

This hook uses localStorage internally, which means that the stopwatch data will persist even if the user closes the page or refreshes it.

## Installation

To use this hook, you can install it from npm:

```
npm install react-hook-stopwatch
```

or 

```
yarn add react-hook-stopwatch
```


## Usage

To use the `useStopwatch` hook, you can import it into your React component and call it as shown below:

```jsx
import React from 'react';
import { useStopwatch } from 'react-stopwatch-hook';

function Stopwatch() {
  const { interval, operations } = useStopwatch();

  return (
    <div>
      <h1>
        {interval.hours}:{interval.minutes}:{interval.seconds}:{interval.milliseconds}
      </h1>
      <button onClick={operations.start}>Start</button>
      <button onClick={operations.stop}>Stop</button>
      <button onClick={operations.reset}>Reset</button>
      <button onClick={operations.resume}>Resume</button>
    </div>
  );
}

export default Stopwatch;
```

## Props

The `useStopwatch` hook can accept an optional `option` parameter of type `StopwatchOption`, which is an object that can be used to customize the behavior of the stopwatch. The default options are set in `defaultStateDateOption`.

## Returns

The `useStopwatch` hook returns an object that contains the following properties:

- `startAt`: The date and time when the stopwatch was started.
- `interval`: The current elapsed time of the stopwatch in hours, minutes, seconds, and milliseconds.
- `operations`: An object containing functions to control the stopwatch, including `start`, `stop`, `reset`, and `resume`.

## License

MIT

## Contact

Twitter:[@memenashi](https://twitter.com/memenashi)
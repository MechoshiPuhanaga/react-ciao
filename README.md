# React scroller component

Used to add css classes to its children while they are entering or exiting the DOM.

## React version

- Uses the new lifecycle methods introduced in `React 16.3`

## Install

```
yarn add react-ciao
```

```
npm install react-ciao
```

## Import

```
import Ciao from 'react-ciao';
```

```
import {Ciao} from 'react-ciao';
```

## Usage

### Ciao takes the following props

| Property     |  Type  | Required | Usage                                                                                                                                                                                                                                                                      | Default |
| ------------ | :----: | :------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------: |
| enterClass   | string |   true   | This class will be added to the wrapped component when it enters the DOM                                                                                                                                                                                                   |       - |
| exitClass    | string |   true   | This class will be added to the wrapped component before it exits the DOM                                                                                                                                                                                                  |       - |
| exitDuration | number |   true   | In milliseconds. Should match or be less than the sum of the animation duration and animation delay defined in the css file in the corresponding exitClass. If this duration is greater, then the wrapped content will stay rendered for a moment equal to the difference. |       - |

- NB: In case the children are components/functional components they must accept the className prop in order to get the above classes.

### Wrap content and add the `props`

```
<Ciao {...props}> content </Ciao>
```

## Browser Support

- Chrome, Edge, Firefox, IE11, Safari. Tested on mobile devices too.

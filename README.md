# creatella-react-components

[![NPM](https://img.shields.io/npm/v/creatella-react-components.svg)](https://www.npmjs.com/package/creatella-react-components) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
yarn add creatella-react-components

/*
 * Peer Dependencies
 */
yarn add node-sass
yarn add react
yarn add react-dom
// Button
yarn add react-router-dom
// Alerts, Checkbox, Avatar
yarn add @fortawesome/fontawesome-svg-core
yarn add @fortawesome/free-solid-svg-icons
yarn add @fortawesome/react-fontawesome
// Alerts
yarn add date-fns
```

## Usage

```jsx
import React, { Component } from 'react';
import Button from 'creatella-react-components/lib/Button';

// import only once
import 'creatella-react-components/lib/styles.scss';

class Example extends Component {
    render () {
        return (
            <Button isDisabled={true}>
                Press
            </Button>
        );
    }
}
```

## Configure custom styling

###### 1) see `./src/styles/styles.scss`
- `@import '_vars';`          Variables
- `@import '_normalize';`     Some normalization
- `@import '_mixins';`        Mixins
- `@import '_global';`        Global use classes & ids
- `@import '_components';`    Override / extend component styles

```scss
// _vars.scss
$color-green: #35D367;

// _components.scss
.Button {
    &--solid-green {
        width: 150px;
        height: 50px;
        background-color: $color-green;
    }
}
```

###### 2) create `config/style.js`
```js
// Pre-defined button styles classes
export const BUTTON_CLASSNAMES = {
    SOLID_GREEN: 'Button--solid-green'
};
```

###### 3) In app usage
```jsx
import Button from 'lib/Button';
import { BUTTON_CLASSNAMES } from 'config/style';

<Button className={BUTTON_CLASSNAMES.SOLID_GREEN} />
```

## Components

###### `<Button />`
```jsx
import Button from 'lib/Button';

<Button
    className=''
    classNameLink=''
    classNameDisabled=''
    classNameProcessing=''
    classNameActivityIndicator=''
    label=''                        // ! Only without children
    route=''                        // ! Uses "react-router-dom" <Link to={route} />
    routeProps={}                   // [Object]
    onClick={}                      // [Func]
    isDisabled={false}              // [Bool] default: false
    isProcessing={false}            // [Bool] default: false
    debounceTime={500}              // [Number] default: 500 (ms)
    sizeActivityIndicator={20}      // [Number] default: 20
/>
```

###### `<ActivityIndicator />`
```jsx
import ActivityIndicator from 'lib/ActivityIndicator';

<ActivityIndicator
    className=''
    classNameInfo=''
    size={24}           // [Number] default: 24
    info=''             // [String]
/>
```

###### `<Checkbox />`
```jsx
import Checkbox from 'lib/Checkbox';

<Checkbox
    className=''
    isChecked={}    // [Bool] !required
    onChange={}     // [Func] !required
    label=''        // [String] ! Only without children
    value={}>       // [Any] will be passed as second argument to onChange
    <div />         // [Any]
</Checkbox>
```

###### `<OutsideClick />`
```jsx
import OutsideClick from 'lib/OutsideClick';

<OutsideClick
    onOutsideClick={}   // [Func] !required
    event='mousedown'>  // [String] default: 'mousedown'
    <div />             // [Any] !required
</OutsideClick>
```

###### `<ItemPicker />`
```jsx
import ItemPicker from 'lib/ItemPicker';

<ItemPicker
    className=''
    isVisible={}                    // [Bool] !required
    onChange={}                     // [Func] !required
    onClose={}                      // [Func]
    items={}                        // [Array]
    itemsNameKey='name'             // [String] default: 'name'
    value={}                        // [Number | Array]
    maxSelections={}                // [Number] default: null
    minSelections={0}               // [Number] default: 0
    renderItemContent={}            // [Func]
    searchRenderItemTreshold={8}    // [Number] default: 8
    emptyText='No items yet'        // [String] default: 'No items yet'
    emptySearchText='No matches'    // [String] default: 'No matches'
    searchPlaceholderText='Search..'// [String] default: 'Search..'
/>
```

###### `<Alerts />`
:exclamation: Use with redux `lib/ReduxReducers/alerts/alerts.js`
```jsx
import Alerts, { ALERTS_POSITION } from 'lib/Alerts';

<Alerts
    position={ALERTS_POSITION.BOTTOM_LEFT}  // One of {ALERTS_POSITION} !required
    onDismiss={}                            // pass redux function {dismissAlert} !required
    alerts={}                               // pass redux store {alerts} !required
/>
```

###### `<Avatar />`
```jsx
import Avatar from 'lib/Avatar';

<Avatar
    className=''
    src={}          // [String]
    icon={}         // [Object] FontAwesome Icon
/>
```

## Higher-Order Components

###### `withAsyncCaller()`
```js
import { withAsyncCaller } from 'lib/HOCs/withAsyncCaller';

export default withAsyncCaller(MyComponent);

// if faster unmount behaviour is needed on the HOC
onUnmount();
// instead of setState you can use setOwnProps
setOwnProps({ data: [] })
// usable with async/await, the last arg will always be a Axios CancelToken
apiCaller(async/promise function, arg1, arg2, arg3, ...)
// same as apiCaller without cancel token
asyncCaller()
// usable with props only, the last arg will always be a Axios CancelToken
asyncCallerProps({
    api,                // [Func] !required
    responseKey,        // [String]
    responseDataKey,    // [String]
    loadingKey,         // [String]
    onSuccess,          // [Func]
    onError,            // [Func]
}, arg1, arg2, arg3, ...)    
// same as apiCaller without cancel token
apiCallerProps()

// For custom cancellation handling
// NOTE: pass false, if you don't want the HOC to auto cancel the request on unmount
// NOTE: Don't use with apiCaller / apiCallerProps
generateCancelToken()
```

###### `withThrottledChange()`
```js
import { withThrottledChange } from 'lib/HOCs/withThrottledChange';

// Default throttle: 150ms
export default withThrottledChange(MyComponent, 150);

// onChangeThrottled(
    value,      // [Any]
    callback,   // [Func] !isRequired
    throttle    // [Number] default: see above
);
```

###### `withWindowResizeListener()`
```js
import { withAsyncCaller } from 'lib/HOCs/withAsyncCaller';

// Default delay: 100ms
export default withAsyncCaller(MyComponent, 100);

// props
windowWidth     // window.innerWidth
windowHeight    // window.innerHeight
```

## License

MIT © [SchwSimon](https://github.com/SchwSimon)

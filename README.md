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
// ItemPicker, ItemPickerView
yarn add fuse.js
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
- `@import '_variables';`       Variables
- `@import '_normalize';`     Some normalization
- `@import '_mixins';`        Mixins
- `@import '_global';`        Global use classes & ids
- `@import '_components';`    Override / extend component styles

```scss
// _variables.scss
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

<Button                         // ! Additional props will be passed to the main container
    className                   // [String]
    classNameLink               // [String]
    classNameDisabled           // [String]
    classNameProcessing         // [String]
    classNameActivityIndicator  // [String]
    label                       // [String] ! Only without children
    route                       // [String] ! Uses "react-router-dom" <Link to={route} />
    routeProps                  // [Object]
    onClick                     // [Func]
    isDisabled                  // [Bool] default: false
    isProcessing                // [Bool] default: false
    debounceTime                // [Number] default: 500 (ms)
    sizeActivityIndicator       // [Number] default: 20
/>
```

###### `<ActivityIndicator />`
```jsx
import ActivityIndicator from 'lib/ActivityIndicator';

<ActivityIndicator
    className       // [String]
    classNameInfo   // [String]
    size            // [Number] default: 24
    info            // [String]
/>
```

###### `<Checkbox />`
```jsx
import Checkbox from 'lib/Checkbox';

<Checkbox
    className   // [String]
    isChecked   // [Bool] !required
    onChange    // [Func] !required
    label       // [String] ! Only without children
    value>      // [Any] will be passed as second argument to onChange
    <div />     // [Any]
</Checkbox>
```

###### `<OutsideClick />`
```jsx
import OutsideClick from 'lib/OutsideClick';

<OutsideClick       // ! Additional props will be passed to the main container
    onOutsideClick  // [Func] !required
    event>          // [String] default: 'mousedown'
    <div />         // [Any] !required
</OutsideClick>
```

###### `<ItemPickerView />` & `<ItemPicker />`
:exclamation: By default, <ItemPicker /> is implemented in <ItemPickerView />
To turn it off, pass `isItemPicker={false}`
IF enabled, it takes all available props from <ItemPicker />, except:
`isVisible`, `onClose` & `className` (use `classNameItemPicker` instead)
```jsx
import ItemPickerView from 'lib/ItemPickerView';

<ItemPickerView
    className                   // [String]
    isProcessing                // [Bool] default: false
    onChange                    // [Func] !required
    value                       // [Number | Array]
    maxSelections               // [Number] default: null
    minSelections               // [Number] default: 0
    items                       // [Array] !required
    itemsNameKey                // [String] default: 'name'
    itemsSearchConfig           // [Object] default: null see: https://fusejs.io
    renderItemContent           // [Func] default: null

    isItemPicker                // [Bool] default: true
    isToggle                    // [Bool] default: true
    isInput                     // [Bool] default: false
    classNameItemPicker         // [String]
    childrenLeft                // [Any] default: null
    childrenRight               // [Any] default: null
    placeholder                 // [String] default: ''
    placeholderInput            // [String] default: ''
    onChangeInput               // [Func] default: null
/>
```

###### `<ItemPicker />`
```jsx
import ItemPicker from 'lib/ItemPicker';

<ItemPicker
    className                   // [String]
    isProcessing                // [Bool] default: false
    onChange                    // [Func] !required
    value                       // [Number | Array]
    maxSelections               // [Number] default: null
    minSelections               // [Number] default: 0
    items                       // [Array] !required
    itemsNameKey                // [String] default: 'name'
    itemsSearchConfig           // [Object] default: null see: https://fusejs.io
    renderItemContent           // [Func] default: null

    searchRenderItemTreshold    // [Number] default: 8
    isVisible                   // [Bool] !required
    onClose                     // [Func] !required
    emptyText                   // [String] default: 'No items yet'
    emptySearchText             // [String] default: 'No matches'
    searchPlaceholderText       // [String] default: 'Search..'
    outsideClickEvent           // [String] default: 'click' ! Uses <OutsideClick />
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

onChangeThrottled(
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

## Utils

###### `ellipsisString()`
```js
import { ellipsisString } from 'lib/utils/ellipsisString';

ellipsisString(
    string,     // [String] !isRequired
    maxLength,  // [Number] !isRequired
    appendix    // [String] default: '...'
);
```

###### `deepCopyObject()`
```js
import { deepCopyObject } from 'lib/utils/deepCopyObject';

deepCopyObject(object);  // [Object] !isRequired
```

###### `castArray()`
```js
import { castArray } from 'lib/utils/castArray';

castArray() // [Any]
```


## License

MIT © [SchwSimon](https://github.com/SchwSimon)

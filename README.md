# Sticky 

让你的组件具有粘性
## 概览 & 实例

`Sticky`的目标是让各位开发者更容易构建出充满粘性的UI组件，一些例子里会有粘性的导航栏，或者双列布局中左侧粘性右侧滚动。
`Stikcy` 的原理是通过计算与`<StickyContainer>`组件相对应的`<Sticky>`的位置来产生粘性，如果这个位置会超出可见范围，它会同通过 renderCallback的形式以styles作为一个参数，让元素粘在屏幕的顶部。

```js
<StickyContainer>
  <Sticky>{({ style }) => <h1 style={style}>Sticky element</h1>}</Sticky>
</StickyContainer>
```
主要的使用方式只需要通过style传递给DOM，还是还是提供了一些额外的属性用于更高级的用例：
## render 入参
* `style` _(object)_ - 可选修改Style的参数，大部分场景下只需要这个属性.
* `isSticky` _(boolean)_ - 是否当前元素需要具有粘性
* `wasSticky` _(boolean)_ - 是否当前元素需要曾经具有粘性?
* `distanceFromTop` _(number)_ -  `Sticky` 的顶部距离 `StickyContainer`'的顶部距离，单位像素px
* `distanceFromBottom` _(number)_ - `Sticky` 的底部距离 `StickyContainer`'的底部距离，单位像素px
* `calculatedHeight` _(number)_ - renderProps所返回的元素的高度

在`StickyContainer`事件触发的时候，`Sticky`的子节点函数会被调用，并且通过你自己的逻辑跟定制发挥作用，伴随这一个聪明的style属性帮助你快速开发。
### 完整实例

Here's an example of all of those pieces together:
这里是一个完整的例子，包含了所有组成。
app.js

```js
import React from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
// ...

class App extends React.Component {
  render() {
    return (
      <StickyContainer>
        {/* Other elements can be in between `StickyContainer` and `Sticky`,
        but certain styles can break the positioning logic used. */}
        <Sticky>
          {({
            style,

            // the following are also available but unused in this example
            isSticky,
            wasSticky,
            distanceFromTop,
            distanceFromBottom,
            calculatedHeight
          }) => (
            <header style={style}>
              {/* ... */}
            </header>
          )}
        </Sticky>
        {/* ... */}
      </StickyContainer>
    );
  },
};
```
当粘性被激活的时候，传递给sticky的函数参数也会变化，与之相对应的，粘性被关闭时也会变化。

### `<StickyContainer />` Props

`<StickyContainer />` 支持所有有效的 `<div />` props.

### `<Sticky />` Props

#### relative _(default: false)_
当`<StickyContainer />`会滚动overflow时，所包含的`<Sticky />`元素应该设定`relative`为`true`，并且你希望对应`<Sticky />`只会对这个container的事件做出反应。

在`relative`模式中，`window`的事件不会触发粘性的状态改变，只有在对应的container的滚动事件会触发粘性状态的改变。

#### topOffset _(default: 0)_

当对应的Sticky组件顶部跟对应`<StickyContainer />`的顶部的距离等于`topOffet`时，sticky的状态被激活。正整数是一个懒激活状态，而负数更符合直觉。

app.js

```js
<StickyContainer>
  ...
  <Sticky topOffset={80}>
    { props => (...) }
  </Sticky>
  ...
</StickyContainer>
```
上述例子会在`Sticky`组件的顶部***超出***`<StickyContainer />`80px时候触发粘性状态。

#### bottomOffset _(default: 0)_

当元素的底部距离最近的`<StickyContainer />`的底部等于`bottomOffset`时，粘性会被激活。
app.js

```js
<StickyContainer>
  ...
  <Sticky bottomOffset={80}>
    { props => (...) }
  </Sticky>
  ...
</StickyContainer>
```

The above would result in an element that ceases to be sticky once its bottom is 80px away from the bottom of the `<StickyContainer />`.

#### disableCompensation _(default: false)_

Set `disableCompensation` to `true` 
如果你不希望你的sticky组件通过添加一个padding到Placeholder来避免切换`position:fixed`的跳动，设置为true

app.js

```js
<StickyContainer>
  ...
  <Sticky disableCompensation>
    { props => (...) }
  </Sticky>
  ...
</StickyContainer>
```

#### disableHardwareAcceleration _(default: false)_

当`disableHardwareAcceleration`被设定为true时，对应`<Sticky />`元素不会使用硬件加速`transfrom: translateZ(0)`，因为它会在移动端体验上的副作用，不推荐开启这项功能，通常能够通过优化DOM结构解决。

app.js

```js
<StickyContainer>
  ...
  <Sticky disableHardwareAcceleration>
    { props => (...) }
  </Sticky>
  ...
</StickyContainer>
```

# Hooks 钩子
## useSticky

订阅最近的StickyContainer的事件
- scroll
- wheel
- touchmove/touchstart/touchend
- pageshow
- load

sticky钩子函数，用于监听最近的一个StickContainer的事件，回调函数参数与上述传参一致

### Demo

```typescript

const VolunteerNav: React.FC = () => {
    const [isSticky, setIsSticky] = useState(false)

    const handleContainerEvent = useCallback(({ eventSource }) => {
        if (eventSource === document.body) return;
        setIsSticky(eventSource.scrollTop >= (228 - 88))
    }, [isSticky])

    useSticky(handleContainerEvent)
    const text = useMemo(() => isSticky ? '义诊' : '', [isSticky])
    const classname = useMemo(() => mergeStr({ 'my-department__nav': true, 'is-sticky': isSticky }), [isSticky])
    return <div className={classname}>
        <Nav border={false} goBack={webviewGoBack} >
            {text}
        </Nav>
    </div >
}
```

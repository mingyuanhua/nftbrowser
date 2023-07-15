package.json records the important dependencies.

package-lock.json records the entire trees of all dependencies after npm install. Give to npm to look, tells the info for deployment or other contributors. 'lock' means locking the versions of dependencies. '^' sign means >= this version but compatible.

index.js is the react initialization code.

App.js is the most foundamental component.

node_modules are the dependency js codes.

Images in public folder are not expected to be used.

After npm run build,
index.html is a compressed version, including js and css that not showed in the index.html in the public folder

js file compressed that each var name is only one letter.

1. Describe the Component Tree
   APP --> NftCard --> ContractNfts
   --> ContractTrades

2. Describe the dataflow
   Use props

3. Describe how to get NFT data
   Moralis API

Component return 的 JSX 就是 virtual DOM，用 babel build 完
JSX -> babel -> React.CreateElement() -> VDOM(object)

Component --> VDOM1 diff
--> VDOM2 ---> DOM update
render

props vs state
props: component 之间传参的入口，每个 component 就是一个函数；它是 read only 的 不能写 props.a 也不能复制
state: 也是 read only，如果要修改只能用对应的 setter 函数来改；每个 component 自己维护的像数据源一样的东西，它是 stateful 的，属于这个 component 的某种数据，这个数据的改变会引发 rerender，让页面重新渲染一遍，可以作为一个 state

React Component Life Cycle
按照时间，任何 component 一定是先 mounting，然后 updating，再 unmounting
有些 component 还会一直循环，例如 Ant design 上的 Modal Component

const 不能重赋值 let 是 block scope

Callback 函数：把一个函数传给另一个函数 例如 handleSearch 传递给了 Button 的 onclick props

block vs inline element 是根据 display 这个属性决定的

redux 状态管理机 多且复杂 或者 c3 和 s2 减轻了复杂度 抽离了 React 里面最复杂的部分
这样每个 Component 只 focus 在 JSX 里面

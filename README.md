# 入门vue时做的第一个小demo
+ 由于主要目标是为了熟悉vue框架的运用，页面和样式方面较简陋，求轻喷...

## 可能还存在许多方面的不足，希望大佬们多多包涵，同时我也会不断学习，加以改进

## 主要涉及页面：
1. 首页（非常简略） `pages/index.js`
2. 电影列表页面 `pages/moviePage.js`
3. 登录页面 `pages/login.js`
4. 电影详情页面（对应列表中的电影，略简陋） `pages/movieDetail.js`

## index.js
+ 仅负责启动vue和启动时的配置，所有界面交给组件app来渲染
+ 配置包括导入app子组件 `import App from "./app.js"`
+ 导入路由组件 `import router from "./router.js"`
+ 导入仓储组件 `import store from "./store/index.js"`
+ 将路由对象`router`与仓储对象`store`挂载到vue实例中
+ 在配置模板`template`中使用子组件`App`

## app.js
+ 根组件，整个页面的内容靠该组件完成
+ 配置模板中主要有顶部子组件`Header`和路由匹配到的组件渲染位置`router-view`

## router.js
+ 导入各组件的js文件
+ 新建一个路由对象，并默认导出
+ 配置各页面的路径

## 设置页码子组件
1. 确定 首页 上一页 是否能点击，若当前页是首页，则首页与上一页加上类 `disabled`样式，表示不能点击
2. 下一页与尾页亦是如此
3. 需要父组件传过来的属性值包括：当前页码（默认为1），页容量，数据总量，最多可以显示页码数量
4. 根据上面的属性可计算出：总页数和当前显示的页码数量，放在计算属性`computed`中

## 如何确定当前显示的页码数量
1. 定义一个数组，用以存放显示的所有页码
2. 依赖当前页码数和最多可显示页码数量，计算出显示出来页码中的最小页码数
   `let min=this.value-Math.floor(this.panelNumber/2);`
3. 依赖最小页码数和最多可显示页码数量，计算出显示出来页码中的最大页码数
    `let max=min+this.panelNumber-1;`
4. 将`min`至`max`中的页码数添加到数组中
5. 使用`v-for`指令将数组中的页码渲染出来

## 手动点击修改当前页码事件
1. 由于当前页码是props中的值，父组件需要根据当前页码来改变页面中的内容
2. 为保证单向数据流，不建议子组件自己修改props值，应通过自定义事件，告知父组件修改页码值
    `this.$emit("input",newPage);`

## 电影详情子组件（movie.js）
1. 在模板中编写基础界面
2. 设置属性值data，使用该组件的父组件需要传一个data对象，里面包括电影标题、海报、上映时间等


## 设置电影列表（不包括页码）子组件
1. 使用电影详情子组件`Movie`
2. 使用该组件的父组件需要传一个`movies`数组，里面是一个个电影对象
3. 根据传过来的电影数组，使用`v-for`循环生成一个个电影详情子组件，加载出所有电影列表（未分页）

## 设置电影列表(完整)页面
1. 需要使用的子组件有 `pager`,`movielist`
2. 导入movieService.js文件，以便调用里面的方法 
   `import movieService from "../services/movieService.js"`
3. 在`setMovies`方法中，根据当前页码数和页码容量，调用`movieService`中的`getMovies`方法
   得到一个对象，里面包括页码总数`total`和每页的电影数组`data`
4. 将得到的电影数组赋值给`movies`，属性传值给子组件电影列表，渲染电影列表界面
5. 由于请求数据需要时间，故在`mouted`函数里调用`setMovies`方法

## 同步更新页码与电影列表
1. 当子组件`pager`中的页码发生改变时，会触发自定义事件`input`
2. 父组件中定义`input`事件，执行`handlePageChange`函数，
   将子组件传过来的页码值作为参数，赋值给当前页码`current`，数据改变会重新渲染页面，故页码刷新
3. 此时，电影列表也应跟着页码一同刷新，故调用`setMovies`函数，将更新后的`current`传进去
   得到对应的电影列表

## 蒙层效果（loading.js组件与logining.js组件）
+ 登录和加载页面时，由于是异步请求远程数据，需要一定的等待时间
+ 由于这两个组件是需要时才显示，故都用`v-show`来控制，属性值`flag`需要父组件传(默认为false)
+ 在数据未请求到时，页面显示 登录中 或 加载中，此时`flag=true`
+ 数据请求到后，`flag=false`，蒙层消失

## 电影详情页面
1. 需要使用的子组件有：`Movie` `Load`
2. 同样需要调用`movieService`中的方法，故导入其js文件
3. 通过路由参数得到路径中的id值 `this.$route.params.id`
4. 调用`movieService`中的`getMovie`方法，将id值传过去
5. 根据id值请求得到datas中符合条件的第一项，即对应的一个电影对象
6. 将该对象通过属性传值给子组件，渲染电影详情页面

## 登录页面
1. 输入的账号和密码都用了`v-bind`，实现双向数据绑定
2. 验证账号和密码正确与否，调用`handleLogin`方法
3. 在该方法中，将输入的账号和密码通过dispatch传到store中，验证是否正确
4. 登录成功后，跳转到首页 `this.$router.push("/")`
5. 若登录失败，则弹出警告，并清空账号和密码

## `store/index.js`
1. 新建了一个仓储对象，并默认导出
2. `store`对象里配置了`state`,`mutations`,`acitons`
3. `state`里保存的是用户信息`data`和是否正在登录`isLogining`
4. 当用户信息改变时，需要通过`mutations`里的方法，才能改变`state`里的状态
5. 但`mutations`里的方法不能随便调用，且不建议在里面进行副作用操作（如远程请求）
6. 把副作用操作交给`actions`来完成，并在里面通过`commit('方法名','传入的数据')`
   来调用`mutations`里的方法，进而改变`state`
7. `actions`里的方法需要通过`this.$store.dispatch('方法名','传入的数据')`才能调用
+ 当配置了vuex后，所有的vue实例都会出现一个属性`$store`,用以访问里面的数据

## 如何确定账号密码是否正确？
1. 正确的账号与密码在`loginService`里才能请求到
2. 故在`store/index.js`中导入该js文件，以便调用里面的方法
3. 在`actions`中调用`loginService`的`login`方法，并将`dispatch`传过来的数据作为参数
3. 当登录成功后，会返回一个用户信息对象，里面包括账号和用户名，将该对象保存到`state`中，
   并保存用户信息到本地存储 localStorage
   `localStorage.setItem("loginUser", JSON.stringify(resp));`
4. 当用户点了 退出登录 按钮时，从`state`中删除用户信息，并从本地存储中移除该用户对象
   `localStorage.removeItem("loginUser");`

## 注册全局导航守卫
1. 假设有这样一个需求，只有登录成功后，才能访问电影列表页面
2. 需要在`router.js`中使用全局导航守卫 `router.beforeEach`
3. 在`routes`中设置自定义数据`meta:{ needLogin:true }`,说明需要登录才能访问该组件
4. `router.beforeEach`函数里的第一个参数`to`，是要访问的地址
5. 一旦注册了该守卫，除非在守卫中调用`next`函数，否则不会调转到要访问的地址
6. 如果`$store.state.data`里面有值，说明登录成功，则调用`next()`放行
   否则，`next('/login')`，跳转到登录页面








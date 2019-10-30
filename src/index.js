import App from "./app.js"
import router from "./router.js"
import store from "./store/index.js"
//仅负责启动vue和启动时的配置，所有界面交给组件app来渲染


new Vue({
    template:`<App></App>`,
    el:"#app",
    components:{
        App
    },
    router,//挂载路由对象到vue实例中
    store
});

import Home from "./pages/index.js"
import Movie from "./pages/moviePage.js"
import MovieDetail from "./pages/movieDetail.js"
import Login from "./pages/login.js"
import store from "./store/index.js"
const router=new VueRouter({
    routes:[
        {path:"/",component:Home},
        {path:"/movie",component:Movie,meta:{
            needLogin:true
        }},
        {path:"/movie/:id",component:MovieDetail,meta:{
            needLogin:true
        }},
        {path:"/login",component:Login}
    ],
    mode:"hash",
    
});
//注册全局导航守卫
router.beforeEach(function(to,from,next){
    if(to.meta && to.meta.needLogin){
        //需要登录的页面
        if(store.state.data){
            //已登录
            next();
        }
        else{
            next("/login");//跳转到登录页面
        }
    }
    else{
        next();
    }
})

export default router;
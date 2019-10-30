const template=`
<nav>
    <div class="left">
    <router-link to="/">首页</router-link>
    <router-link to="/movie">电影页</router-link>
    </div>
    
    <div class="right" v-if="loginUser">
        <span>{{loginUser.name}}</span>
        <button @click="loginOut">退出登录</button>
    </div>
</nav>

`;
export default{
    template,
    computed: {
        loginUser() {
            return this.$store.state.data;//拿到store中的用户信息对象
        }
    },
    methods: {
        loginOut() {
            this.$store.dispatch("loginOut");//调用退出登录方法
            this.$router.push("/login");//退出登录后，跳转回登录页面
        }
    }
    
    
}
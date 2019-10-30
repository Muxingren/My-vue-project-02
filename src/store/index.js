import loginService from "../services/loginService.js"

export default new Vuex.Store({
    // namespaced: true, //开启命名空间
    state: {
        data: null, //当前登录的用户为空
        isLogining: false //当前正在登录
    },
    mutations: { //配置状态有哪些变化，每一个变化是一个函数
        setIsLogining(state, payload) { //用于改变是否正在登录的状态
            //参数state：表示当前的状态
            //payload（负载）：可选的，该参数表示额外的信息
            state.isLogining = payload;
        },
        setUser(state, userObj) {//用于改变登录的用户
            state.data = userObj;
        }
    },
    actions: { //配置副作用操作，每个action是一个函数
        async login(context, payload) {  //需要传入账号和密码 {loginId:xxx, loginPwd:xxx}
            context.commit("setIsLogining", true);
            const resp = await loginService.login(payload.loginId, payload.loginPwd)
            if (resp) {
                //登录成功，将用户信息（账号，用户名）保存到state的data中
                context.commit("setUser", resp);
                //保存用户信息到本地存储 localStorage
                localStorage.setItem("loginUser", JSON.stringify(resp));
                return true;
            }
            context.commit("setIsLogining", false);
            return false;
        },
        loginOut(context) {
            //退出登录
            context.commit("setUser", null);//从state的data中删除用户信息
            localStorage.removeItem("loginUser");//从本地存储中删除用户信息
            context.commit("setIsLogining", false);
        },
        syncLocal(context) {
            //初始化时，同步本地存储
            const local = localStorage.getItem("loginUser");
            if (local) {
                //已经登录
                const user = JSON.parse(local); //拿出本地存储中的用户对象
                context.commit("setUser", user); //同步到状态
            }
        }
    }
})

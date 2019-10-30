export default {
    async login(loginId, loginPwd) {
        return new Promise(resolve => {
            setTimeout(() => {
                if (loginId === "admin" && loginPwd === "123123") {
                    resolve({ //设置超级管理员的账号和密码 只有这个可以登录成功  
                        //传过一个用户信息对象{id,name}
                        loginId,
                        name: "超级管理员"
                    })
                }
                else {
                    resolve(null)
                }
            }, 1000);
        })
    }
}
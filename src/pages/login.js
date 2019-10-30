//登录页面组件
import Logining from "../components/logining.js"
const template=`
<div>
<div class="center">
    <p>
    <label>账户：</label>
    <input type="text" v-model="loginId">
    </p>
    <p>
    <label>密码：</label>
    <input type="password" v-model="loginPwd">
    </p>
    <p>
    <button @click="handleLogin">登录</button>
    </p>
</div>
    <Logining :show="isLogining"></Logining>
</div>
`;
export default{
    template,
    components:{
        Logining
    },
    data(){
        return{
            loginId:"",
            loginPwd:""
        }
    },
    computed: {
        isLogining() {
            return this.$store.state.isLogining;
        }
    },
    methods:{
        async handleLogin(){ //登录事件
                const result = await this.$store.dispatch("login",{
                    loginId: this.loginId,
                    loginPwd: this.loginPwd
                })//将输入的账号和密码通过dispatch传到store中，验证是否正确
                if (result) {
                    this.$router.push("/");//登录成功后，跳转到首页
                }
                else {
                    alert("账号密码错误");
                    this.loginId="";//清空账号和密码
                    this.loginPwd="";
                }
            }
           
        }
        
    }

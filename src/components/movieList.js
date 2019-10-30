import Movie from "./movie.js"
//导入子组件
const template=`
<div class="data-container">
    <button @click="handleBack">返回首页</button>
    <Movie v-for="item in movies" :data="item" :key="item.id"></Movie>
</div>
`;

export default{
    template,
    components:{
        Movie
    },
    props:{
        movies:{ //需要父组件传过来一个数组
            type:Array,
            default:()=>[]
        }
    },
    methods:{
        handleBack(){
            this.$router.push("/");//返回首页
        }
    }
}
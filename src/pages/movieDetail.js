import Movie from "../components/movie.js"
import movieService from "../services/movieService.js"
import Load from "../components/loading.js"
const template=`
<div class="data-container">
    <Movie :data="movie"></Movie>
    <Load :show="isLoading"></Load>
</div>

`;
export default{
    template,
   components:{
       Movie,
       Load
   },
   data(){
       return{
        movie:null,//作为props传给子组件Movie，进而渲染页面
        isLoading:false
       }
   
    },
   mounted(){
       //获取id
       const id=this.$route.params.id;
       this.isLoading=true;
       //根据Id获取电影详情数据对象
       movieService.getMovie(id).then(resp=>{
           this.movie=resp;
           this.isLoading=false;
       })
   },
   

  

}
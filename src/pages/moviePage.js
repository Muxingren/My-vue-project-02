//展示电影列表和页码的主页面
//导入页码子组件
import Pager from "../components/pager.js"
import MovieList from "../components/movieList.js"
//用以获取电影数据
import movieService from "../services/movieService.js"
import Load from "../components/loading.js"
const template=`
<div>
    <MovieList :movies="movies"></MovieList>
    <Pager 
     :total="total" 
     :pageSize="pageSize"
    :panelNumber="panelNumber"
      :value="current" 
      @input="handlePageChange"
      />
     <Load :show="isLoad"></Load>
</div>

`;
export default{ //直接导出一个对象
    template,
    data(){
        return{
            current:1,
            total:0,
            pageSize:3,
            panelNumber:5,
            movies:[],//存放电影数据
            isLoad:false
        }
    },
    components:{
        Pager,
        MovieList,
        Load
    },
    mounted(){
        this.setMovies();
    },
    methods:{
        setMovies(){ //得到一个对象，里面包括页码总数total和每页的电影数组data
            this.isLoad=true;
            movieService.getMovies(this.current,this.pageSize).then(resp=>{
                this.total=resp.total;
                this.movies=resp.data;
                this.isLoad=false;
            })
        },
        handlePageChange(newPage){ //改变页码，参数为子组件传过来的新页码
            this.current=newPage;
            this.setMovies();//页码发生改变，更新电影列表
        }
    },
   
    
}
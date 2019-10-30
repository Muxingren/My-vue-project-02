//展示页码的组件
const template=`
<div id="pager" class="pager">
<a class="pager-item" :class="value===1?'disabled':''" @click="changePage(1)">首页</a> 
<a class="pager-item" :class="value===1?'disabled':''" @click="changePage(value-1)">上一页</a> 
<a class="pager-item" :class="{active: item === value}" @click="changePage(item)" v-for="item in numbers" >{{item}}</a>
<a class="pager-item" :class="{disabled:value===pageNumber}" @click="changePage(value+1)">下一页</a>
 <a class="pager-item" :class="{disabled:value===pageNumber}" @click="changePage(pageNumber)">尾页</a> 
 <span class="pager-text">
 <i>{{value}}</i> / <i>{{pageNumber}}</i>
 </span>
 </div>
`;
export default{
    template,
    props:{ //需要父组件传入 页容量，数据总量，最多可以显示页码数量
        value:{
            type:Number,
            require:true,
            default:1
        },
        //当前页数
        pageSize:{
            type:Number
        },//页容量，每页显示多少条数据
        total:{
            type:Number
        },//数据总量 总共有多少条数据
        panelNumber:{
            type:Number
        }//最多可显示页码数量
    },
    computed:{
        pageNumber(){ //总页数
            return Math.ceil(this.total/this.pageSize);// 向上取整
        },
        numbers(){ //用于得到一个数字的数组
           const arr=[];
           let min=this.value-Math.floor(this.panelNumber/2);//显示出来页码中的最小页码数
           if(min<1){
               min=1;//最小不能小于1
           }
           let max=min+this.panelNumber-1;//显示出来页码中的最大页码数
           if(max>this.pageNumber){
               max=this.pageNumber;//最大不能比总页数大
           }
           for(let i=min;i<=max;i++){
               arr.push(i);//将最小页码与最大页码之间的页码显示出来
           }
           return arr;
        }
       
    },
    methods:{
        changePage(newPage){ //手动选择页码
            if(newPage<1){
                newPage=1;
            }
            if(newPage>this.pageNumber){
                newPage=this.pageNumber;
            }
            // this.current=newPage;//不能直接改页码了
            this.$emit("input",newPage);//需要通过自定义事件来告知父组件修改页码值
        },
        
        
    }
}
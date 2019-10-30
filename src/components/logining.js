import Modal from "./modal.js"
const template=`
<Modal v-if="show">
    <div style="font-size:1.5em;color:#fff" >
        登录中...
    </div>
</Modal>
`;

export default{
    template,
    components:{
        Modal
    },
    props:{
        show:{
            type:Boolean,//通过布尔属性show来控制是否显示
            default:false
        }
    }
}
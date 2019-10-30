export default{
    //拿到每页的电影列表
    async getMovies(page,pageSize){ //通过fetch请求拿到数据 根据页码和页容量
        const arr=await fetch("https://api.myjson.com/bins/15f8x1").then(resp=> resp.json());
        return{
            data:arr.slice((page-1)*pageSize,page*pageSize),//根据页码和页容量分配好的每页数据
            total:arr.length //页码数量
        }
    },

    //拿到每个电影的详情
    async getMovie(id) {
        const datas = await fetch("https://api.myjson.com/bins/15f8x1").then(resp => resp.json())
        return datas.find(item => item._id === id);//返回的是datas中符合条件的第一项
    }
}
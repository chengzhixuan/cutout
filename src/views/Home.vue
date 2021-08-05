<template>
    <div class="home">
        <div><input type="file" @change="fileChange" accept="image/*"><span @click="downLoad()">下载滚滚滚f</span></div>
        <div id='initialImg'>
            
        </div>
        <div id='cutImg'>
            
        </div>
    </div>
</template>

<script>
    import CutOut from '../util/cutout'
    export default {
        name: "home",
        data(){
            return {
                cutOutBoj: null
            }
        },
        components: {},
        mounted () {
            this.cutOutBoj = new CutOut({
                initialDom: '#initialImg',
                previewDom: '#cutImg',
                flie: './1.jpg',
                canvasWH: 500 
            })
        },
        methods:{
            downLoad () {
                this.cutOutBoj.downLoad(1)
            },
            fileChange (v) {
                this.cutOutBoj = new CutOut({
                    initialDom: '#initialImg',
                    previewDom: '#cutImg',
                    flie: v.target.files[0],
                    canvasWH: 500 
                })
            }
        }
    };
</script>
<style lang="less" scoped>
    #initialImg{
        width: 500px;
        height: 500px;
        margin-top: 40px;
        margin-left: 40px;
        display: inline-block;
        border:1px solid #999;
    }
    #cutImg{
        width: 500px;
        height: 500px;
        border:1px solid #999;
        display: inline-block;
        margin-left: 10px;
    }
</style>
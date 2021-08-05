// drawImage 中6个参数  图片  
// 开始剪切图片的 x 坐标位置
// 开始剪切图片的 y 坐标位置
// 被剪切图像的宽度（就是裁剪之前的图片宽度，这里的宽度若小于图片的原宽。则图片多余部分被剪掉；若大于，则会以空白填充）
// 被剪切图像的高度（就是裁剪之前的图片高度）
// 在画布上放置图像的 x 坐标位置 
// 在画布上放置图像的 y 坐标位置 
// 要使用的图像的宽度（就是裁剪之后的图片高度，放大或者缩放）   
// 要使用的图像的高度（就是裁剪之后的图片高度，放大或者缩放）
class cutout{
    constructor (options) {
        const defaultOption = {
            initialDom: 'body', // 文件转图片渲染的地方
            previewDom: 'body', // 修改后的文件渲染的地方
            flie: undefined,             // 画布的的宽高
            canvasWH: 500       // 画布的的宽高
        }
        this.options = Object.assign(defaultOption, options) // 传递进来的值
        this.scaleStep = 0.1 //每次滚动缩放的比例
        this.newScale = 1 // 放大缩小的倍数
        this.minScale = 1 // 最小缩放的比例
        this.maxScale = 3 // 最大缩放的比例
        this.tempCanvas = null // canvas 对象
        this.init()
    }
    init () {
        let self = this;
        let o = this.options
        let url = o.flie;
        if (typeof o.flie === 'object') {
            if (window.createObjectURL!=undefined) {
                url = window.createObjectURL(o.flie);
            } else if (window.URL!=undefined) {
                url = window.URL.createObjectURL(o.flie);
            } else if (window.webkitURL!=undefined) {
                url = window.webkitURL.createObjectURL(o.flie);
            }
        }
        let img = new Image()
        img.src = url;
        img.onload = function () {
            let canvas = document.createElement('canvas');
            let context = canvas.getContext('2d');
            canvas.width = o.canvasWH;
            canvas.height = o.canvasWH;
            canvas.style.position = 'relative'
            let width = img.width
            let height = img.height
            let canvasStartX = (o.canvasWH - width) / 2 // 计算在画布x轴渲染的位置
            let canvasStartY = (o.canvasWH - height) / 2 // 计算渲染的距离顶部的距离进行等比压缩
            if (img.width > o.canvasWH || img.height > o.canvasWH) { // 等比压缩 判断图片的框高 按照大的一边进行等比压缩
                if (img.width / img.height > o.canvasWH / o.canvasWH) { //如果宽大于画布
                    width = o.canvasWH  // 如果高度小于画布大小 计算渲染的距离顶部的距离进行等比压缩
                    height = img.height / img.width * o.canvasWH //宽大于高的时候 宽压缩到画布大小  高等比进行压缩
                    canvasStartX = 0  //如果宽大于画布  渲染的位置就重画布的x轴 0 处开始
                    canvasStartY = (o.canvasWH - height) / 2 // 如果高度小于画布大小 计算渲染的距离顶部的距离进行等比压缩
                } else {
                    width = img.width / img.height * o.canvasWH
                    height = o.canvasWH
                    canvasStartY = 0
                    canvasStartX = (o.canvasWH - width) / 2
                }
            }
            context.drawImage(img, 0, 0, img.width, img.height, canvasStartX, canvasStartY, width, height); 
            document.querySelector(o.initialDom).appendChild(canvas)
            document.querySelector(o.initialDom).style.overflow = 'hidden'
            document.querySelector(o.previewDom).style.overflow = 'hidden'
            document.querySelector(o.initialDom + ' canvas').addEventListener('mousewheel', (e) => self.handleMouseWheel(e));
            self.tempCanvas = canvas
        }
    }
    handleMouseWheel (e) {
        let wd = e.wheelDelta;
        console.log(e.offsetX)
        this.newScale += wd > 0 ? this.scaleStep : -this.scaleStep;
        this.newScale = this.newScale < this.minScale ? this.minScale : this.newScale;
        this.newScale = this.newScale > this.maxScale ? this.maxScale : this.newScale;
        this.tempCanvas.style.transformOrigin = 'center center';
        this.tempCanvas.style.transform = 'scale(' + this.newScale + ')';
    }
    /**
     * 压缩比例
     * @param {*} ratio 
     */
    downLoad (ratio) {
        let img = document.createElement("a");
		img.href = this.tempCanvas.toDataURL("image/jpeg", ratio);
        img.download = 'hechengtupian.png';
        img.click()
    }
}
export default  cutout
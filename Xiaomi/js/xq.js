class XQ {
	baseUrl = 'http://localhost:8888/goods/item'

	constructor() {
		this.getData()
		this.bind()
	}

	bind() {
		// 绑定事件委托，给立即结算的input绑定事件,添加到购物车
		this.$('.jieshao').addEventListener('click', this.settle.bind(this))
	}
	async getData() {
		let id = localStorage.getItem('goodsId') - 0
		// console.log(typeof (id));
		let {
			data,
			status
		} = await axios.get(this.baseUrl + "/" + id)
		// console.log(data);
		let info = data.info
		// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
		if (status == 200) {
			let tr = ''
			let str = ''
			tr += `
    	<div class="neirong w">
				<div class="xiaomi6 fl">${data.info.category}</div>
				<nav class="fr">
					<li><a href="">概述</a></li>
					<li>|</li>
					<li><a href="">变焦双摄</a></li>
					<li>|</li>
					<li><a href="">设计</a></li>
					<li>|</li>
					<li><a href="">参数</a></li>
					<li>|</li>
					<li><a href="">F码通道</a></li>
					<li>|</li>
					<li><a href="">用户评价</a></li>
					<div class="clear"></div>
				</nav>
				<a href="./liebiao.html" _target style="border:2px solid orange;background:hotpink; color:white" >返回列表页</a>
				<div class="clear"></div>
			</div>
      `
			document.querySelector('.xiangqing').innerHTML = tr


			str += `
			<div  class="left fl jqzoom">
			<div id="image" class="uio" style="background-image:url(${info.img_big_logo})"></div>
			 </div>
			<div class="right fr">
				<div class="h3 ml20 mt20">${info.category}</div>
				<div class="jianjie mr40 ml20 mt10">${info.title}</div>
				<div class="jiage ml20 mt10">${info.price}元</div>
				<div class="ft20 ml20 mt20">选择版本</div>
				<div class="xzbb ml20 mt10">
					<div class="banben fl">
						<a>
							<span>全网通版 6GB+64GB </span>
							<span>2499元</span>
						</a>
					</div>
					<div class="banben fr">
						<a>
							<span>全网通版 6GB+128GB</span>
							<span>2899元</span>
						</a>
					</div>
					<div class="clear"></div>
				</div>
				<div class="ft20 ml20 mt20">选择颜色</div>
				<div class="xzbb ml20 mt10">
					<div class="banben">
						<a>
							<span class="yuandian"></span>
							<span class="yanse">亮黑色</span>
						</a>
					</div>

				</div>
				<div class="xqxq mt20 ml20">
					<div class="top1 mt10">
						<div class="left1 fl">小米6 全网通版 6GB内存 64GB 亮黑色</div>
						<div class="right1 fr">2499.00元</div>
						<div class="clear"></div>
					</div>
					<div class="bot mt20 ft20 ftbc">总计：${info.price}</div>
				</div>
				<div class="xiadan ml20 mt20">
					<input class="jrgwc" type="button" name="jrgwc" value="加入购物车" />

				</div>
			</div>
			<div class="clear"></div>
      
      `
			document.querySelector('.jieshao').innerHTML = str
		}
	}
	async settle(e) {
		// 判断用户是否登录，如果没有登录则跳转到登录页进行登录
		let token = localStorage.getItem('token')
		if (!token) location.assign('./login.html?ReturnUrl=./xq.html')
		// console.log(e.target);
		// 判断是加入购物车按钮
		if (e.target.classList.contains('jrgwc')) {
			// console.log(localStorage.getItem('goodsId'));
			let goodsId = localStorage.getItem('goodsId') - 0
			let id = localStorage.getItem('id') - 0

			// 发送请求添加到购物车
			// 请求头设置authorization字段
			axios.defaults.headers.common['authorization'] = token;
			// 设置请求格式
			axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
			let params = `id=${id}&goodsId=${goodsId}`
			let {
				status,
				data
			} = await axios.post('http://localhost:8888/cart/add', params)
			console.log(data);
			if (data.code == 401 || data.code == 0) location.assign('./login.html?ReturnUrl=./xq.html')
			if (status == 200) {
				if (data.code == 1) {
					layer.open({
						content: '加入购物车成功',
						skin: 'demo-class',
						anim: 4,
						btn: ['前往购物车结算', '留在当前页'],
						yes: function (index, layero) {
							//按钮【按钮一】的回调
							location.assign('./gouwuche.html')
						},
						btn2: function (index, layero) {
							//按钮【按钮二】的回调

							//return false 开启该代码可禁止点击该按钮关闭
						},

					});
				}
			}

		}
	}




	$(tag) {
		let res = document.querySelectorAll(tag)
		return res.length == 1 ? res[0] : res;
	}

}
new XQ()
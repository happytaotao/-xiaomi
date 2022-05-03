class LB {
  baseUrl = 'http://localhost:8888/goods/list'
  constructor() {
    this.getData()
    this.bind()
  }

  bind() {

    // 给列表事件获取商品id
    this.$('#liebiao').addEventListener('click', this.getGoodsID.bind(this))
    // 分页pagination的冒泡事件
    this.$('.pagination').addEventListener('click', this.changePage.bind(this))
    this.$('#classification').addEventListener('click', this.changeHtml.bind(this))
  }

  async getData(current = 2) {

    let pagesize = 10
    //! 一页多少条传参
    let res = await axios.get(this.baseUrl + '?pagesize=' + pagesize + '&current=' + current)


    console.log(res);
    let {
      data,
      status,
    } = res
    // console.log(data.total);
    // console.log(page);
    this.total = Math.ceil(data.total / pagesize)
    // console.log(this.total);
    if (status == 200) {
      // 分页
      let pageNation = `
    <li>
      <a href="#none" aria-label="Previous">
        <span aria-hidden="true" class="fy">&laquo;</span>
      </a>
    </li>`
      for (var i = 1; i <= this.total; i++) {
        pageNation += `
      <li class="${current==i && 'active'} fya" ><a href="#none">${i}</a></li>
      `
      }
      pageNation += `
     <li >
      <a href="#none" aria-label="Next">
        <span aria-hidden="true" class="fy">&raquo;</span>
      </a>
    </li>
     `
      this.$('.pagination').innerHTML = pageNation







      let tr = ''
      data.list.forEach(item => {
        tr += `
        <div class="mingxing fl mb20" style="border:2px solid #fff;width:230px;cursor:pointer;" onmouseout="this.style.border='2px solid #fff'" onmousemove="this.style.border='2px solid red'" >
          <div class="sub_mingxing">
            <a href="#none">
              <img src="${item.img_big_logo}" alt="">
            </a>
          </div>
          <div class="pinpai">
            <a href="#none" style="font-size:12px">${item.title}</a>
          </div>
          <div class="youhui"><span style="margin-left:-40px;backGround-color:orange;border-radius:10px">已售：${item.sale_type}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp剩余 ${item.goods_number}件</div>
          <div class="jiage" style="text-align:right">￥${item.price}元&nbsp;&nbsp;&nbsp</div>
          <p href="#none" class="sk_goods_buy" id="qg" data-id="${item.goods_id}">立即抢购</p>
        </div>
        
        
        `
      })
      this.$('#liebiao').innerHTML = tr
    }
  }

  // 改变分类事件
  changeHtml(e) {
    // console.log(e.target.innerHTML);
    this.$('#biaoti').innerHTML = e.target.innerHTML
    // console.log($('#biaoti').html());
  }

  // 获取商品id跳转详情页
  getGoodsID(e) {
    // console.log(e.target.nodeName);
    if (e.target.classList.contains('sk_goods_buy')) {
      let id = e.target.dataset.id
      // console.log(id);
      localStorage.setItem('goodsId', id)
    }
    location.assign('./xq.html')
  }







  // 分页的事件
  changePage(event) {
    // console.log(event.target);
    let target = event.target

    // if(target.n)
    // console.log(target);
    // console.log(curPage);
    if (target.nodeName == 'A') {
      // 获取时纯字符串，点击是数字-0变数字 不是数字的-0变NAN
      if (target.innerHTML - 0) {
        this.getData(target.innerHTML - 0)
        return
      }

      // let curPage = this.$('.active').firstElementChild.innerHTML

      // if (target.getAttribute('aria-label') == 'Previous') {
      //   if (curPage == 1) return;
      //   --curPage
      // }

      // if (target.getAttribute('aria-label') == 'Next') {
      //   if (curPage ==  this.current) return;
      //   ++curPage
      // }

      // this.getData(curPage)
      this.somePage(target)

    }

    if (target.nodeName == 'SPAN') {
      let tObj = target.parentNode
      // console.log(tObj);
      // let curPage = this.$('.active').firstElementChild.innerHTML
      // // console.log(curPage);
      // // 向前查看
      // if (tObj.getAttribute('aria-label') == 'Previous') {
      //   if (curPage == 1) return;
      //   --curPage
      // }
      // this.getData(curPage)
      // // 向后查看
      // if (tObj.getAttribute('aria-label') == 'Next') {
      //   if (curPage ==  this.current) return;
      //   ++curPage
      // }
      // this.getData(curPage)
      this.somePage(tObj)
    }
  }

  // 封装出来的分页方法
  somePage(val) {
    // 获取当前active的标签的页数
    console.log(val);
    let curPage = this.$('.active').firstElementChild.innerHTML

    // 向前查看
    if (val.getAttribute('aria-label') == 'Previous') {
      if (curPage == 1) return;
      --curPage
    }
    // 向后查看
    if (val.getAttribute('aria-label') == 'Next') {
      if (curPage == this.total) return;
      ++curPage
    }

    this.getData(curPage)
  }







  $(tag) {
    let res = document.querySelectorAll(tag)
    return res.length == 1 ? res[0] : res;
  }
}
new LB()
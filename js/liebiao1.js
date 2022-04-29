class Problem {
  baseUsrl = 'http://localhost:3000/problem2';
  constructor() {
    //调用读取数据的方法
    this.getData()
    this.bind()
  }
  bind() {
    // 分页pagination的冒泡事件
    Problem.$$('.pagination').addEventListener('click', this.changePage.bind(this))
    Problem.$$('#classification').addEventListener('click', this.changeHtml.bind(this))
  }

  async getData(page = 1) {
    let limit = 10

    let res = await axios.get(this.baseUsrl + '?' + '_page=' + page + '&_limit=' + limit)
    console.log(res);
    let {
      data,
      headers
    } = res
    this.data = data
    this.page = page
    this.current = Math.ceil(headers['x-total-count'] / limit)
    console.log(data);

    // 分页
    let pageNation = `
    <li>
      <a href="#none" aria-label="Previous">
        <span aria-hidden="true" class="fy">&laquo;</span>
      </a>
    </li>`
    for (var i = 1; i <= this.current; i++) {
      pageNation += `
      <li class="${page==i && 'active'} fya" ><a href="#none">${i}</a></li>
      `
    }
    pageNation += `
     <li >
      <a href="#none" aria-label="Next">
        <span aria-hidden="true" class="fy">&raquo;</span>
      </a>
    </li>
     `
    Problem.$$('.pagination').innerHTML = pageNation



    let tr = ''
    data.forEach((item) => {
      tr += `
        <div class="mingxing fl mb20" style="border:2px solid #fff;width:230px;cursor:pointer;" onmouseout="this.style.border='2px solid #fff'" onmousemove="this.style.border='2px solid red'">
            <div class="sub_mingxing">
              <a href="#none" target="_blank">
                <img src="${item.imgUrl}"alt="">
              </a>
            </div>
          <div class="pinpai">
            <a href="./xiangqing.html" target="_blank">${item.name}</a>
          </div>
          <div class="youhui">${item.msg}</div>
          <div class="jiage">${item.pirce}元</div>
        </div>
       
      `
      Problem.$$('#liebiao').innerHTML = tr
    })


  }

  // 改变分类事件
  changeHtml(e) {
    console.log(e.target.innerHTML);
    Problem.$$('#biaoti').innerHTML = e.target.innerHTML
    // console.log($('#biaoti').html());
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

      // let curPage = Problem.$$('.active').firstElementChild.innerHTML

      // if (target.getAttribute('aria-label') == 'Previous') {
      //   if (curPage == 1) return;
      //   --curPage
      // }

      // if (target.getAttribute('aria-label') == 'Next') {
      //   if (curPage == this.current) return;
      //   ++curPage
      // }

      // this.getData(curPage)
      this.somePage(target)

    }

    if (target.nodeName == 'SPAN') {
      let tObj = target.parentNode
      // console.log(tObj);
      // let curPage = Problem.$$('.active').firstElementChild.innerHTML
      // // console.log(curPage);
      // // 向前查看
      // if (tObj.getAttribute('aria-label') == 'Previous') {
      //   if (curPage == 1) return;
      //   --curPage
      // }
      // this.getData(curPage)
      // // 向后查看
      // if (tObj.getAttribute('aria-label') == 'Next') {
      //   if (curPage == this.current) return;
      //   ++curPage
      // }
      // this.getData(curPage)
      this.somePage(tObj)
    }
  }

  // 封装出来的分页方法
  somePage(val) {
    // 获取当前active的标签的页数
    let curPage = Problem.$$('.active').firstElementChild.innerHTML

    // 向前查看
    if (val.getAttribute('aria-label') == 'Previous') {
      if (curPage == 1) return;
      --curPage
    }
    // 向后查看
    if (val.getAttribute('aria-label') == 'Next') {
      if (curPage == this.current) return;
      ++curPage
    }

    this.getData(curPage)
  }





  static $$(ele, all = false) {
    // return all ? document.querySelectorAll(ele) : document.querySelector(ele);
    let res = document.querySelectorAll(ele);
    // console.log(res);
    //通过长度判断获取到的是否为单个节点
    // 获取到的是单个元素, 则返回下标为0
    // 否则就返回所有
    return res.length == 1 ? res[0] : res;
  }

}
new Problem
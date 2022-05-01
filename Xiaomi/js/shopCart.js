class shopCart {
  constructor() {
    // 获取详情信息
    this.getData()
    // 全选点击事件
    this.$('#quanxuan').addEventListener('click', this.allCheck.bind(this))

    // 绑定事件
    this.$('#content2').addEventListener('click', this.getOneChecked.bind(this))

  }
  async getData() {
    let id = localStorage.getItem('id') - 0
    let token = localStorage.getItem('token')
    console.log(id);
    axios.defaults.headers.common['authorization'] = token
    axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    let {
      data,
      status
    } = await axios.get('http://localhost:8888/cart/list?' + 'id=' + id)
    console.log(data);
    // 判断有没有登录，没有登录跳回到登录页面
    if (status == 200) {
      if (data.code == 401 || !token) {
        location.assign('./login.html?ReturnUrl=./gouwuche.html')
      } else {
        // 商品页展示
        let tr = ''
        data.cart.forEach(item => {
          tr += `
          <div class="content2 center">
            <div class="sub_content fl ">
              <input type="checkbox" value="quanxuan" class="quanxuan" />
            </div>
            <div class="sub_content fl"><img src="${item.img_small_logo}"></div>
            <div class="sub_content fl ft20">${item.title}</div>
            <div class="sub_content fl ">${item.price}元</div>
            <div class="sub_content fl">
              <input class="shuliang" type="number" value="${item.cart_number}" step="1" min="1">
            </div>
            <div class="sub_content fl" id="price">${item.goods_number*item.price}</div>
            <div class="sub_content fl"><a href="#none" style="font-size:14px; width:30px;" id="delete" data-id="${item.goods_id}">删除</a></div>
            <div class="clear"></div>
          </div>
       
          `
        })
        this.$('#content2').innerHTML = tr

        // 几件商品
        let tr1 = ''
        tr1 += `
          <ul>
            <li><a href="./liebiao.html">继续购物</a></li>
              <li>|</li>
            <li>共<span>${data.cart.length}</span>件商品，已选择<span id="checked">0</span>件</li>
            <div class="clear"></div>
          </ul>
        
        `
        this.$('#tishi').innerHTML = tr1

      }
    }
  }

  // 事件委托获取单选状态，改变全选
  async getOneChecked({
    target
  }) {
    // 如果是单选按钮
    if (target.classList.contains('quanxuan')) {
      // console.log(target.checked);
      // 单选方法封装出去
      this.changeChenked(target)
      // 统计数量和价格
      this.numAndNumber()

    }
    let del = target.getAttribute("id")
    console.log(del);
    // 如果是删除按钮
    if (target.getAttribute("id") == 'delete') {
      let id = localStorage.getItem('id') - 0
      let goodsId = localStorage.getItem('goodsId') - 0
      let res = await axios.get('http://localhost:8888/cart/remove?id=' + id + '&goodsId=' + goodsId)
      // if ()

      console.log(res);
    }
  }


  // 全选
  allCheck(e) {
    // 获取全选状态
    console.log(e.target.checked);
    let allChecked = e.target.checked
    // 获取单选的状态
    // this.$('#quanxuan')
    this.oneChecked(allChecked)
    // this.$('#checked').innerHTML = num

  }

  // 点击全选设置每个单选框状态
  oneChecked(checked) {
    // console.log(this.$('.quanxuan'));
    let checkStatus = this.$('.quanxuan')
    checkStatus.forEach(item => {
      item.checked = checked
    })
    // 当全选的时候，显示已选中的个数
    // console.log(this.$('.quanxuan').length);
    let cLength = this.$('.quanxuan').length
    this.$('#checked').innerHTML = cLength
  }

  // 单选按钮的状态转换
  changeChenked(target) {
    // 如果点击的是取消，有一个单选按钮状态为false，则全选为false
    if (!target.checked) {
      this.$('#quanxuan').checked = false
      return
    }
    if (target.checked) {
      // console.log(this.$('.quanxuan'));
      let res = Array.from(this.$('.quanxuan')).find(item => {
        // console.log(item.checked);
        // 每次从前向后查找，有一个没有被选中就返回一个input,当全被选中，则返回underfined
        return !item.checked
      })
      // console.log(res);
      // 当找不到未选中的input时，表示单选全部选中，给全选赋值
      if (!res) this.$('#quanxuan').checked = true


    }
  }

  // 统计数量和价格
  numAndNumber() {
    // 获取每个订单，以及订单内的价格数量
    // console.log(document.querySelectorAll('.content2'));
    let goods = document.querySelectorAll('.content2')

    let totalNum = 0
    let totalPrice = 0
    let num = 0 //已选中的个数

    goods.forEach(item => {
      // 获取单选框选中状态的数量和价格
      // console.log(item.firstElementChild.firstElementChild.checked);

      if (item.firstElementChild.firstElementChild.checked) {
        num = (++num);
        // console.log(item.querySelector('.shuliang').value);
        totalNum = item.querySelector('.shuliang').value - 0 + totalNum
        // console.log(totalNum);
        // console.log(item.querySelector('#price').innerHTML - 0);
        totalPrice = item.querySelector('#price').innerHTML - 0 + totalPrice
        // console.log(totalPrice);
        this.$('#total').innerHTML = totalPrice + '元'
        this.$('#checked').innerHTML = num
      }
    })

  }







  $(tag) {
    let res = document.querySelectorAll(tag)
    return res.length == 1 ? res[0] : res;
  }



}

new shopCart
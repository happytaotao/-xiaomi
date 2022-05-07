// 选项卡
$('ul > li').click(function () {
  // ul 和 ol 下的所有 li 都没有类名
  $('ul > li, ol > li') // 找到的所有的 li
    .removeClass('active')
    .parent() // 的父元素就是 ul 和 ol
    .find(`li:eq(${ $(this).index() })`)
    .addClass('active')
})


// form表单提交


// let users = [{
//   id: 1,
//   name: '蓄电池',
//   type: '有害垃圾',
//   icon: '',
//   data: new Date()
// }]
let users = JSON.parse(localStorage.getItem('users')) || []
// console.log(users);
let form = document.querySelector('form')
let name = document.querySelector('.name')
let select = document.querySelector('select')
let tbody = document.querySelector('tbody')
let one = document.querySelector('#one')
let two = document.querySelector('#two')
let three = document.querySelector('#three')
let four = document.querySelector('#four')
// console.log(select.value);


bind()



function bind() {
  let str = ''
  let tr = ''
  users.forEach(item => {
    str += `
    <tr>
      <td>${item.id}</td>
      <td>${item.name}</td>
      <td>${item.type}</td>
      <td>
        <img src="${item.icon}" alt="">
      </td>
      <td>${item.data}</td>
      <td>
        <button class='del' data-id='${item.id}'>删除</button>
      </td>
    </tr>
    `


  })
  // let info = users.find(item => {
  //   return item.type == '其他垃圾'
  // })
  // console.log(info);

  // one.innerHTML = tr

  tbody.innerHTML = str
  localStorage.setItem('users', JSON.stringify(users))

}










form.addEventListener('submit', function (e) {

  e.preventDefault()
  // console.log(111);
  let nameValue = name.value.trim()
  let type = select.value.trim()
  if (!nameValue || type == '请选择') return alert('请完整填写表单')
  if (type == '可回收垃圾') {
    icon = './img/Recyclable_0.jpg'
  }
  if (type == '有害垃圾') {
    icon = './img/Hazardous_0.jpg'
  }
  if (type == '其他垃圾') {
    icon = './img/Residual_0.jpg'
  }
  if (type == '厨余垃圾') {
    icon = './img/food_0.jpg'
    // console.log(users);
  }

  let info = {
    id: !users.length ? 1 : users[users.length - 1].id + 1,
    name: nameValue,
    type: type,
    icon: icon,
    data: new Date()
  }

  users.push(info)
  bind()

  name.value = ''
  type.value = ''
  updata()




})

// 删除
tbody.onclick = function (e) {
  let id = e.target.dataset.id - 0
  // console.log(id);
  if (e.target.className == 'del') {
    // console.log(111);
    users = users.filter(item => {
      return item.id !== id
    })
  }
  bind()
}


updata()

function updata() {
  let imp = ''
  let imp1 = ''
  let imp2 = ''
  let imp3 = ''

  let info = users.forEach(item => {
    if (item.type == '厨余垃圾') {
      for (var i in item) {
        if (i == 'name') {
          // console.log(item[i]);
          imp += `
          <p>${item[i]} </p>
      
          `
        }
      }

    }
    if (item.type == '有害垃圾') {
      for (var i in item) {
        if (i == 'name') {
          // console.log(item[i]);
          imp1 += `
          <p>${item[i]} </p>
      
          `
        }
      }
    }
    if (item.type == '可回收垃圾') {
      for (var i in item) {
        if (i == 'name') {
          console.log(item[i]);
          imp2 += `
          <p>${item[i]} </p>
      
          `
        }
      }
    }
    if (item.type == '其他垃圾') {
      for (var i in item) {
        if (i == 'name') {
          console.log(item[i]);
          imp3 += `
          <p>${item[i]} </p>
      
          `
        }
      }
    }

  })
  one.innerHTML = imp
  two.innerHTML = imp1
  three.innerHTML = imp2
  four.innerHTML = imp3





}
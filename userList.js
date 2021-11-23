const tbody = document.getElementById('tbodyUserList');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
let num = 1;

window.onload = () => {
  getApiUserList(num);
  // setInterval(() => {
  //   getApiUserList(pageNum);
  // }, 5000);
};

const getApiUserList = async pageNum => {
  tbody.innerHTML = '';
  showLoading();
  // const responseData = await axios({
  //   url: 'https://reqres.in/api/users?page=1',
  //   method: 'get'
  // });
  //?bir diğer kullanım
  const responseData = await axios.get(`https://reqres.in/api/users?page=${pageNum}`);

  // console.log(responseData.data.data); //[{…}, {…}, {…}, {…}, {…}, {…}]
  if (responseData.data.data[0].id == undefined) {
    alert('userlist not found');
    removeLoading();
  } else {
    for (let i = 0; i < responseData.data.data.length; i++) {
      tbody.innerHTML += ` <tr>
      <td>
      <img src="${responseData.data.data[i].avatar}"/>
      </td>
      <td>
      ${responseData.data.data[i].id}
      </td>
      <td>
      ${responseData.data.data[i].email}
      </td>
      <td>
      ${responseData.data.data[i].first_name}
      </td>
      <td>
      ${responseData.data.data[i].last_name}
      </td>
</tr>`;
      removeLoading();
    }
  }
};

nextBtn.addEventListener('click', () => {
  // e.preventDefault();
  num++;
  if (num >= 2) {
    num = 2;
  }
  getApiUserList(num);
});

prevBtn.addEventListener('click', () => {
  // e.preventDefault();
  num--;
  if (num <= 1) {
    num = 1;
  }
  getApiUserList(num);
});

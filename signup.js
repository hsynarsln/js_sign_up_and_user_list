const loading = document.getElementById('loading');
const submitBtn = document.getElementById('submit');
const email = document.querySelector('#email');
const password = document.querySelector('#password');

window.onload = () => {
  setTimeout(fillFormInput(), 500); //? sürekli email ve password yapmak istemiyorum. Sayfa yüklendiğinde otamatik olarak email ve password dolu olsun.
};

const fillFormInput = () => {
  email.value = 'eve.holt@reqres.in';
  password.value = 'pistol';
  localStorage.setItem('email', EncryptStringAES(email.value)); //şifreli olarak localstorage'da tutuyoruz.
  localStorage.setItem('password', EncryptStringAES(password.value)); //şifreli olarak localstorage'da tutuyoruz.
};

submitBtn.addEventListener('click', e => {
  // e.preventDefault(); //?sayfanın kendini yenilemesini önlüyoruz. Form method post ise kullanmaya gerek kalmıyor.
  // console.log('clicked');
  apiRegister();
});

//*---------------------------------------------
//!-----------------FETCH-----------------------
//!----------------NORMAL KULLANIM--------------
//*---------------------------------------------

// const apiRegister = async () => {
//   const bodyData = {
//     email: email.value,
//     password: password.value
//   };
//   console.log(bodyData); //{email: 'eve.holt@reqres.in', password: 'pistol'}
//   console.log(JSON.stringify(bodyData)); //{"email":"eve.holt@reqres.in","password":"pistol"} --> //*api'nin bizden istediği veri bu şekilde
//   showLoading();
//   fetch('https://reqres.in/api/register', {
//     //?URL
//     method: 'POST', //hiçbirşey yazmazsak "GET" olarak algılar //?METHOD
//     body: JSON.stringify(bodyData), //göndereceğimiz veri //?BODY
//     headers: {
//       'Content-Type': 'application/json'
//     } //gönderdiğin verinin hangi formatta gittiği //?TİP
//   })
//     .then(response => response.json()) //?bana dönüşündeki veriyi json'a çevir.
//     .then(jsonResponse => {
//       console.log(jsonResponse); //{id: 4, token: 'QpwL5tke4Pnpja7X4'}
//       console.log(jsonResponse.token); //QpwL5tke4Pnpja7X4
//       if (jsonResponse.token == undefined) {
//         //api'den dönen token'nin doğru olup olmadığı durumu
//         alert(jsonResponse.error); //Kullanıcı adını yanlış yazdığımızda hata buraya düşer
//         removeLoading();
//       } else {
//         removeLoading();
//         localStorage.setItem('tokenKey', jsonResponse.token);
//         localStorage.setItem('tokenKeyEncrypted', EncryptStringAES(jsonResponse.token));
//         // window.location.href = 'userList.html';
//       }
//     })
//     .catch(error => {
//       alert(error); //URL'i yanlış yazdığımızda bu hataya düşüyor.
//       removeLoading();
//     });
// };
//*NOTE:bazı işlemler için yetki kontrolünü yapabilmek için api ler bu request'in kimden geldiğini bilmek isterler. bu kontrol api'lerin dizaynına göre değişir. ancak genel kabul, kullanıcı her seferinde kullanıcı adı ve şifresi ile işlem yapmasın, kendine has bir token göndermesi. bu token sayesinde api bu requestin kim tarafından yapıldığını anlıyor ve o kullanıcının sahip olduğu yetkilere göre işleme izin veriyor veya vermiyor.

//*----------------------------------------------------
//!-----------AXIIOS-----------------------------------
//!---api'den veri alış verişi-------------------------
//!-api'den veri çekmek için kullanılan bir kütüphane--
//*----------------------------------------------------
//? Kullanabilmek için .html dosyasına --> <script src="https://unpkg.com/axios/dist/axios.min.js"></script> bunu yapmamız veya axios'u indirmemiz gerekiyor.
//?NOTE: Axios'da fetch'teki gibi herhangi bir json işlemi yapmıyoruz.Default olarak zaten kendisi yapıyor.

const apiRegister = async () => {
  const bodyData = {
    email: email.value,
    password: password.value
  };
  showLoading();
  const response = await axios({
    url: 'https://reqres.in/api/register',
    data: bodyData,
    method: 'post' //büyük küçük harf farketmiyor.
  });
  // console.log(response); //{data: {…}, status: 200, statusText: '', headers: {…}, config: {…}, …}
  // console.log(response.data.token) //QpwL5tke4Pnpja7X4
  //? then() yapısı içerisine sokammıza gerek yok. zaten response'u yakalıyoruz.
  // .then(response => response.data)
  // .catch(error => {
  //   alert(error);
  //   removeLoading();
  // });
  //? veya değişken tanımlayarak yapabiliriz.
  // const { data } = response;
  // console.log(data.token);
  if (response.data.token == undefined) {
    //api'den dönen id'nin doğru olup olmadığı durumu
    alert('Undefined' + response.error); //Kullanıcı adını yanlış yazdığımızda hata buraya düşer
    removeLoading();
  } else {
    removeLoading();
    localStorage.setItem('tokenKey', response.data.token);
    localStorage.setItem('tokenKeyEncrypted', EncryptStringAES(response.data.token));
    removeLoading();
    window.location.href = 'userList.html';
  }
};

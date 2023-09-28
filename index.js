let cUrl;

async function getTabUrl() {
   return new Promise((resolve) => {
      chrome.tabs.query({ currentWindow: true, active: true }, async (tabs) => {
         cUrl = await tabs[0].url;
         resolve();
      });
   });
}

async function main() {
   await getTabUrl();
   console.log(cUrl);

   let response = await fetch(`http://localhost:5000/data?site=${cUrl}`);
   response = await response.json();
   console.log(response);

   document.querySelector("#productName").textContent = response.bkprod;

   document.querySelector("#productImage").src = response.cpic;

   document.querySelector("#productList1").innerHTML = '';
   document.querySelector("#productList2").innerHTML = '';
   document.querySelector("#productList3").innerHTML = '';


   let count=1;

   if (response.prodn1.length != 0) {
      let first = count;
      response.prodn1.forEach((element, index) => {
         document.querySelector(`#productList${first}`).innerHTML += '<option value="' + index + '" class="truncate">' + element + '</option>'
      })
      
      document.querySelector(`#logo${first}`).src='./image/flipkart.png'
      document.querySelector(`#productPrice${first}`).textContent = response.price1[0];
      document.querySelector(`#button${first}`).href = response.url1;
      document
      .querySelector(`#productList${first}`)
      .addEventListener("change", function () {
         if (this.value == "0") {
            document.querySelector(`#productPrice${first}`).textContent = response.price1[0];
         } else if (this.value == "1") {
            document.querySelector(`#productPrice${first}`).textContent = response.price1[1];
         } else if (this.value == "2") {
            document.querySelector(`#productPrice${first}`).textContent = response.price1[2];
         } else if (this.value == "3") {
            document.querySelector(`#productPrice${first}`).textContent = response.price1[3];
         } else if (this.value == "4") {
            document.querySelector(`#productPrice${first}`).textContent = response.price1[4];
         }
      });
      
      count += 1;
   }
   

   if (response.prodn2.length != 0) {
      let second = count;
      response.prodn2.forEach((element, index) => {
         document.querySelector(`#productList${second}`).innerHTML += '<option value="' + index + '" class="truncate">' + element + '</option>'
      })
      document.querySelector(`#logo${second}`).src='./image/amazon.png'
      document.querySelector(`#productPrice${second}`).textContent = response.price2[0];
      document.querySelector(`#button${second}`).href = response.url2;
      document
      .querySelector(`#productList${second}`)
      .addEventListener("change", function () {
         if (this.value == "0") {
            document.querySelector(`#productPrice${second}`).textContent = response.price2[0];
         } else if (this.value == "1") {
            document.querySelector(`#productPrice${second}`).textContent = response.price2[1];
         } else if (this.value == "2") {
            document.querySelector(`#productPrice${second}`).textContent = response.price2[2];
         } else if (this.value == "3") {
            document.querySelector(`#productPrice${second}`).textContent = response.price2[3];
         } else if (this.value == "4") {
            document.querySelector(`#productPrice${second}`).textContent = response.price2[4];
         }
      });
      count += 1;
   }

   if (response.prodn3.length != 0) {
      let third = count;
      response.prodn3.forEach((element, index) => {
         document.querySelector(`#productList${third}`).innerHTML += '<option value="' + index + '" class="truncate">' + element + '</option>'
      })
      document.querySelector(`#logo${third}`).src='./image/croma.png'
      document.querySelector(`#productPrice${third}`).textContent = response.price3[0];
      let newurl = response.bkprod.replace(' ', '%20');
      document.querySelector(`#button${third}`).href = `https://www.croma.com/searchB?q=${newurl}%3Arelevance&text=${newurl}`;
      document
      .querySelector(`#productList${third}`)
      .addEventListener("change", function () {
         if (this.value == "0") {
            document.querySelector(`#productPrice${third}`).textContent = response.price3[0];
         } else if (this.value == "1") {
            document.querySelector(`#productPrice${third}`).textContent = response.price3[1];
         } else if (this.value == "2") {
            document.querySelector(`#productPrice${third}`).textContent = response.price3[2];
         } else if (this.value == "3") {
            document.querySelector(`#productPrice${third}`).textContent = response.price3[3];
         } else if (this.value == "4") {
            document.querySelector(`#productPrice${third}`).textContent = response.price3[4];
         }
      });
      count += 1;
   }

   if (response.prodn4.length != 0) {
      let forth = count;
      response.prodn4.forEach((element, index) => {
         document.querySelector(`#productList${forth}`).innerHTML += '<option value="' + index + '">' + element + '</option>'
      })
      document.querySelector(`#logo${forth}`).src='./image/reliance.png'
      document.querySelector(`#productPrice${forth}`).textContent = response.price4[0];
      document.querySelector(`#button${forth}`).href = response.url4;
      document
      .querySelector(`#productList${forth}`)
      .addEventListener("change", function () {
         if (this.value == "0") {
            document.querySelector(`#productPrice${forth}`).textContent = response.price4[0];
         } else if (this.value == "1") {
            document.querySelector(`#productPrice${forth}`).textContent = response.price4[1];
         } else if (this.value == "2") {
            document.querySelector(`#productPrice${forth}`).textContent = response.price4[2];
         } else if (this.value == "3") {
            document.querySelector(`#productPrice${forth}`).textContent = response.price4[3];
         } else if (this.value == "4") {
            document.querySelector(`#productPrice${forth}`).textContent = response.price4[4];
         }
      });
   }

   document.querySelector("#loading").style.display = "none";

   document.querySelector("#body").style.display = "block";
}

main();

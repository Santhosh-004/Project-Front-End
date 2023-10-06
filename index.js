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
   document.querySelector("#productPrice").textContent = "₹ " + response.cprice;
   document.querySelector("#productImage").src = response.cpic;

   document.querySelector("#productList1").innerHTML = "";
   document.querySelector("#productList2").innerHTML = "";
   document.querySelector("#productList3").innerHTML = "";

   let count = 1;

   if (response.prodn1 != null) {
      let first = count;
      let fprod = -1;
      let fcount = 0;
      response.prodn1.forEach((element, index) => {
         if (
            response.price1[index] >= response.cprice * 0.8 &&
            response.price1[index] <= response.cprice * 1.2 &&
            fcount < 5 &&
            element.split(" ")[0].toLowerCase() == response.brand.toLowerCase()
         ) {
            if (fprod == -1) {
               fprod = index;
            }
            document.querySelector(`#productList${first}`).innerHTML +=
               '<option value="' +
               index +
               '" class="truncate">' +
               element +
               "</option>";
            fcount += 1;
            console.log(element.split(" ")[0], response.brand);
         }
      });

      document.querySelector(`#logo${first}`).src = "./image/flipkart.png";
      document.querySelector(`#productPrice${first}`).textContent =
         response.price1[fprod];
      console.log(fprod, response.price1[fprod]);
      document.querySelector(`#button${first}`).href = response.url1;
      document
         .querySelector(`#productList${first}`)
         .addEventListener("change", function () {
            if (this.value == "0") {
               document.querySelector(`#productPrice${first}`).textContent =
                  response.price1[0];
            } else if (this.value == "1") {
               document.querySelector(`#productPrice${first}`).textContent =
                  response.price1[1];
            } else if (this.value == "2") {
               document.querySelector(`#productPrice${first}`).textContent =
                  response.price1[2];
            } else if (this.value == "3") {
               document.querySelector(`#productPrice${first}`).textContent =
                  response.price1[3];
            } else if (this.value == "4") {
               document.querySelector(`#productPrice${first}`).textContent =
                  response.price1[4];
            }
         });

      count += 1;
   }

   if (response.prodn2 != null) {
      let scount = 0,
         sprice = [];
      let second = count,
         sprod = -1;
      response.prodn2.forEach((element, index) => {
         if (
            response.price2[index] >= response.cprice * 0.8 &&
            response.price2[index] <= response.cprice * 1.2 &&
            scount < 5 &&
            element.split(" ")[0].toLowerCase() == response.brand.toLowerCase()
         ) {
            if (sprod == -1) {
               sprod = index;
            }
            document.querySelector(`#productList${second}`).innerHTML +=
               '<option value="' +
               index +
               '" class="truncate">' +
               element +
               "</option>";
            scount += 1;
            sprice[index] = response.price2[index];
            console.log(element.split(" ")[0], response.brand);
         }
      });
      document.querySelector(`#logo${second}`).src = "./image/amazon.png";
      document.querySelector(`#productPrice${second}`).textContent =
         response.price2[sprod];
      document.querySelector(`#button${second}`).href = response.url2;
      document
         .querySelector(`#productList${second}`)
         .addEventListener("change", function () {
            if (this.value == "0") {
               document.querySelector(`#productPrice${second}`).textContent =
                  sprice[0];
            } else if (this.value == "1") {
               document.querySelector(`#productPrice${second}`).textContent =
                  sprice[1];
            } else if (this.value == "2") {
               document.querySelector(`#productPrice${second}`).textContent =
                  sprice[2];
            } else if (this.value == "3") {
               document.querySelector(`#productPrice${second}`).textContent =
                  sprice[3];
            } else if (this.value == "4") {
               document.querySelector(`#productPrice${second}`).textContent =
                  sprice[4];
            }
         });
      count += 1;
   }

   if (response.prodn3 != null) {
      let tcount = 0,
         tprice = [];
      let third = count,
         tprod = -1;

      response.prodn3.forEach((element, index) => {
         if (
            response.price3[index] >= response.cprice * 0.8 &&
            response.price3[index] <= response.cprice * 1.2 &&
            tcount < 5 &&
            element.split(" ")[0].toLowerCase() == response.brand.toLowerCase()
         ) {
            if (tprod == -1) {
               tprod = index;
            }
            document.querySelector(`#productList${third}`).innerHTML +=
               '<option value="' +
               index +
               '" class="truncate">' +
               element +
               "</option>";
            tcount += 1;
            tprice.push(response.price3[index]);
         }
      });
      document.querySelector(`#logo${third}`).src = "./image/croma.png";
      document.querySelector(`#productPrice${third}`).textContent =
         response.price3[tprod];
      let newurl = response.bkprod.replace(" ", "%20");
      document.querySelector(
         `#button${third}`
      ).href = `https://www.croma.com/searchB?q=${newurl}%3Arelevance&text=${newurl}`;
      document
         .querySelector(`#productList${third}`)
         .addEventListener("change", function () {
            if (this.value == "0") {
               document.querySelector(`#productPrice${third}`).textContent =
                  tprice[0];
            } else if (this.value == "1") {
               document.querySelector(`#productPrice${third}`).textContent =
                  tprice[1];
            } else if (this.value == "2") {
               document.querySelector(`#productPrice${third}`).textContent =
                  tprice[2];
            } else if (this.value == "3") {
               document.querySelector(`#productPrice${third}`).textContent =
                  tprice[3];
            } else if (this.value == "4") {
               document.querySelector(`#productPrice${third}`).textContent =
                  tprice[4];
            }
         });
      count += 1;
   }

   if (response.prodn4 != null) {
      let forth = count,
         rprice = [],
         rcount = 0,
         fprod = -1;
      response.prodn4.forEach((element, index) => {
         if (
            response.price4[index] >= response.cprice * 0.8 &&
            response.price4[index] <= response.cprice * 1.2 &&
            rcount < 5 &&
            element.split(" ")[0].toLowerCase() == response.brand.toLowerCase()
         ) {
            if (fprod == -1) {
               fprod = index;
            }
            document.querySelector(`#productList${forth}`).innerHTML +=
               '<option value="' +
               rcount +
               '" class="truncate">' +
               element +
               "</option>";
            rcount += 1;
            rprice.push(response.price4[index]);
         }
      });
      document.querySelector(`#logo${forth}`).src = "./image/reliance.png";
      document.querySelector(`#productPrice${forth}`).textContent =
         response.price4[fprod];
      document.querySelector(`#button${forth}`).href = response.url4;
      document
         .querySelector(`#productList${forth}`)
         .addEventListener("change", function () {
            if (this.value == "0") {
               document.querySelector(`#productPrice${forth}`).textContent =
                  rprice[0];
            } else if (this.value == "1") {
               document.querySelector(`#productPrice${forth}`).textContent =
                  rprice[1];
            } else if (this.value == "2") {
               document.querySelector(`#productPrice${forth}`).textContent =
                  rprice[2];
            } else if (this.value == "3") {
               document.querySelector(`#productPrice${forth}`).textContent =
                  rprice[3];
            } else if (this.value == "4") {
               document.querySelector(`#productPrice${forth}`).textContent =
                  rprice[4];
            }
         });
      console.log("reliance", rprice);
   }

   document.querySelector("#loading").style.display = "none";

   document.querySelector("#body").style.display = "block";
}

main();

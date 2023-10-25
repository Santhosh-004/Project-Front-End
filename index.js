let cUrl;

async function getTabUrl() {
	return new Promise((resolve) => {
		chrome.tabs.query({ currentWindow: true, active: true }, async (tabs) => {
			cUrl = await tabs[0].url;
			resolve();
		});
	});
}

function sortArrays(stringsArray, numbersArray) {
	if (
		Array.isArray(stringsArray) &&
		Array.isArray(numbersArray) &&
		stringsArray.length === numbersArray.length
	) {
		const combinedArray = stringsArray.map((str, index) => ({
			str,
			num: numbersArray[index],
		}));
		combinedArray.sort((a, b) => a.num - b.num);
		stringsArray.length = 0;
		numbersArray.length = 0;
		combinedArray.forEach((item) => {
			stringsArray.push(item.str);
			numbersArray.push(item.num);
		});
	} else {
		return "Both inputs should be arrays of the same length.";
	}
}

async function main() {
	await getTabUrl();
	//console.log(cUrl);

	let response = await fetch(`http://localhost:5000/data?site=${cUrl}`);
	response = await response.json();
	console.log(response);
	console.log(response.url3);

	document.querySelector("#productName").textContent = response.bkprod;
	document.querySelector("#productPrice").textContent = "₹ " + response.cprice;
	document.querySelector("#productImage").src = response.cpic;

	document.querySelector("#productList1").innerHTML = "";
	document.querySelector("#productList2").innerHTML = "";
	document.querySelector("#productList3").innerHTML = "";

	let count = 1;
	console.log(response.prodn2);

	if (response.prodn1 != null) {
		let first = count;
		let fcount = 0;
		let fprice = [];
		let product1 = [];
		response.prodn1.forEach((element, index) => {
			if (
				response.price1[index] >= response.cprice * 0.8 &&
				response.price1[index] <= response.cprice * 1.2 &&
				fcount < 5 &&
				element.split(" ")[0].toLowerCase() == response.brand.toLowerCase()
			) {
				fprice.push(response.price1[index]);
				product1.push(element);

				fcount += 1;
				//console.log(element.split(" ")[0], response.brand);
			}
		});

		sortArrays(product1, fprice);
		product1.forEach((element, index) => {
			document.querySelector(`#productList${first}`).innerHTML +=
				'<option value="' +
				index +
				'" class="truncate">' +
				element +
				"</option>";
		});

		document.querySelector(`#logo${first}`).src = "./image/flipkart.png";
		document.querySelector(`#productPrice${first}`).textContent = fprice[0];
		//console.log(fprod, response.price1[fprod]);
		document.querySelector(`#button${first}`).href = response.url1;
		//document.querySelector(`#button${first}`).innerHTML = "url provided";
		console.log("URL placed in flipkart");
		document
			.querySelector(`#productList${first}`)
			.addEventListener("change", function () {
				if (this.value == "0") {
					document.querySelector(`#productPrice${first}`).textContent =
						fprice[0];
				} else if (this.value == "1") {
					document.querySelector(`#productPrice${first}`).textContent =
						fprice[1];
				} else if (this.value == "2") {
					document.querySelector(`#productPrice${first}`).textContent =
						fprice[2];
				} else if (this.value == "3") {
					document.querySelector(`#productPrice${first}`).textContent =
						fprice[3];
				} else if (this.value == "4") {
					document.querySelector(`#productPrice${first}`).textContent =
						fprice[4];
				}
			});

		count += 1;
	}

	if (response.prodn2 != null) {
		let scount = 0,
			sprice = [];
		let second = count,
			product2 = [];
		response.prodn2.forEach((element, index) => {
			if (
				response.price2[index] >= response.cprice * 0.8 &&
				response.price2[index] <= response.cprice * 1.2 &&
				scount < 5 &&
				(element.split(" ")[0].toLowerCase() ==
					response.brand.toLowerCase() ||
					element.split(" ")[1].toLowerCase() ==
						response.brand.toLowerCase())
			) {

				sprice.push(response.price2[index]);
				product2.push(element);
				scount += 1;
			}
		});

		sortArrays(product2, sprice);
		product2.forEach((element, index) => {
			document.querySelector(`#productList${second}`).innerHTML +=
				'<option value="' +
				index +
				'" class="truncate">' +
				element +
				"</option>";
		});

		document.querySelector(`#logo${second}`).src = "./image/amazon.png";
		document.querySelector(`#productPrice${second}`).textContent =
			sprice[0];
		document.querySelector(`#button${second}`).href = response.url2;
		//document.querySelector(`#button${second}`).innerHTML = "url provided";
		console.log("URL placed in amazon");
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
			product3 = [];

		response.prodn3.forEach((element, index) => {
			if (
				response.price3[index] >= response.cprice * 0.8 &&
				response.price3[index] <= response.cprice * 1.2 &&
				tcount < 5 &&
				element.split(" ")[0].toLowerCase() == response.brand.toLowerCase()
			) {
				
				tcount += 1;
				tprice.push(response.price3[index]);
				product3.push(element);
			}
		});

		sortArrays(product3, tprice);
		product3.forEach((element, index) => {
			document.querySelector(`#productList${third}`).innerHTML +=
				'<option value="' +
				index +
				'" class="truncate">' +
				element +
				"</option>";
		});

		document.querySelector(`#logo${third}`).src = "./image/croma.png";
		document.querySelector(`#productPrice${third}`).textContent =
			tprice[0];
		document.querySelector(`#button${third}`).href = response.url3;
		//document.querySelector(`#button${third}`).innerHTML = "url provided";
		console.log("URL placed in croma");
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
			product4 = [];
		response.prodn4.forEach((element, index) => {
			if (
				response.price4[index] >= response.cprice * 0.8 &&
				response.price4[index] <= response.cprice * 1.2 &&
				rcount < 5 &&
				element.split(" ")[0].toLowerCase() == response.brand.toLowerCase()
			) {
				rcount += 1;
				rprice.push(response.price4[index]);
				product4.push(element);
			}
		});

		sortArrays(product4, rprice);
		product4.forEach((element, index) => {
			document.querySelector(`#productList${forth}`).innerHTML +=
				'<option value="' +
				index +
				'" class="truncate">' +
				element +
				"</option>";
		})

		document.querySelector(`#logo${forth}`).src = "./image/reliance.png";
		document.querySelector(`#productPrice${forth}`).textContent =
			rprice[0];
		document.querySelector(`#button${forth}`).href = response.url4;
		//document.querySelector(`#button${forth}`).innerHTML = "url provided";
		console.log("URL placed in reliance");
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
		//console.log("reliance", rprice);
	}

	document.querySelector("#loading").style.display = "none";

	document.querySelector("#body").style.display = "block";
}

main();

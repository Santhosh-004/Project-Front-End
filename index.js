document.querySelector("#productName").textContent = "realme narzo 60 5G (Mars Orange,8GB+128GB)";
document.querySelector("#productImage").src = "https://m.media-amazon.com/images/I/8195A49fZbL._SL1500_.jpg"

document.querySelector("#productList1").addEventListener("change", function(){
    if (this.value == "volvo"){
        document.querySelector("#productPrice1").textContent = 10000;
    }
    else if (this.value == "saab"){
        document.querySelector("#productPrice1").textContent = 20000;
    }
    else if (this.value == "mercedes"){
        document.querySelector("#productPrice1").textContent = 30000;
    }
});

document.querySelector("#productList2").addEventListener("change", function(){
    if (this.value == "volvo"){
        document.querySelector("#productPrice2").textContent = 10000;
    }
    else if (this.value == "saab"){
        document.querySelector("#productPrice2").textContent = 20000;
    }
    else if (this.value == "mercedes"){
        document.querySelector("#productPrice2").textContent = 30000;
    }
});

document.querySelector("#productList3").addEventListener("change", function(){
    if (this.value == "volvo"){
        document.querySelector("#productPrice3").textContent = 10000;
    }
    else if (this.value == "saab"){
        document.querySelector("#productPrice3").textContent = 20000;
    }
    else if (this.value == "mercedes"){
        document.querySelector("#productPrice3").textContent = 30000;
    }
});
console.log("Hello");
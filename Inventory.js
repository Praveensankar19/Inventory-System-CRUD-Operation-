let data = [
    {id: 1, ItemNo: 12, ProductName: 'chocolate', Instock: 300, Price: 200, Rating: 4.5},
    {id: 2, ItemNo: 15, ProductName: 'shirt', Instock: 500, Price: 999, Rating: 4},
    {id: 3, ItemNo: 16, ProductName: 'phone', Instock: 700, Price: 20000, Rating: 5}
];

function readAll() {

    // if (localStorage.getItem("object")) {
        
    // } else {
    //     localStorage.setItem("object", JSON.stringify(data));
    // }

    if(!localStorage.getItem("object")) {
        localStorage.setItem("object", JSON.stringify(data));
    }

    let tabledata = document.querySelector(".datalink");
    let object = localStorage.getItem("object");
    let objectdata = JSON.parse(object);
    let element = "";

    objectdata.forEach(record => {
        element += `<tr>
            <td>${record.ItemNo}</td>
            <td>${record.ProductName}</td>
            <td>${record.Instock}</td>
            <td>${record.Price}</td>
            <td>${record.Rating}</td>
            <td>
                <button onclick="updateProduct(${record.id})" class="btn btn-info">Update</button>
                <button onclick="deleteProduct(${record.id})" class="btn btn-danger">Delete</button>
            </td>
        </tr>`;
    });

    tabledata.innerHTML = element;
}

// let a = 10;
// let b = 120;
// let c = 11;

// let  a = 10,
// b = 120,
// c = 11;

function add() {
    let itemno = document.querySelector("#itemno").value;
    let productname = document.querySelector("#productname").value;
    let instock = document.querySelector("#instock").value;
    let price = document.querySelector("#price").value;
    let rating = document.querySelector("#rating").value;

    if (!itemno || !productname || !instock || !price || !rating) {
        alert("Please fill in all fields.");
        return;
    }

    let object = localStorage.getItem("object");
    let objectdata = JSON.parse(object);

    let newId = objectdata.length ? objectdata[objectdata.length - 1].id + 1 : 1;

    // let objLength = objectdata.length;
    // let lastElementId = objectdata[objLength - 1].id;
    // let newIds = lastElementId + 1;
    // console.log(newIds);

    // if(objectdata.length > 0) {
    //     // last id + 1
    // } else {
    //     // new id is 1
    // }

    // length>0 ? true : false

    let newobj = {
        id: newId,
        ItemNo: itemno,
        ProductName: productname,
        Instock: instock,
        Price: price,
        Rating: rating
    };

    objectdata.push(newobj);
    localStorage.setItem("object", JSON.stringify(objectdata));

    clearFields();

    readAll();
}

function deleteProduct(id) {
    // let object = localStorage.getItem("object");
    // let objectdata = JSON.parse(object);

    // objectdata = objectdata.filter(product => product.id !== id);

    // localStorage.setItem("object", JSON.stringify(objectdata));
    // readAll();
     let confirmDelete = confirm("Are you sure you want to delete this product?");
    
        if (confirmDelete) {
            let object = localStorage.getItem("object");
            let objectdata = JSON.parse(object);
    
            // Filter out the product with the specified id
            objectdata = objectdata.filter(product => product.id !== id);
    
            // Update localStorage with the new data
            localStorage.setItem("object", JSON.stringify(objectdata));
    
            // Refresh the displayed data
            readAll();
        }    
}

function updateProductInStorage(id, updatedProduct) {
    let object = localStorage.getItem("object");
    let objectdata = JSON.parse(object);

    objectdata = objectdata.map(product => 
        product.id === id ? { ...product, ...updatedProduct } : product
    );

    localStorage.setItem("object", JSON.stringify(objectdata));
    readAll();
}

function updateProduct(id) {
    clearFields();
    let object = localStorage.getItem("object");
    let objectdata = JSON.parse(object);
    let product = objectdata.find(item => item.id === id);

    if (product) {
        document.querySelector("#itemno").value = product.ItemNo;
        document.querySelector("#productname").value = product.ProductName;
        document.querySelector("#instock").value = product.Instock;
        document.querySelector("#price").value = product.Price;
        document.querySelector("#rating").value = product.Rating;

        let modal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
        modal.show();

        document.getElementById("addlist").onclick = function() {
            let updatedProduct = {
                ItemNo: document.querySelector("#itemno").value,
                ProductName: document.querySelector("#productname").value,
                Instock: parseInt(document.querySelector("#instock").value),
                Price: parseFloat(document.querySelector("#price").value),
                Rating: parseFloat(document.querySelector("#rating").value)
            };

            updateProductInStorage(id, updatedProduct);

            modal.hide();

            document.getElementById("addlist").onclick = add;
        };
    }
}

function clearFields() {
    document.querySelector("#itemno").value = "";
    document.querySelector("#productname").value = "";
    document.querySelector("#instock").value = "";
    document.querySelector("#price").value = "";
    document.querySelector("#rating").value = "";
}




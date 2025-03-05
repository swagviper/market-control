const API_URL = "http://localhost:8080/products/";
const productForm = document.getElementById("productForm");
const productTable = document.getElementById("productTable");

// Carregar produtos ao iniciar
document.addEventListener("DOMContentLoaded", loadProducts);

// Adicionar/Atualizar Produto
productForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const product = {
        id: document.getElementById("productId").value || null,
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        price: parseFloat(document.getElementById("price").value),
        quantity: parseInt(document.getElementById("quantity").value),
        category: document.getElementById("category").value
    };

    const method = product.id ? "PUT" : "POST";
    const url = product.id ? `http://localhost:8080/products/${product.id}` : API_URL;

    try {
        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        });

        if (response.ok) {
            loadProducts();
            clearForm();
            Swal.fire({
                icon: 'success',
                title: 'Sucesso!',
                text: 'Produto salvo com sucesso!',
                confirmButtonText: 'OK',
                confirmButtonColor: '#007bff',
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'Erro ao salvar produto.',
                confirmButtonText: 'OK',
                confirmButtonColor: '#dc3545',
            });
        }
    } catch (error) {
        console.error("Erro:", error);
        Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: 'Ocorreu um erro ao processar a solicitação.',
            confirmButtonText: 'OK',
            confirmButtonColor: '#dc3545',
        });
    }
});

// Carregar Produtos
async function loadProducts() {
    try {
        const response = await fetch(API_URL);
        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.error("Erro ao carregar produtos:", error);
        Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: 'Erro ao carregar produtos.',
            confirmButtonText: 'OK',
            confirmButtonColor: '#dc3545',
        });
    }
}

// Renderizar Produtos na Tabela
function renderProducts(products) {
    productTable.innerHTML = products.map(product => `
        <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td>R$ ${product.price.toFixed(2)}</td>
            <td>${product.quantity}</td>
            <td>${product.category}</td>
            <td>
                <button class="btn btn-sm btn-warning" onclick="editProduct(${product.id})">Editar</button>
                <button class="btn btn-sm btn-danger" onclick="deleteProduct(${product.id})">Excluir</button>
            </td>
        </tr>
    `).join("");
}

// Editar Produto
async function editProduct(id) {
    try {
        const response = await fetch(`http://localhost:8080/products/${id}`);
        const product = await response.json();

        document.getElementById("productId").value = product.id;
        document.getElementById("name").value = product.name;
        document.getElementById("description").value = product.description;
        document.getElementById("price").value = product.price;
        document.getElementById("quantity").value = product.quantity;
        document.getElementById("category").value = product.category;
    } catch (error) {
        console.error("Erro ao editar produto:", error);
        Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: 'Erro ao carregar dados do produto.',
            confirmButtonText: 'OK',
            confirmButtonColor: '#dc3545',
        });
    }
}

// Excluir Produto
async function deleteProduct(id) {
    Swal.fire({
        title: 'Tem certeza?',
        text: "Você não poderá reverter isso!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#007bff',
        cancelButtonColor: '#dc3545',
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar'
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const url = `http://localhost:8080/products/${id}`;
                console.log("URL do DELETE:", url);

                const response = await fetch(url, {
                    method: "DELETE"
                });

                if (response.ok) {
                    console.log("Produto excluído com sucesso!");
                    loadProducts();
                    Swal.fire({
                        icon: 'success',
                        title: 'Excluído!',
                        text: 'Produto excluído com sucesso.',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#007bff',
                    });
                } else {
                    const errorText = await response.text();
                    console.error("Erro ao excluir produto:", errorText);
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro!',
                        text: `Erro ao excluir produto: ${errorText}`,
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#dc3545',
                    });
                }
            } catch (error) {
                console.error("Erro:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Erro!',
                    text: 'Ocorreu um erro ao excluir o produto.',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#dc3545',
                });
            }
        }
    });
}

// Limpar Formulário
function clearForm() {
    productForm.reset();
    document.getElementById("productId").value = "";
}

console.log(`
%c👋 Olá, dev curioso!

%cGostou do site? Vamos conversar!
Entre em contato: devswagviper@gmail.com

`,
'font-size: 20px; font-weight: bold;',
'font-size: 16px;');
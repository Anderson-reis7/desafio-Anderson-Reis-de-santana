class CaixaDaLanchonete {
    constructor() {
        this.menu = [
            { codigo: 'cafe', descricao: 'Café', valor: 3.00 },
            { codigo: 'chantily', descricao: 'Chantily (extra do Café)', valor: 1.50 },
            { codigo: 'suco', descricao: 'Suco Natural', valor: 6.20 },
            { codigo: 'sanduiche', descricao: 'Sanduíche', valor: 6.50 },
            { codigo: 'queijo', descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
            { codigo: 'salgado', descricao: 'Salgado', valor: 7.25 },
            { codigo: 'combo1', descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
            { codigo: 'combo2', descricao: '1 Café e 1 Sanduíche', valor: 7.50 },
        ];
    }
  
    calcularValorDaCompra(formaDePagamento, itens) {
        if (!['dinheiro', 'debito', 'credito'].includes(formaDePagamento)) {
            return 'Forma de pagamento inválida!';
        }
  
        if (!Array.isArray(itens) || itens.length === 0) {
            return 'Não há itens no carrinho de compra!';
        }
  
        // iniciando valores //
        let valorTotal = 0;
        let itemPrincipal = false;
        let itemSanduiche = false;
        let itemCafe = false;
        let itemQueijo = false;
        let itemChantily = false;
        let mensagem = 'Item extra não pode ser pedido sem o principal';
  
        for (const itemStr of itens) {
            const [codigo, quantidade] = itemStr.split(',');
            const quantidadeInt = parseInt(quantidade);
            const menuItem = this.menu.find(menuItem => menuItem.codigo === codigo);
  
            if (quantidadeInt <= 0) {
                return 'Quantidade inválida!';
            }
  
            if (!menuItem) {
                return 'Item inválido!';
            }
  
            if (!menuItem.descricao.includes('extra')) {
                itemPrincipal = true;
            }
  
  
            // atribuido 'id' para os itens do menu //
            if (menuItem.codigo === 'sanduiche') {
                itemSanduiche = true;
            } else if (menuItem.codigo === 'cafe') {
                itemCafe = true;
            } else if (menuItem.codigo === 'queijo') {
                itemQueijo = true;
            } else if (menuItem.codigo === 'chantily') {
                itemChantily = true;
            }
  
            valorTotal += menuItem.valor * quantidadeInt;
        }
  
        // regra de negócio //
        if (formaDePagamento === 'dinheiro') {
            valorTotal *= 0.95; // 5% de desconto
        } else if (formaDePagamento === 'credito') {
            valorTotal *= 1.03; // 3% de acréscimo
        }
        
        // criando regra de pedido extra //
        if (itemQueijo && !itemSanduiche){
            return mensagem;}
  
        else if (itemChantily && !itemCafe){
            return mensagem;}
  
        else if (itemSanduiche && !itemQueijo){
            return mensagem;}
  
        return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
    }
  }
  
  export { CaixaDaLanchonete };
  
  // Exemplos de uso
  const caixa = new CaixaDaLanchonete();
  
  const exemplo1 = caixa.calcularValorDaCompra('debito', ['queijo,1']);
  console.log(exemplo1); // Resultado esperado: "Item extra não pode ser pedido sem o principal"
  
  const exemplo2 = caixa.calcularValorDaCompra('debito', ['sanduiche,1','queijo,1']);
  console.log(exemplo2); // Resultado esperado: Valor total da compra
  
  const exemplo3 = caixa.calcularValorDaCompra('credito', ['chantily,1']);
  console.log(exemplo3); // Resultado esperado: "Item extra não pode ser pedido sem o principal"
  
  const exemplo4 = caixa.calcularValorDaCompra('credito', ['cafe,1','chantily,1']);
  console.log(exemplo4); // Resultado esperado: Valor total da compra
(() => {
  const KEY = 'lista-compras:v2';

  // Ordem já agrupada por local de compra: combos, mercado/atacado, embalagens.
  const ITENS = [
    [1, 'Caixa 35 (combo família)'],
    [4, 'Caixa 25 (combo duplo)'],
    [1, 'H2'],
    [5, 'Pack 1L guaraná'],
    [1, 'Pack 2L guaraná'],
    [1, 'Pack Coca-Cola lata'],
    [1, 'Pack Coca-Cola lata zero'],
    [3, 'Caixa de hambúrguer'],
    [1, 'Pacote de nugget'],
    [2, 'Pacote de bacon'],
    [1, 'Peça de queijo cheddar'],
    [7, 'Pacote de pão'],
    [2, 'Caixa de ketchup'],
    [1, 'Billyjack'],
    [2, 'Papel acoplado'],
    [4, 'Pacote de batata'],
    [1, 'Kraft médio'],
  ];

  let feitos = new Set();
  try {
    const raw = JSON.parse(localStorage.getItem(KEY));
    if (Array.isArray(raw)) feitos = new Set(raw);
  } catch (_) {}

  const save = () => {
    try { localStorage.setItem(KEY, JSON.stringify([...feitos])); } catch (_) {}
  };

  const lista = document.querySelector('#lista');

  lista.innerHTML = ITENS.map(([qtd, nome], i) => `
    <li class="item${feitos.has(i) ? ' feito' : ''}">
      <label>
        <input type="checkbox" data-i="${i}"${feitos.has(i) ? ' checked' : ''}>
        <span class="qtd">${qtd}×</span><span>${nome}</span>
      </label>
    </li>`).join('');

  function resumo() {
    const n = feitos.size;
    document.querySelector('#resumo').textContent = `${n} de ${ITENS.length} itens`;
    const p = document.querySelector('#progresso');
    p.max = ITENS.length;
    p.value = n;
  }

  lista.addEventListener('change', (e) => {
    const cb = e.target;
    const i = Number(cb.dataset.i);
    cb.checked ? feitos.add(i) : feitos.delete(i);
    cb.closest('.item').classList.toggle('feito', cb.checked);
    save();
    resumo();
  });

  resumo();
})();

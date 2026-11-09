(() => {
  const KEY = 'lista-compras:v7';

  // Ordem agrupada por categoria: bebidas, frios/congelados, pães e molhos, combos, embalagens.
  const ITENS = [
    [7, 'Packs de guaraná 1L'],
    [3, 'Packs de guaraná 2L'],
    [1, 'Pack de Coca-Cola lata 350ml'],
    [1, 'Queijo cheddar (peça)'],
    [2, 'Pacotes de bacon'],
    [4, 'Pacotes de nugget'],
    [4, 'Pacotes de anéis de cebola'],
    [5, 'Pacotes de batata'],
    [5, 'Caixas de hambúrguer'],
    [14, 'Pacotes de pão'],
    [2, 'Caixas de ketchup'],
    [1, 'Billy Jack'],
    [1, 'Caixa de combo 20 (solo)'],
    [1, 'Caixa de combo 30 (trio)'],
    [3, 'Caixas de combo 35 (família)'],
    [5, 'Caixas de combo 25 (duplo)'],
    [1, 'Caixa H1'],
    [1, 'Caixa H2'],
    [3, 'Durex (fita transparente)'],
    [1, 'Bobina'],
    [3, 'Papéis acoplados'],
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

(() => {
  const KEY = 'lista-compras:v4';

  // Ordem agrupada por categoria: bebidas, frios/congelados, pães e molhos, combos, embalagens.
  const ITENS = [
    [1, 'Pack de Guaravita'],
    [6, 'Packs de guaraná 1L'],
    [2, 'Packs de guaraná 2L'],
    [1, 'Pack de Coca-Cola 2L'],
    [1, 'Peça de queijo cheddar'],
    [2, 'Peças de bacon'],
    [3, 'Pacotes de nugget'],
    [3, 'Pacotes de anéis de cebola'],
    [5, 'Pacotes de batata'],
    [5, 'Caixas de hambúrguer'],
    [11, 'Pacotes de pão'],
    [3, 'Caixas de ketchup'],
    [1, 'Billy Jack'],
    [1, 'Caixa de combo 35'],
    [4, 'Caixas de combo 25'],
    [2, 'Bobinas de cartão'],
    [2, 'Fitas transparentes'],
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

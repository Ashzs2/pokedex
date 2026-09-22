async function buscarPokemon() {
  const input = document.getElementById('pokemonInput').value.toLowerCase().trim();
  const nomeEl = document.getElementById('pokeNome');
  const imgEl = document.getElementById('pokeImg');
  const typeEl = document.getElementById('pokeType');
  const medidasEl = document.getElementById('pokeMedidas');
  const habEl = document.getElementById('pokeHabilidades');
  const statusEl = document.getElementById('pokeStatus');

  if (!input) return;

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
    
    if (!response.ok) {
      throw new Error('Não encontrado');
    }

    const data = await response.json();

    nomeEl.innerText = `#${data.id} - ${data.name.toUpperCase()}`;
    
    imgEl.src = data.sprites.front_default;
    imgEl.style.display = 'block';
    
    const tipos = data.types.map(t => t.type.name).join(', ');
    typeEl.innerText = `Tipo(s): ${tipos}`;

    medidasEl.innerText = `Altura: ${data.height / 10}m | Peso: ${data.weight / 10}kg`;

    const habilidades = data.abilities.map(a => a.ability.name).join(', ');
    habEl.innerText = `Habilidades: ${habilidades}`;

    const hp = data.stats.find(s => s.stat.name === 'hp').base_stat;
    const atk = data.stats.find(s => s.stat.name === 'attack').base_stat;
    const def = data.stats.find(s => s.stat.name === 'defense').base_stat;
    const vel = data.stats.find(s => s.stat.name === 'speed').base_stat;

    statusEl.innerHTML = `
      <strong>Status:</strong><br>
      • HP: ${hp}<br>
      • Ataque: ${atk}<br>
      • Defesa: ${def}<br>
      • Velocidade: ${vel}
    `;

  } catch (error) {
    nomeEl.innerText = 'Pokémon não encontrado!';
    imgEl.style.display = 'none';
    typeEl.innerText = '';
    medidasEl.innerText = '';
    habEl.innerText = '';
    statusEl.innerHTML = '';
  }
}
// app.js — versión ESTÁTICA para GitHub Pages.
// No hay servidor: cada publicación se guarda en el localStorage de este
// navegador. Requiere que seed-data.js se cargue antes que este archivo.

const STORAGE_KEY = 'cifraRepoTeams';

const state = {
  teams: [],
  activeTeamId: 1,
  activeFile: 'js',
};

const FILE_LABELS = { js: 'index.js', html: 'index.html', css: 'style.css' };
const HLJS_LANG = { js: 'javascript', html: 'xml', css: 'css' };

function loadTeams() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      state.teams = JSON.parse(raw).teams;
      renderTeamList();
      renderWorkspace();
      return;
    } catch {
      // datos corruptos en localStorage: seguimos y usamos el seed
    }
  }
  state.teams = JSON.parse(JSON.stringify(SEED_TEAMS.teams));
  persist();
  renderTeamList();
  renderWorkspace();
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ teams: state.teams }));
}

function getActiveTeam() {
  return state.teams.find((t) => t.id === state.activeTeamId);
}

function teamHasAnyCode(team) {
  return Object.values(team.files).some((f) => f && f.trim().length > 0);
}

function renderTeamList() {
  const list = document.getElementById('team-list');
  list.innerHTML = '';

  state.teams.forEach((team) => {
    const li = document.createElement('li');
    li.className = 'team-item' + (team.id === state.activeTeamId ? ' active' : '');

    const btn = document.createElement('button');
    btn.className = 'team-btn';
    btn.type = 'button';
    btn.dataset.id = String(team.id);
    btn.innerHTML = `
      <span class="team-dot ${teamHasAnyCode(team) ? 'has-code' : ''}" aria-hidden="true"></span>
      <span class="team-name">${team.name}</span>
    `;
    btn.addEventListener('click', () => {
      state.activeTeamId = team.id;
      renderTeamList();
      renderWorkspace();
    });

    li.appendChild(btn);
    list.appendChild(li);
  });
}

function renderWorkspace() {
  const team = getActiveTeam();

  document.querySelectorAll('.tab').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.file === state.activeFile);
  });

  document.getElementById('active-filename').textContent = FILE_LABELS[state.activeFile];

  const content = team.files[state.activeFile] || '';
  const codeEl = document.getElementById('code-view');
  codeEl.className = `language-${HLJS_LANG[state.activeFile]}`;
  codeEl.textContent = content || `/* ${team.name} todavía no publicó ${FILE_LABELS[state.activeFile]}. */`;
  if (window.hljs) window.hljs.highlightElement(codeEl);

  document.getElementById('publish-status').textContent = team.updatedAt
    ? `Última publicación: ${new Date(team.updatedAt).toLocaleString('es-MX')}`
    : 'Sin publicaciones todavía';

  document.getElementById('publish-team-name').textContent = team.name;
  document.getElementById('publish-file-name').textContent = FILE_LABELS[state.activeFile];
  document.getElementById('publish-textarea').value = content;
  document.getElementById('publish-feedback').textContent = '';
}

document.getElementById('file-tabs').addEventListener('click', (e) => {
  const btn = e.target.closest('.tab');
  if (!btn) return;
  state.activeFile = btn.dataset.file;
  renderWorkspace();
});

document.getElementById('publish-btn').addEventListener('click', () => {
  const team = getActiveTeam();
  const content = document.getElementById('publish-textarea').value;
  const feedback = document.getElementById('publish-feedback');

  team.files[state.activeFile] = content;
  team.updatedAt = new Date().toISOString();
  persist();

  renderTeamList();
  renderWorkspace();
  feedback.textContent = 'Publicado (guardado en este navegador).';
});

document.getElementById('reset-btn').addEventListener('click', () => {
  const ok = confirm('Esto borra lo publicado en este navegador y regresa al código original de cada equipo. ¿Continuar?');
  if (!ok) return;
  localStorage.removeItem(STORAGE_KEY);
  loadTeams();
});

loadTeams();

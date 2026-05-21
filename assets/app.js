const user = "gsrodriguesz";
const repo = "algorithm-notebook";
const branch = "main";

// DOM Elements
const explorerParams = {
    container: document.getElementById('file-explorer'),
    loadingState: document.querySelector('.loading-state')
};
const domInfo = document.getElementById('repo-info');
const breadcrumbs = document.getElementById('breadcrumbs');
const githubLink = document.getElementById('github-link');
const screens = {
    welcome: document.getElementById('welcome-screen'),
    viewer: document.getElementById('content-viewer'),
    markdown: document.getElementById('markdown-body'),
    code: document.getElementById('code-body'),
    codeContent: document.getElementById('code-content'),
    loading: document.getElementById('file-loading')
};

function getFileExtension(filename) {
    return filename.split('.').pop().toLowerCase();
}

function getLanguageClass(extension) {
    const map = {
        'js': 'javascript',
        'ts': 'typescript',
        'py': 'python',
        'html': 'html',
        'css': 'css',
        'json': 'json',
        'cpp': 'cpp',
        'c': 'cpp',
        'cs': 'cpp',
        'java': 'csharp',
        'sql': 'sql',
        'md': 'markdown'
    };
    return map[extension] || 'plaintext';
}

async function loadRepo() {
    domInfo.innerText = `${user}/${repo}`;
    try {
        const response = await fetch(`https://api.github.com/repos/${user}/${repo}/git/trees/${branch}?recursive=1`);
        if (!response.ok) throw new Error('Failed to fetch repository');
        const data = await response.json();

        explorerParams.container.innerHTML = '';
        createTree(data.tree);
    } catch (err) {
        explorerParams.container.innerHTML = `<div class="error-state">Error: ${err.message}</div>`;
    }
}

function createTree(files) {
    const structure = {};
    files.forEach(file => {
        // Apenas arquivos (blobs) constroem a estrutura, ignoramos type="tree"
        if (file.type !== "blob") return;
        
        // Esconde as pastas e arquivos indesejados
        if (file.path.startsWith('assets/') || file.path === 'index.html' || file.path === 'assets') return;

        const parts = file.path.split("/");
        let current = structure;
        parts.forEach((part, index) => {
            if (index === parts.length - 1) {
                current[part] = { ...file, _isFile: true };
            } else {
                current[part] ??= {};
                current = current[part];
            }
        });
    });

    const rootUl = document.createElement("ul");
    rootUl.className = "tree-item";
    renderTree(structure, rootUl);
    explorerParams.container.appendChild(rootUl);
}

function renderTree(obj, parent) {
    // Sort logic: Folders first, then files, alphabetically
    const keys = Object.keys(obj).sort((a, b) => {
        const aIsFile = !!obj[a]._isFile;
        const bIsFile = !!obj[b]._isFile;
        if (aIsFile === bIsFile) return a.localeCompare(b);
        return aIsFile ? 1 : -1;
    });

    keys.forEach(key => {
        const value = obj[key];
        const li = document.createElement("li");

        const node = document.createElement("div");
        node.className = "tree-node";

        if (value._isFile) {
            // It's a file
            node.classList.add("file-node");
            node.innerHTML = `
                <span class="icon">
                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                </span>
                <span class="name">${key}</span>
            `;
            node.onclick = () => {
                document.querySelectorAll('.tree-node.active').forEach(el => el.classList.remove('active'));
                node.classList.add('active');
                loadFile(value.path);
            };
            li.appendChild(node);
        } else {
            // It's a folder
            node.classList.add("folder-node");
            node.innerHTML = `
                <span class="icon">
                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="folder-closed"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                </span>
                <span class="name">${key}</span>
            `;

            const childrenContainer = document.createElement("ul");
            childrenContainer.className = "tree-item tree-children";

            node.onclick = () => {
                childrenContainer.classList.toggle('open');
            };

            renderTree(value, childrenContainer);
            li.appendChild(node);
            li.appendChild(childrenContainer);
        }

        parent.appendChild(li);
    });
}

function updateBreadcrumbs(path) {
    const parts = path.split('/');
    let html = '<span class="crumb">repo</span><span class="separator">/</span>';
    parts.forEach((p, i) => {
        const isLast = i === parts.length - 1;
        html += `<span class="crumb ${isLast ? 'active' : ''}">${p}</span>`;
        if (!isLast) html += '<span class="separator">/</span>';
    });
    breadcrumbs.innerHTML = html;
}

async function loadFile(path) {
    // UI Updates
    screens.welcome.classList.add('hidden');
    screens.viewer.classList.remove('hidden');
    screens.loading.classList.remove('hidden');
    screens.markdown.classList.add('hidden');
    screens.code.classList.add('hidden');

    updateBreadcrumbs(path);
    githubLink.href = `https://github.com/${user}/${repo}/blob/${branch}/${path}`;
    githubLink.style.pointerEvents = 'auto';
    githubLink.style.opacity = '1';
    githubLink.removeAttribute('disabled');

    try {
        const rawURL = `https://raw.githubusercontent.com/${user}/${repo}/${branch}/${path}`;
        const response = await fetch(rawURL);
        const text = await response.text();

        const ext = getFileExtension(path);

        if (ext === 'md') {
            screens.markdown.innerHTML = marked.parse(text);
            screens.markdown.classList.remove('hidden');

            // Highlight code blocks inside markdown
            screens.markdown.querySelectorAll('pre code').forEach((block) => {
                Prism.highlightElement(block);
            });
        } else {
            const lang = getLanguageClass(ext);
            screens.codeContent.className = `language-${lang}`;
            screens.codeContent.textContent = text;

            screens.code.classList.remove('hidden');
            Prism.highlightElement(screens.codeContent);
        }
    } catch (err) {
        screens.codeContent.className = 'language-plaintext';
        screens.codeContent.textContent = `Error loading file: ${err.message}`;
        screens.code.classList.remove('hidden');
    } finally {
        screens.loading.classList.add('hidden');
    }
}

// Init
loadRepo();
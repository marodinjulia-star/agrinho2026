// ===== SCRIPT: RAÍZES DO FUTURO =====
// Funcionalidades: quiz educativo + dicas sustentáveis + acessibilidade

// 1. DADOS DO QUIZ (perguntas e respostas sobre solo e agrotóxicos)
const perguntasQuiz = [
    {
        pergunta: "O que acontece quando usamos agrotóxicos em excesso no solo?",
        opcoes: [
            "Aumenta a vida dos microrganismos",
            "Contamina a água e mata organismos benéficos",
            "Deixa o solo mais fértil para sempre"
        ],
        correta: 1
    },
    {
        pergunta: "Qual prática ajuda a conservar o solo e reduzir o uso de químicos?",
        opcoes: [
            "Queimar a palhada antes do plantio",
            "Usar adubação orgânica e rotação de culturas",
            "Aplicar defensivos agrícolas toda semana"
        ],
        correta: 1
    },
    {
        pergunta: "O que é erosão do solo?",
        opcoes: [
            "Perda de nutrientes e terra por ação da água ou vento",
            "Crescimento acelerado das plantas",
            "Adição de fertilizantes químicos"
        ],
        correta: 0
    },
    {
        pergunta: "Qual destes é um controle biológico de pragas?",
        opcoes: [
            "Roundup (glifosato)",
            "Joaninha que come pulgões",
            "Queimadas controladas"
        ],
        correta: 1
    }
];

let respostasUsuario = new Array(perguntasQuiz.length).fill(null);

// 2. FUNÇÃO PARA EXIBIR O QUIZ NA TELA
function carregarQuiz() {
    const quizContainer = document.getElementById("quizContainer");
    if (!quizContainer) return;
    
    quizContainer.innerHTML = "";
    
    perguntasQuiz.forEach((item, idx) => {
        const divPergunta = document.createElement("div");
        divPergunta.classList.add("pergunta");
        divPergunta.innerHTML = `<p>${idx + 1}. ${item.pergunta}</p>`;
        
        item.opcoes.forEach((opcao, opIdx) => {
            const radioId = `pergunta${idx}_opcao${opIdx}`;
            const isChecked = (respostasUsuario[idx] === opIdx);
            
            divPergunta.innerHTML += `
                <label>
                    <input type="radio" name="pergunta${idx}" value="${opIdx}" ${isChecked ? 'checked' : ''}>
                    ${opcao}
                </label>
            `;
        });
        
        quizContainer.appendChild(divPergunta);
    });
    
    // Adiciona eventos para salvar respostas
    const botoesRadio = document.querySelectorAll('input[type="radio"]');
    botoesRadio.forEach(radio => {
        radio.addEventListener('change', (e) => {
            const name = e.target.name; // pergunta0, pergunta1...
            const perguntaIndex = parseInt(name.replace('pergunta', ''));
            const valor = parseInt(e.target.value);
            respostasUsuario[perguntaIndex] = valor;
        });
    });
    
    const btnResultado = document.getElementById("btnVerResultado");
    if (btnResultado) btnResultado.style.display = "block";
}

// 3. FUNÇÃO PARA CALCULAR E MOSTRAR RESULTADO
function calcularResultado() {
    let acertos = 0;
    for (let i = 0; i < perguntasQuiz.length; i++) {
        if (respostasUsuario[i] === perguntasQuiz[i].correta) {
            acertos++;
        }
    }
    
    const resultadoDiv = document.getElementById("resultadoQuiz");
    const total = perguntasQuiz.length;
    let mensagem = "";
    
    if (acertos === total) {
        mensagem = "🌟 Parabéns! Você é um guardião do solo! Continue espalhando boas práticas. 🌟";
    } else if (acertos >= total/2) {
        mensagem = "🌱 Bom trabalho! Você já sabe o básico. Que tal aprender mais sobre agroecologia? 🌱";
    } else {
        mensagem = "🍃 Que tal revisar o conteúdo? Cuidar do solo é essencial para o futuro. Releia as dicas e tente novamente! 🍃";
    }
    
    resultadoDiv.innerHTML = `<p><strong>Você acertou ${acertos} de ${total} perguntas.</strong><br>${mensagem}</p>`;
    resultadoDiv.style.background = "#e9f5e6";
}

// 4. DICAS SUSTENTÁVEIS - ARRAY COM VÁRIAS DICAS
const dicasSustentaveis = [
    "Use composto orgânico (restos de comida e folhas) para adubar a terra.",
    "Plante árvores nativas ao redor das nascentes para proteger a água.",
    "Evite queimadas: a matéria orgânica queimada libera CO₂ e empobrece o solo.",
    "Experimente o plantio direto: não arar a terra reduz a erosão em até 80%.",
    "Cultive feijão, milho e abóbora juntos (consórcio) para aproveitar melhor os nutrientes.",
    "Substitua agrotóxicos por calda de fumo ou óleo de neem – são naturais."
];

function novaDica() {
    const dicaDiv = document.getElementById("dicaSustentavel");
    if (dicaDiv) {
        const indiceAleatorio = Math.floor(Math.random() * dicasSustentaveis.length);
        dicaDiv.innerHTML = `<p>💡 <strong>Dica do dia:</strong> ${dicasSustentaveis[indiceAleatorio]}</p>`;
    }
}

// 5. FUNÇÕES DE ACESSIBILIDADE (FONTE + ALTO CONTRASTE)
let contrasteAtivo = false;

function ajustarFonte(tamanho) {
    const body = document.body;
    let tamanhoAtual = parseFloat(getComputedStyle(body).fontSize);
    let novo = tamanhoAtual + tamanho;
    if (novo >= 12 && novo <= 28) {
        body.style.fontSize = novo + "px";
    }
}

function resetarFonte() {
    document.body.style.fontSize = "";
}

function ativarAltoContraste() {
    contrasteAtivo = !contrasteAtivo;
    if (contrasteAtivo) {
        document.body.classList.add("alto-contraste");
    } else {
        document.body.classList.remove("alto-contraste");
    }
}

// 6. PAINEL DE ACESSIBILIDADE (MOSTRAR/ESCONDER)
function initAcessibilidade() {
    const btnAcess = document.getElementById("acessBtn");
    const painel = document.getElementById("painelAcessibilidade");
    
    if (btnAcess && painel) {
        btnAcess.addEventListener("click", () => {
            if (painel.style.display === "none" || painel.style.display === "") {
                painel.style.display = "flex";
            } else {
                painel.style.display = "none";
            }
        });
    }
    
    const btnAumentar = document.getElementById("aumentarFonte");
    const btnDiminuir = document.getElementById("diminuirFonte");
    const btnContraste = document.getElementById("altoContraste");
    const btnResetar = document.getElementById("resetarAcessibilidade");
    
    if (btnAumentar) btnAumentar.addEventListener("click", () => ajustarFonte(2));
    if (btnDiminuir) btnDiminuir.addEventListener("click", () => ajustarFonte(-2));
    if (btnContraste) btnContraste.addEventListener("click", ativarAltoContraste);
    if (btnResetar) {
        btnResetar.addEventListener("click", () => {
            resetarFonte();
            if (document.body.classList.contains("alto-contraste")) {
                document.body.classList.remove("alto-contraste");
                contrasteAtivo = false;
            }
        });
    }
}

// 7. INICIALIZAÇÃO QUANDO A PÁGINA CARREGAR
document.addEventListener("DOMContentLoaded", () => {
    carregarQuiz();
    
    const btnResultado = document.getElementById("btnVerResultado");
    if (btnResultado) {
        btnResultado.addEventListener("click", calcularResultado);
    }
    
    const btnDica = document.getElementById("btnDica");
    if (btnDica) {
        btnDica.addEventListener("click", novaDica);
    }
    
    initAcessibilidade();
});

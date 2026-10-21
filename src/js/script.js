
const perguntas = [
    {
        pergunta: "Qual é a principal função de um diodo?",
        alternativas: [
            "Armazenar grandes quantidades de energia",
            "Permitir a passagem de corrente principalmente em um sentido",
            "Aumentar sempre a tensão de um circuito",
            "Substituir qualquer resistor"
        ],
        correta: 1
    },
    {
        pergunta: "Qual componente é muito utilizado para emitir luz?",
        alternativas: [
            "Resistor comum",
            "Capacitor",
            "LED",
            "Fusível"
        ],
        correta: 2
    },
    {
        pergunta: "Quais são os três terminais principais de um transistor TBJ?",
        alternativas: [
            "Gate, Drain e Source",
            "Anodo, catodo e base",
            "Entrada, saída e terra",
            "Base, coletor e emissor"
        ],
        correta: 3
    },
    {
        pergunta: "O que significa a sigla MOSFET?",
        alternativas: [
            "Um tipo de circuito de iluminação",
            "Um transistor de efeito de campo",
            "Um tipo de bateria recarregável",
            "Um componente usado somente em áudio"
        ],
        correta: 1
    },
    {
        pergunta: "Qual é uma função comum de um MOSFET?",
        alternativas: [
            "Controlar a corrente elétrica como uma chave eletrônica",
            "Produzir energia sem uma fonte",
            "Armazenar arquivos digitais",
            "Medir a temperatura sem sensores"
        ],
        correta: 0
    },
    {
        pergunta: "O que é um circuito integrado?",
        alternativas: [
            "Um conjunto de fios sem componentes",
            "Uma fonte de energia mecânica",
            "Um circuito com vários componentes fabricados em um mesmo chip",
            "Um tipo de interruptor residencial"
        ],
        correta: 2
    },
    {
        pergunta: "Qual destes aparelhos pode conter circuitos integrados?",
        alternativas: [
            "Celular",
            "Computador",
            "Calculadora digital",
            "Todas as alternativas anteriores"
        ],
        correta: 3
    },
    {
        pergunta: "Por que estudar eletrônica é importante?",
        alternativas: [
            "Porque elimina a necessidade de aprender matemática",
            "Porque ajuda a compreender e desenvolver tecnologias",
            "Porque todos os circuitos funcionam sem energia",
            "Porque substitui todas as outras áreas da ciência"
        ],
        correta: 1
    }
];

const elementoProgresso = document.getElementById("progresso");
const elementoPergunta = document.getElementById("pergunta");
const elementoAlternativas = document.getElementById("alternativas");
const elementoFeedback = document.getElementById("feedback");
const botaoProximo = document.getElementById("proximo");
const elementoResultado = document.getElementById("resultado");
const elementoQuiz = document.getElementById("quiz-container");
const botaoReiniciar = document.getElementById("reiniciar");

let indicePergunta = 0;
let pontuacao = 0;
let respostaSelecionada = false;

function mostrarPergunta() {
    const atual = perguntas[indicePergunta];

    elementoProgresso.textContent =
        `Pergunta ${indicePergunta + 1} de ${perguntas.length}`;

    elementoPergunta.textContent = atual.pergunta;
    elementoAlternativas.innerHTML = "";
    elementoFeedback.textContent = "";
    botaoProximo.hidden = true;

    respostaSelecionada = false;

    atual.alternativas.forEach((alternativa, indice) => {
        const botao = document.createElement("button");

        botao.type = "button";
        botao.className = "alternativa";
        botao.textContent = alternativa;

        botao.addEventListener("click", () => {
            verificarResposta(indice, botao);
        });

        elementoAlternativas.appendChild(botao);
    });
}

function verificarResposta(indiceEscolhido, botaoEscolhido) {
    if (respostaSelecionada) {
        return;
    }

    respostaSelecionada = true;

    const atual = perguntas[indicePergunta];
    const botoes = elementoAlternativas.querySelectorAll("button");

    botoes.forEach((botao, indice) => {
        botao.disabled = true;

        if (indice === atual.correta) {
            botao.classList.add("correta");
        }
    });

    if (indiceEscolhido === atual.correta) {
        pontuacao++;
        elementoFeedback.textContent = "Muito bem! Você acertou! 🎉";
    } else {
        botaoEscolhido.classList.add("errada");
        elementoFeedback.textContent =
            `Não foi dessa vez! A resposta correta é: ${atual.alternativas[atual.correta]}.`;
    }

    botaoProximo.textContent =
        indicePergunta === perguntas.length - 1
            ? "Ver resultado"
            : "Próxima pergunta";

    botaoProximo.hidden = false;
}

function mostrarResultado() {
    elementoQuiz.hidden = true;
    elementoResultado.hidden = false;

    const percentual = Math.round(
        (pontuacao / perguntas.length) * 100
    );

    let mensagem;

    if (percentual === 100) {
        mensagem = "Excelente! Você acertou todas as perguntas! 🏆";
    } else if (percentual >= 70) {
        mensagem = "Muito bem! Você demonstrou um ótimo conhecimento! 🌟";
    } else if (percentual >= 40) {
        mensagem = "Bom trabalho! Continue estudando para aprender ainda mais! 💡";
    } else {
        mensagem = "Continue aprendendo! Revise os conteúdos e tente novamente! 📚";
    }

    elementoResultado.innerHTML = `
        <h3>Quiz concluído!</h3>
        <p>Você acertou <strong>${pontuacao}</strong> de
        <strong>${perguntas.length}</strong> perguntas.</p>
        <p>Seu resultado: <strong>${percentual}%</strong></p>
        <p>${mensagem}</p>
    `;
}

botaoProximo.addEventListener("click", () => {
    indicePergunta++;

    if (indicePergunta < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
});

botaoReiniciar.addEventListener("click", () => {
    indicePergunta = 0;
    pontuacao = 0;
    respostaSelecionada = false;

    elementoResultado.hidden = true;
    elementoQuiz.hidden = false;

    mostrarPergunta();
});

mostrarPergunta();
// Lógica de abertura/fechamento do Quiz no Index
document.addEventListener("DOMContentLoaded", function () {
    const botaoAbrirQuiz = document.getElementById("abrir-quiz");
    const areaQuiz = document.getElementById("area-quiz");

    if (botaoAbrirQuiz && areaQuiz) {
        botaoAbrirQuiz.addEventListener("click", function () {
            const vaiAbrir = areaQuiz.hidden;

            areaQuiz.hidden = !vaiAbrir;
            botaoAbrirQuiz.textContent = vaiAbrir ? "Fechar quiz" : "Fazer o quiz";

            if (vaiAbrir) {
                areaQuiz.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    }
});
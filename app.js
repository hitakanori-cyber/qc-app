let correctCount = 0;
let totalCount = 0;

async function loadQuestions() {
  const category = document.getElementById("categorySelect").value;
  const response = await fetch(`data/${category}.json`);
  const data = await response.json();

  const questions = Array.isArray(data) ? data : data.questions;

  const container = document.getElementById("questionContainer");
  container.innerHTML = "";

  // スコア復元
  const saved = localStorage.getItem(`${category}_score`);
  if (saved) {
    const { correctCount: savedCorrect, totalCount: savedTotal } = JSON.parse(saved);
    correctCount = savedCorrect;
    totalCount = savedTotal;
    updateScoreRate();
  } else {
    correctCount = 0;
    totalCount = 0;
    updateScoreRate();
  }

  questions.forEach((q, index) => {
    const div = document.createElement("div");
    div.className = "question";

    const title = document.createElement("h3");
    title.textContent = `Q${index + 1}: ${q.text || q.question}`;
    div.appendChild(title);

    const choices = q.choices || q.options;
    choices.forEach((choice, i) => {
      const btn = document.createElement("button");
      btn.textContent = choice;
      btn.style.display = "block";
      btn.style.margin = "6px 0";
      btn.style.width = "100%";
      btn.className = "question-button";

      btn.onclick = () => {
        const correctIndex = q.correctIndex ?? q.answer;
        const isCorrect = i === correctIndex;
        totalCount++;
        if (isCorrect) correctCount++;

        alert(isCorrect ? "正解！" : "不正解");

        // 解説がすでに表示されていない場合のみ追加
        if (!div.querySelector(".explanation")) {
          const exp = document.createElement("p");
          exp.className = "explanation";
          exp.textContent = `【解説】${q.explanation}`;
          div.appendChild(exp);
        }

        updateScoreRate();
        saveScore(category);
      };

      div.appendChild(btn);
    });

    container.appendChild(div);
  });
}

function updateScoreRate() {
  const rate = document.getElementById("scoreRate");
  rate.textContent = `正解数: ${correctCount} / ${totalCount}（正答率: ${totalCount ? Math.round((correctCount / totalCount) * 100) : 0}%）`;
}

function saveScore(category) {
  localStorage.setItem(`${category}_score`, JSON.stringify({ correctCount, totalCount }));
}

function resetScore() {
  const category = document.getElementById("categorySelect").value;
  localStorage.removeItem(`${category}_score`);
  correctCount = 0;
  totalCount = 0;
  updateScoreRate();
  loadQuestions();
}

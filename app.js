async function loadQuestions() {
  const category = document.getElementById("categorySelect").value;
  const response = await fetch(`data/${category}.json`);
  const data = await response.json();

  // JSON構造に応じて questions を取得
  const questions = Array.isArray(data) ? data : data.questions;

  const container = document.getElementById("questionContainer");
  container.innerHTML = "";

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
      btn.onclick = () => {
        const correctIndex = q.correctIndex ?? q.answer;
        alert(i === correctIndex ? "正解！" : "不正解");
        const exp = document.createElement("p");
        exp.textContent = `【解説】${q.explanation}`;
        div.appendChild(exp);
      };
      div.appendChild(btn);
    });

    container.appendChild(div);
  });
}

async function loadQuestions() {
  const category = document.getElementById("categorySelect").value;
  const response = await fetch(`data/${category}.json`);
  const questions = await response.json();

  const container = document.getElementById("questionContainer");
  container.innerHTML = "";

  questions.forEach((q, index) => {
    const div = document.createElement("div");
    div.className = "question";

    const title = document.createElement("h3");
    title.textContent = `Q${index + 1}: ${q.text}`;
    div.appendChild(title);

    q.choices.forEach((choice, i) => {
      const btn = document.createElement("button");
      btn.textContent = choice;
      btn.onclick = () => {
        alert(i === q.correctIndex ? "正解！" : "不正解");
        const exp = document.createElement("p");
        exp.textContent = `【解説】${q.explanation}`;
        div.appendChild(exp);
      };
      div.appendChild(btn);
    });

    container.appendChild(div);
  });
}

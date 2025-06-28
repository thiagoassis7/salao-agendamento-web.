// Lista simulada de serviços
const servicos = [
    { nome: "Cílios Fio a Fio", preco: 80 },
    { nome: "Sobrancelha com Henna", preco: 40 },
    { nome: "Design de Sobrancelha", preco: 30 },
    { nome: "Cílios Tufinho", preco: 50 }
  ];
  
  const horariosBase = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];
  const horariosPorData = {}; // <- Armazena os horários disponíveis por data
  
  const listaServicos = document.getElementById("listaServicos");
  const resumo = document.getElementById("resumo");
  const selectHorario = document.getElementById("horario");
  
  // Mostra ou esconde os serviços
  function mostrarServicos() {
    if (listaServicos.style.display === "none" || listaServicos.style.display === "") {
      listaServicos.style.display = "block";
    } else {
      listaServicos.style.display = "none";
    }
  
    if (listaServicos.innerHTML.trim() === "") {
      servicos.forEach((servico, index) => {
        const div = document.createElement("div");
        div.className = "servico";
  
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = "servico" + index;
        checkbox.value = index;
        checkbox.addEventListener("change", atualizarResumo);
  
        const label = document.createElement("label");
        label.htmlFor = checkbox.id;
        label.textContent = `${servico.nome} - R$ ${servico.preco.toFixed(2)}`;
  
        div.appendChild(checkbox);
        div.appendChild(label);
        listaServicos.appendChild(div);
      });
    }
  }
  
  function atualizarResumo() {
    const checkboxes = listaServicos.querySelectorAll("input[type=checkbox]");
    const selecionados = [];
    let total = 0;
  
    checkboxes.forEach(cb => {
      if (cb.checked) {
        const s = servicos[cb.value];
        selecionados.push(`- ${s.nome}: R$ ${s.preco.toFixed(2)}`);
        total += s.preco;
      }
    });
  
    if (selecionados.length > 0) {
      resumo.innerHTML = `
        <strong>Serviços selecionados:</strong><br>
        ${selecionados.join("<br>")}
        <br><br><strong>Valor total: R$ ${total.toFixed(2)}</strong>
      `;
    } else {
      resumo.textContent = "Nenhum serviço selecionado.";
    }
  }
  
  // Atualiza os horários disponíveis para a data escolhida
  function atualizarHorariosDisponiveis(dataSelecionada) {
    const horarios = horariosPorData[dataSelecionada] || [...horariosBase];
    selectHorario.innerHTML = ""; // Limpa opções
  
    if (horarios.length === 0) {
      const opt = document.createElement("option");
      opt.value = "";
      opt.textContent = "Os horários estão esgotados para esse dia";
      selectHorario.appendChild(opt);
      return;
    }
  
    const optPadrao = document.createElement("option");
    optPadrao.value = "";
    optPadrao.textContent = "Selecione...";
    selectHorario.appendChild(optPadrao);
  
    horarios.forEach(h => {
      const opt = document.createElement("option");
      opt.value = h;
      opt.textContent = h;
      selectHorario.appendChild(opt);
    });
  }
  
  // Confirma o agendamento e remove horário
  function confirmarAgendamento() {
    const nome = document.getElementById("nome").value;
    const data = document.getElementById("data").value;
    const horario = selectHorario.value;
  
    const checkboxes = listaServicos.querySelectorAll("input[type=checkbox]:checked");
    const selecionados = Array.from(checkboxes).map(cb => servicos[cb.value]);
  
    if (!nome || !data || !horario || selecionados.length === 0) {
      alert("Preencha todos os campos e escolha pelo menos um serviço.");
      return;
    }
  
    const nomesServicos = selecionados.map(s => s.nome).join(", ");
    const valorTotal = selecionados.reduce((soma, s) => soma + s.preco, 0);
  
    alert(`Agendamento confirmado!\nCliente: ${nome}\nServiços: ${nomesServicos}\nData: ${data} às ${horario}\nTotal: R$ ${valorTotal.toFixed(2)}`);
  
    // Atualiza horários disponíveis
    if (!horariosPorData[data]) {
      horariosPorData[data] = [...horariosBase];
    }
  
    horariosPorData[data] = horariosPorData[data].filter(h => h !== horario);
    atualizarHorariosDisponiveis(data); // atualiza dropdown
  }
  
  // Flatpickr com controle de datas
  document.addEventListener("DOMContentLoaded", function () {
    const datasIndisponiveis = [
     "24-05-2025",
    ];
  
    flatpickr("#data", {
      dateFormat: "d-m-Y",
      disable: datasIndisponiveis,
      locale: "pt",
      onChange: function (selectedDates, dateStr, instance) {
        // converte para o formato compatível com o array de horários
        const dataISO = selectedDates[0].toISOString().split("T")[0]; // formato yyyy-mm-dd
        atualizarHorariosDisponiveis(dataISO);
      }
    });
  });

 
function mostrarAba(aba) {
    document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
    document.querySelector(`#${aba}`).classList.add("active");
    document.querySelectorAll("nav button").forEach(btn => btn.classList.remove("active"));
    document.querySelector(`#btn${aba.charAt(0).toUpperCase() + aba.slice(1)}`).classList.add("active");
  }

  // Flatpickr para data de admin
  flatpickr("#novaData", {
    dateFormat: "Y-m-d",
    locale: "pt"
  });

  // Arrays globais
  const servicos = [];
  const horariosBase = [];
  const datasIndisponiveis = [];

  function adicionarServico() {
    const nome = document.getElementById("novoServico").value;
    const preco = parseFloat(document.getElementById("precoServico").value);

    if (nome && !isNaN(preco)) {
      servicos.push({ nome, preco });
      alert(`Serviço '${nome}' adicionado com sucesso!`);
      document.getElementById("novoServico").value = "";
      document.getElementById("precoServico").value = "";
      console.log(servicos);
    } else {
      alert("Preencha corretamente o nome e valor do serviço.");
    }
  }

  function adicionarHorario() {
    const horario = document.getElementById("novoHorario").value;
    if (horario) {
      horariosBase.push(horario);
      alert(`Horário '${horario}' adicionado!`);
      document.getElementById("novoHorario").value = "";
      console.log(horariosBase);
    } else {
      alert("Preencha o horário corretamente.");
    }
  }

  function adicionarDataIndisponivel() {
    const data = document.getElementById("novaData").value;
    if (data && !datasIndisponiveis.includes(data)) {
      datasIndisponiveis.push(data);
      alert(`Data ${data} marcada como indisponível!`);
      document.getElementById("novaData").value = "";
      console.log(datasIndisponiveis);
    } else {
      alert("Data já inserida ou inválida.");
    }
  }

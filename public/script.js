window.onload = function () {
    const socket = new WebSocket('wss://nodejs-websocket-example.herokuapp.com/');
    const socketStatus = document.getElementById('socket-status');
  
    socket.onerror = function (error) {
      console.log('WebSocket Error: ', error);
    };
  
    // Função chamada no momento da conexão do cliente com o servidor
    socket.onopen = function (event) {
      socketStatus.innerHTML = 'Conectado ao servidor: ' + event.currentTarget.url;
      socketStatus.className = 'open';
    };
  
    // Função para tratar mensagens enviadas pelo servidor.
    const results = document.getElementById('results');
    socket.onmessage = function (event) {
      var message = event.data;
      results.innerHTML += '<li class="received">' + message + '</li>';
    };
  
    // Função chamada no momento da desconexão do servidor com o cliente
    socket.onclose = function (event) {
      socketStatus.innerHTML = 'Websocket desconectado.';
      socketStatus.className = 'closed';
    };
  
    const form = document.getElementById('calc-form');
    form.onsubmit = function (e) {
      e.preventDefault();
  
      const num1Field = document.getElementById('num1');
      const num2Field = document.getElementById('num2');
      const operatorField = document.getElementById('operator');
  
      socket.send(JSON.stringify({
        num1: num1Field.value,
        num2: num2Field.value,
        operator: operatorField.options[operatorField.selectedIndex].value
       }));
    }
  
    const closeSocketBtn = document.getElementById('close-socket');
    closeSocketBtn.onclick = function (e) {
      e.preventDefault();
      socket.close();
      return false;
    };
  }
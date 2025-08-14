document.addEventListener('DOMContentLoaded', function () {

  const opcoesDeAcessibilidade = document.getElementById('opcoes-acessibilidade');
  const aumentaFonte = document.getElementById('aumentar-fonte');
  const diminuiFonte = document.getElementById('diminuir-fonte');
  const alternaContraste = document.getElementById('alterna-contraste');
  const botaoAcessibilidade = document.getElementById('botao-acessibilidade');
  let tamanhoAtualFonte = 1;

  botaoAcessibilidade.addEventListener('click', () => {
    opcoesDeAcessibilidade.classList.toggle('ativa');
    const expanded = botaoAcessibilidade.getAttribute('aria-expanded') === 'true';
    botaoAcessibilidade.setAttribute('aria-expanded', String(!expanded));
  });

  aumentaFonte.addEventListener('click', () => {
    tamanhoAtualFonte = Math.min(2, tamanhoAtualFonte + 0.1);
    document.body.style.fontSize = `${tamanhoAtualFonte}rem`;
  });
  diminuiFonte.addEventListener('click', () => {
    tamanhoAtualFonte = Math.max(0.8, tamanhoAtualFonte - 0.1);
    document.body.style.fontSize = `${tamanhoAtualFonte}rem`;
  });

  alternaContraste.addEventListener('click', () => {
    document.body.classList.toggle('alto-contraste');
    document.body.classList.remove('modo-escuro');
  });

  const botaoModoEscuro = document.createElement('button');
  botaoModoEscuro.textContent = "🌙";
  botaoModoEscuro.classList.add('btn', 'btn-primary', 'fw-bold');
  botaoModoEscuro.setAttribute('aria-label', 'Ativar modo escuro');
  opcoesDeAcessibilidade.appendChild(botaoModoEscuro);

  botaoModoEscuro.addEventListener('click', () => {
    document.body.classList.toggle('modo-escuro');
    document.body.classList.remove('alto-contraste');
  });

  const ajustarImagens = () => {
    document.querySelectorAll('.img-inicio, .gallery-img').forEach(img => {
      img.style.height = 'auto';
      if (img.naturalWidth > img.naturalHeight) {
        img.style.objectFit = 'cover';
      } else {
        img.style.objectFit = 'contain';
      }
    });
  };
  window.addEventListener('load', ajustarImagens);
  window.addEventListener('resize', ajustarImagens);

  const form = document.querySelector('form');
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    if (!nome || !email || !mensagem) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
      alert("Por favor, insira um e-mail válido.");
      return;
    }

    const modalHTML = `
      <div class="modal fade" id="sucessoModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content text-center p-4">
            <h5 class="mb-3">✅ Mensagem enviada com sucesso!</h5>
            <p>Obrigado por entrar em contato. Retornaremos em breve.</p>
            <button class="btn btn-primary mt-2" data-bs-dismiss="modal">Fechar</button>
          </div>
        </div>
      </div>`;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    const sucessoModal = new bootstrap.Modal(document.getElementById('sucessoModal'));
    sucessoModal.show();
    form.reset();
  });

  if (window.ScrollReveal) {
    ScrollReveal().reveal('#inicio', { delay: 300, distance: '50px', origin: 'bottom' });
    ScrollReveal().reveal('#sobre', { delay: 400, distance: '50px', origin: 'left' });
    ScrollReveal().reveal('#galeria .gallery-img', { delay: 200, interval: 150, distance: '30px', origin: 'bottom' });
    ScrollReveal().reveal('#contato', { delay: 500, distance: '50px', origin: 'bottom' });
  }
});

var agradecimento = [
  'Obrigado!',
  'Valew!',
  'Obrigadão!',
  'Yeah!',
  'Ok!',
  'Bora trocar!',
  'Partiu trocar!',
  'Boa sorte!',
  'Boa troca!',
  'Let\'s go!',
  'Oh Yeah!',
  'Isso aew!',
  'Muito bem!',
  'Mandou bem!',
  'Tope!',
  'Top!',
  'Ta tranquilo, ta favorável!',
  'Tranquilo!',
  'Sucesso!',
  'Trocar irás em breve.',
  'Trocar em breve irás.'
];

var sucesso = [
  'Seu anúncio foi publicado!',
  'Seu anúncio foi publicado com sucesso!',
  'Seu anúncio já foi publicado em nosso site!',
  'Publicamos seu anúncio em nosso site!',
  'Já até publiquei aqui!'
];

function random (tamanho) {
    return Math.floor(Math.random() * tamanho);
}

module.exports = function(screenName){
  var ordem = random(1);
  var agradecimentoTemp = agradecimento[random(agradecimento.length)];
  var sucessoTemp = sucesso[random(sucesso.length)];
  var mensagem = '';
  if(ordem)
    mensgem = agradecimentoTemp + ' ' + sucessoTemp;
  else
    mensagem = sucessoTemp + ' ' + agradecimentoTemp;
  return screenName + ' ' + mensagem + ' http://goo.gl/l4Y19G. Ou, responda "finalizar"';
}

async function pegarCandidatos() {
  const resultados = await (await fetch('https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/br/br-c0001-e000544-r.json')).json()
  const candidatos = resultados.cand.sort((a, b) => {
    return Number(a.pvap) < Number(b.pvap) ? -1 : 1
  })

  return candidatos
}

async function popularConteudo() {
  pegarCandidatos().then(candidatos => {
    const main = document.querySelector('main')
    main.innerHTML = ''

    candidatos.forEach((dados, index) => {

      const container = document.createElement('div')
      container.className = `container p${index}`

      const pres = document.createElement('h2')
      pres.innerHTML = dados.nm

      const numero = document.createElement('p')
      numero.textContent = dados.n
      numero.className = 'numero'

      const vice = document.createElement('h3')
      vice.textContent = dados.nv

      const porcentagem = document.createElement('p')
      porcentagem.textContent = dados.pvap + '%'
      porcentagem.className = 'porcentagem'

      const votosValidos = document.createElement('p')
      votosValidos.innerHTML = `<b>Votos válidos:</b> ${Number(dados.vap).toLocaleString()}`
      votosValidos.className = 'votos'

      const posicao = document.createElement('p')
      posicao.textContent = `${index + 1}º`
      posicao.className = `posicao p${index + 1}`

      container.append(pres, vice, porcentagem, votosValidos, numero, posicao)

      main.append(container)
    })
  })
}

popularConteudo()
setInterval(popularConteudo, 10000)
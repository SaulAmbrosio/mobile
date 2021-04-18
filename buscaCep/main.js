function fazGet(url,cep){
    let request = new XMLHttpRequest()
    let urlfinal = url + cep + "/json"
    console.log(urlfinal)
    request.open("GET",urlfinal, false)
    request.send()
    return request.responseText
}


function gerarLinha(dados){

    const linha = document.createElement("tr")

    for (const dado in dados) {     
        let celula = document.createElement("td")
        if(dado != "ibge" && dado != "gia" && dado != "siafi"){
            let valor = document.createTextNode(dados[dado])
            celula.appendChild(valor)
            linha.appendChild(celula)
        }
    }

    document.getElementById("tabela").appendChild(linha)  
}

document.getElementById("txtCep").addEventListener("focusout", buscarCep)

function buscarCep(){
    var cep = document.getElementById("txtCep").value

    try{
        endereco = fazGet("https://viacep.com.br/ws/",cep)
        var arrayEndereco = JSON.parse(endereco)
        if(arrayEndereco.erro){
            document.getElementById("erro").innerText ="O CEP Buscado não foi encontrado"
        }else{
			gerarLinha(arrayEndereco)
			document.getElementById("erro").innerText =""
		}
    }catch{
        document.getElementById("erro").innerText ="O CEP buscado deve conter 8 digitos"
    }

}
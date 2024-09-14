
async function getEstados() {
    const estadoSelect = document.getElementById('estado');
  
    try {
      
      const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
      
      
      if (!response.ok) {
        throw new Error("Erro ao buscar os estados");
      }
      
      const estados = await response.json();
  
     
      estados.sort((a, b) => a.nome.localeCompare(b.nome));
  
      
      estados.forEach(estado => {
        const option = document.createElement('option');
        option.value = estado.id;
        option.textContent = `${estado.nome} (${estado.sigla})`;
        estadoSelect.appendChild(option);
      });
    } catch (error) {
      console.error("Erro ao buscar estados:", error);
    }
  }
  
  
  async function getCidades() {
    const estadoId = document.getElementById('estado').value;
    const cidadeSelect = document.getElementById('cidade');
  
    
    cidadeSelect.innerHTML = '<option value="">Selecione uma cidade</option>';
  
    if (estadoId === '') return;
  
    try {
      
      const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`);
  
      
      if (!response.ok) {
        throw new Error("Erro ao buscar as cidades");
      }
      
      const cidades = await response.json();
  
      
      cidades.forEach(cidade => {
        const option = document.createElement('option');
        option.value = cidade.id;
        option.textContent = cidade.nome;
        cidadeSelect.appendChild(option);
      });
    } catch (error) {
      console.error("Erro ao buscar cidades:", error);
    }
  }
  
  window.onload = getEstados;
  

import { ppu } from './Datos/variable.js';
const inputPpu = document.getElementById('ppu');
const patente = document.getElementById('patente');
const modo = document.getElementById('modo');
const fecha = document.getElementById('fecha');
const subsidio = document.getElementById('subsidio');
const tarjetas = document.getElementById('tarjetas');

const botonBuscar = document.getElementById('boton');

let urlImg;

botonBuscar.addEventListener('click', () => {
  while (tarjetas.firstChild) {
    tarjetas.removeChild(tarjetas.firstChild);
  }
  let patenteBuscar = inputPpu.value.toUpperCase();

  const resultado = ppu.filter((elemento) => {
    if (elemento.PLACA === patenteBuscar) {
      return elemento;
    }
  });
  console.log(resultado);

  resultado.map((elemento) => {
    let ano = elemento.FECHACONTROL.slice(0, 4);
    let mes = elemento.FECHACONTROL.slice(5, 7);
    let dia = elemento.FECHACONTROL.slice(8, 10);

    let fechaReal = `${dia}-${mes}-${ano}`;

    if ((elemento.SUBSIDIO = 'SI')) {
      urlImg = 'asset/subsidiado.png';
    } else {
      urlImg = 'asset/nosubsidiado.png';
    }

    let tarjeta = document.createElement('div');

    tarjeta.innerHTML = `<div class="w-[95%] bg-slate-400 h-auto p-3 mt-2 mx-auto rounded-3xl flex justify-between"><img class="w-16 h-16" src=${urlImg} alt="" srcset=""><div class="flex flex-col"><h2><strong>${elemento.PLACA}</strong></h2><h3>${elemento.MODO}</h3><h3>${fechaReal}</h3></div>`;
    tarjetas.append(tarjeta);
  });
  inputPpu.value = '';
});

import { ppu } from './Datos/variable.js';
import { subsidio } from './Datos/4a.js';
const inputPpu = document.getElementById('ppu');
const tarjetas = document.getElementById('tarjetas');

const botonBuscar = document.getElementById('boton');

let urlImg;
console.log(subsidio);

botonBuscar.addEventListener('click', () => {
  // aqui borramos los elementos que se renderizaron la vez anterior
  while (tarjetas.firstChild) {
    tarjetas.removeChild(tarjetas.firstChild);
  }

  let patenteBuscar = inputPpu.value.toUpperCase();

  // aqui filtramos las ppu del archivo variables.js los cuales coinciden con la patente ingresada
  const resultado = ppu.filter((elemento) => {
    if (elemento.PLACA === patenteBuscar) {
      return elemento;
    }
  });

  console.log(resultado);
  if (resultado.length == 0) {
    console.log('no hay patente');
    const resultadoSuibsidio = subsidio.find((e) => {
      if (e.ppu == patenteBuscar) {
        return e;
      }
    });
    console.log(resultadoSuibsidio);

    if (resultadoSuibsidio.length == 0) {
      let tarjeta = document.createElement('div');
      tarjeta.innerHTML = `<div class="w-[300px] bg-slate-50 h-auto mx-auto flex items-center justify-center gap-x-5 p-2 rounded-2xl"><img src="./asset/nosubsidiado.png" alt="" class="w-16 h-16" /><strong class="text-center text-lg">${patenteBuscar}</strong></div>`;
      tarjetas.append(tarjeta);
    } else {
      let tarjeta = document.createElement('div');
      tarjeta.innerHTML = `<div class="w-[300px] bg-slate-50 h-auto mx-auto flex items-center justify-center gap-x-5 p-2 rounded-2xl"><img src="./asset/subsidiado.png" alt="" class="w-16 h-16" /><strong class="text-center text-lg">${patenteBuscar}</strong></div>`;
      tarjetas.append(tarjeta);
    }
  } else {
    // aqui renderizamos todos los elementos que se encuentran en el filtro anterior si es que los hay
    resultado.map((elemento) => {
      let ano = elemento.FECHACONTROL.slice(0, 4);
      let mes = elemento.FECHACONTROL.slice(5, 7);
      let dia = elemento.FECHACONTROL.slice(8, 10);

      let fechaReal = `${dia}-${mes}-${ano}`;

      if (elemento.SUBSIDIO == 'SI') {
        urlImg = 'asset/subsidiado.png';
      } else {
        urlImg = 'asset/nosubsidiado.png';
      }

      let tarjeta = document.createElement('div');

      tarjeta.innerHTML = `<div class="w-[300px] bg-slate-50 h-auto p-3 mt-2 mx-auto rounded-3xl flex justify-between"><img class="w-16 h-16" src=${urlImg} alt="" srcset=""><div class="flex flex-col"><h2><strong>${elemento.PLACA}</strong></h2><h3>${elemento.MODO}</h3><h3>${fechaReal}</h3></div>`;
      tarjetas.append(tarjeta);
    });
  }

  inputPpu.value = '';
});

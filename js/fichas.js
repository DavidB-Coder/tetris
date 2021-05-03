class Ficha {
  x = 0;
  y = 0;
  angulo = 0;
  tipo;
  color;
  siguienteFicha;
  constructor() {
    this.siguienteFicha = Math.floor(Math.random()*7);
    this.nuevaFicha();
  }

  nuevaFicha(){
    this.color = Math.floor(Math.random()*7);
    this.tipo = this.siguienteFicha;
    this.siguienteFicha = Math.floor(Math.random()*7);
    this.x = 4;
    this.y = 2;
    this.fotograma = 0;
    next.src = 'img/ficha'+this.siguienteFicha+'.png';
  }

  dibuja(){
    for (var py= 0; py<4; py++) {
      for (var px = 0; px<4; px++) {
        if (graficasFichas[this.tipo][this.angulo][py][px]!=0) {
          ctx.fillStyle = colores[this.color];
          ctx.fillRect((this.x+px-1)*datos.anchoFicha, (this.y+py-datos.margenSuperior-1)*datos.altoFicha, datos.anchoFicha-2, datos.altoFicha-2);
        }
      }
    }
  }
  fijar(){
    for (var py= 0; py<4; py++) {
      for (var px = 0; px<4; px++) {
        if (graficasFichas[this.tipo][this.angulo][py][px]>0) {
          pantalla[this.y+py-1][this.x+px] = this.color+1;
        }
      }
    }
  }

  rotar(){
    let anguloNuevo = this.angulo;
    if (anguloNuevo==3) {
      anguloNuevo=0;
    }else{
      anguloNuevo++;
    }
    if (!this.colision(anguloNuevo,this.y,this.x)) {
      this.angulo = anguloNuevo;
    }

  }
  bajar(){
    if (!this.colision(this.angulo,this.y,this.x)) {
        this.y++;
    }

  }
  izquierda(){
    if (!this.colision(this.angulo,this.y,this.x-1)) {
        this.x--;
    }

  }
  derecha(){
    if (!this.colision(this.angulo,this.y,this.x+1)) {
        this.x++;
    }
  }
  caer(){
    if (datos.fotograma>=(60-datos.velocidad)) {
      if (!this.colision(this.angulo,this.y,this.x)) {
          this.y++;
      }else{
        this.fijar();
        this.borraLinea();
        this.nuevaFicha();
        if (this.pierde()) {
          console.log(datos.puntos);
          jugador.newBest(datos.puntos);
          this.reiniciaTablero();
          puntaje.innerHTML = ''+datos.puntos;
        }
      }
      datos.fotograma = 0;
    }
  }
  reiniciaTablero(){
    for (var i = 0; i < pantalla.length; i++) {
      for (var j = 0; j < pantalla[i].length; j++) {
        pantalla[i][j] = pantallaVacia[i][j];
        datos.velocidad = 1;
        datos.puntos = 0;
      }
    }
  }
  borraLinea(){
    let multiplicador=1;
    let filaLlena;
    for (var py= datos.margenSuperior; py<pantalla.length-1; py++) {
      filaLlena = true;
      for (var px = 1; px<pantalla[px].length-1; px++) {
        if (pantalla[py][px]==0) {
          filaLlena=false;
        }
      }
      if (filaLlena) {
        this.bajaElementos(py);
        datos.puntos += 100*multiplicador;
        multiplicador++;
        datos.velocidad++;
        puntaje.innerHTML = ''+datos.puntos;
      }
    }
  }
  pierde(){
    for (var i = 1; i < pantalla[3].length-1; i++) {
      if (pantalla[3][i]>0) {
        return true;
      }
    }
    return false;
  }
  bajaElementos(index){
    pantalla.splice(index,1);
    pantalla.unshift([1,0,0,0,0,0,0,0,0,0,0,1]);
  }
  colision(anguloNuevo,yNuevo,xNuevo){
    let resultado = false;
    for (var py = 0; py<4; py++) {
      for (var px = 0; px<4; px++) {
        if (graficasFichas[this.tipo][anguloNuevo][py][px]>0) {
          if (pantalla[yNuevo+py][xNuevo+px]>0) {
            resultado = true;
          }
        }
      }
    }
    return resultado;
  }
}

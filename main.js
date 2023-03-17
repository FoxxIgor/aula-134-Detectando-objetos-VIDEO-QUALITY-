objetos = [];
statusAtual = false;

function preload(){

}

function setup(){
    canvas = createCanvas(600, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(600, 400);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.querySelector("#status").innerHTML = "Status Atual = Detectando Objetos";
}

function modelLoaded(){
    console.log("modelo carregado");
    statusAtual = true;
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objetos = results;
    }
}

function draw(){
    image(video, 0, 0, 600, 400);
    if(statusAtual){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResults);
        for(i=0; i<objetos.length; i++){
            document.querySelector("#status").innerHTML = "Status Atual = Objetos Detectados";
            document.querySelector("#numerosObjetos").innerHTML = "Numero de Objetos Detectados: "+objetos.length;
            stroke(r,g,b);
            noFill();
            porcentagem = floor(objetos[i].confidence*100);
            objetoDetectado = objetos[i].label;
            objetoX = objetos[i].x;
            objetoY = objetos[i].y;
            objetoW = objetos[i].width;
            objetoH = objetos[i].height;
            rect(objetoX, objetoY, objetoW, objetoH);
            text(objetoDetectado+" "+porcentagem+"%", objetoX, objetoY);
        }
    }
}

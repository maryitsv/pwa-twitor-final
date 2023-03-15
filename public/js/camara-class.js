class Camara{
    constructor(videoNode) {
        this.videoNode = videoNode;
        console.log('init camara')
    }

    encenderCamara(){
        if ( !navigator.mediaDevices ) {
            console.log('Lo siento no soportamos camara')
        }
        navigator.mediaDevices.getUserMedia({
            audio: false,
            video:{
                width:300,
                height:300
            }
        }).then(stream => {
            // mostramos el stream en el nodo
            this.videoNode.srcObject = stream;
            this.stream = stream;
        });
    }

    apagarCamara(){
        this.videoNode.pause();
        if(this.stream){
            this.stream.getTracks()[0].stop();
        }
    }

    tomarFoto(){
        let canvas = document.createElement('canvas');
        canvas.setAttribute('width',300);
        canvas.setAttribute('height',300);
        let context = canvas.getContext('2d');
        context.drawImage(this.videoNode,0,0,canvas.width,canvas.height);
        this.foto = context.canvas.toDataURL();

        canvas = null;
        context = null;
        return this.foto;
    }
}
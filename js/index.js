let pedidos=[];

document.querySelector("#btn_agregar").addEventListener("click",()=>{

    let nombre_cliente=document.querySelector("#nom-cliente").value;
    let tipo_pedido=document.querySelector("#tipo-pedido").value;
    let cantidad=document.querySelector("#total-pedido").value;
    let efectivo=document.querySelector("#p-efectivo").checked;

    if (nombre_cliente!=" " && cantidad>0){

        let pedido={ };
        pedido.nombre_cliente=nombre_cliente;
        pedido.tipo_pedido=tipo_pedido;
        pedido.cantidad=cantidad;
        pedido.metodo_efectivo=efectivo;
        pedidos.push(pedido);
        recargarTabla();

        Swal.fire("Exito","El Pedido se ha agregado con exito", "success")

    } else{
        if (nombre_cliente ==""){
            Swal.fire("Error","Tiene que ingresar un nombre de cliente", "error")
        }else if (cantidad<=0){
            Swal.fire("Error","Tiene que ingresar una cantidad mayor a 0", "error")


        }

    }

});

const recargarTabla=()=>{

    let tbody=document.querySelector("#tb-body");
    tbody.innerHTML="";
    
    for (let i=0; i<pedidos.length;++i){
        let pedido = pedidos[i];
        let tr= document.createElement("tr");
        let tdNumero=document.createElement("td");
        tdNumero.innerText=i+1;
        let tdNombre=document.createElement("td");
        tdNombre.innerText= pedido.nombre_cliente;
        let tdTipoPedido=document.createElement("td");


        if (pedido.tipo_pedido=="solo"){
            tdTipoPedido.innerText="Solo Hamburguesa";
        }else{
            tdTipoPedido.innerText="Combo";
        }
        let tdCantidad=document.createElement("td");
        tdCantidad.innerText=pedido.cantidad;

        let tdAcciones=document.createElement("td");
        let boton=document.createElement("button");
        boton.classList.add("btn","btn-warning","btn-sm");
        boton.innerText="Cancelar Pedido";
        boton.posicion=i;
        boton.addEventListener("click",CancelarPedido);
        tdAcciones.appendChild(boton);



        tr.appendChild(tdNumero);
        tr.appendChild(tdNombre);
        tr.appendChild(tdTipoPedido);
        tr.appendChild(tdCantidad);
        tr.appendChild(tdAcciones);

        tbody.appendChild(tr);


    }

};

const CancelarPedido = async function(){

    let pedido=pedidos[this.posicion];
    let res = await Swal.fire({
        title:`Esta seguro de cancelar el pedido del cliente ${pedido.nombre_cliente}`,
        showCancelButton: true,
        confirmButtonText: "Anular Pedido", icon: "info"

    })

    if (res.isConfirmed){
        pedidos.splice(this.posicion,1);
        recargarTabla();
        Swal.fires("El pedido ha sido anulado")

    } 


}
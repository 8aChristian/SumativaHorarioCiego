import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Database, ref, get } from '@angular/fire/database';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private database: Database) {}

  ngOnInit() {
    // Obtener una referencia al nodo 'Luz' en tu base de datos
    const luzRef = ref(this.database, 'Luz');

    // Obtener los datos una vez (sin escuchar cambios)
    get(luzRef).then((snapshot) => {
      const luzStatus = snapshot.val();
      if (luzStatus) {
        // Si Luz es true (día), muestra la notificación de día
        this.mostrarNotificacionDia();
      } else {
        // Si Luz es false (noche), muestra la notificación de noche
        this.mostrarNotificacionNoche();
      }
    }).catch((error) => {
      console.error('Error al obtener datos de la base de datos:', error);
    });
  }

  async mostrarNotificacionDia() {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: "BUEN DIA, ESTA SOLEADO",
          body: "¡No olvides protegerte del sol!",
          id: 1,
          schedule:{
  
          }
        }
      ]
    });
  }

  async mostrarNotificacionNoche() {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: "YA ANOCHECIÓ!",
          body: "¡DUEEEERMETEEEEEEEEEEEEEEEEEEEEEEEEEEE!",
          id: 2,
          schedule:{
            allowWhileIdle:true
          }
        }
      ]
    });
  }
}

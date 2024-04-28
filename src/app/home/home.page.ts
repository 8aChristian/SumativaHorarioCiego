import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Database, ref, onValue, Unsubscribe } from '@angular/fire/database';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  luzStatus: boolean = true; // Inicializar el estado de la luz como verdadero por defecto
  luzSubscription: Unsubscribe | null = null; // Inicializar luzSubscription como null

  constructor(private database: Database) {}

  ngOnInit() {
    // Obtener una referencia al nodo 'Luz' en tu base de datos
    const luzRef = ref(this.database, 'Luz');

    try {
      // Escuchar cambios en el estado de la luz
      this.luzSubscription = onValue(luzRef, (snapshot) => {
        this.luzStatus = snapshot.val();
        if (this.luzStatus) {
          // Si Luz es true (día), muestra la notificación de día
          this.mostrarNotificacionDia();
        } else {
          // Si Luz es false (noche), muestra la notificación de noche
          this.mostrarNotificacionNoche();
        }
      });
    } catch (error) {
      console.error('Error al obtener datos de la base de datos:', error);
    }
  }

  ngOnDestroy() {
    // Darse de baja de las suscripciones cuando el componente se destruye
    if (this.luzSubscription) {
      this.luzSubscription(); // Llama a la función Unsubscribe
    }
  }

  async mostrarNotificacionDia() {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: "BUEN DIA, ESTA SOLEADO",
          body: "¡No olvides protegerte del sol!",
          id: 1,
          schedule:{ }
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
          schedule:{ }
        }
      ]
    });
  }
}

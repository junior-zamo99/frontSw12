import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    rol=localStorage.getItem('rol');

    model: any[] = [];
child: any;

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Inicio',
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/dashboard'],
                        roles: ['estudiante'] // Roles con acceso
                    },
                    {
                        label: 'Nivel',
                        icon: 'pi pi-fw pi-graduation-cap',
                        routerLink: ['/nivel'],
                        roles: ['admin'] // Solo para administradores
                    },
                    {
                        label: 'Lección',
                        icon: 'pi pi-fw pi-book',
                        routerLink: ['/leccion'],
                        roles: ['admin']
                    },
                ]
            },
        ];
    }


    hasAccess(item: any): boolean {
        if (!item.roles) {
            return true;
        }
        return item.roles.includes(this.rol);
    }
}

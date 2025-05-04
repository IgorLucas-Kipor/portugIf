import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";
import {MatTableModule} from "@angular/material/table";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatButtonModule} from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PortugifComponent } from './portugif/portugif.component';
import { FaqComponent } from './faq/faq.component';
import {AppRoutingModule} from "./app-routing.module";
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { VariablesComponent } from './variables/variables.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { WhileComponent } from './while/while.component';
import { ForComponent } from './for/for.component';
import { TooltipConfigService } from './services/tooltip-config.service';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SidenavService } from './services/sidenav.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    NavbarComponent,
    PortugifComponent,
    FaqComponent,
    HomeComponent,
    FooterComponent,
    DropdownComponent,
    VariablesComponent,
    WhileComponent,
    ForComponent,
    SidenavComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatRadioModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatTooltipModule,
        MatButtonModule,
        AppRoutingModule,
        MatSnackBarModule,
        MatSidenavModule,
        MatIconModule
    ],
  providers: [TooltipConfigService, SidenavService, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule {
}

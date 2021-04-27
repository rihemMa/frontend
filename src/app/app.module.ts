import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';


//Components
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { BillsComponent } from './files/bills/bills.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { ClientsComponent } from './clients/clients.component';
import { ProjectsComponent } from './projects/projects.component';
import { RolesComponent } from './roles/roles.component';


//primeNG imports
import {ButtonModule} from 'primeng/button';
import {MenubarModule} from 'primeng/menubar';
import {SidebarModule} from 'primeng/sidebar';
import { InputTextModule } from 'primeng/inputtext';
import {CardModule} from 'primeng/card';
import {CarouselModule} from 'primeng/carousel';
import {SplitterModule} from 'primeng/splitter';
import { TagModule } from 'primeng/tag';
import {BadgeModule} from 'primeng/badge';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {FileUploadModule} from 'primeng/fileupload';
import {ToolbarModule} from 'primeng/toolbar';
import {RatingModule} from 'primeng/rating';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputNumberModule} from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import {EditorModule} from 'primeng/editor';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SplitButtonModule } from 'primeng/splitbutton';
import { AddBillComponent } from './files/add-bill/add-bill.component';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { LoginComponent } from './login/login.component';
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule } from 'ngx-toastr';
import { PaperManagerComponent } from './paper-manager/paper-manager.component';
import { AddPaperComponent } from './components/add-paper/add-paper.component';
import { AddPaperTypeComponent } from './components/add-paper-type/add-paper-type.component';
import { UpdatePaperComponent } from './components/update-paper/update-paper.component';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {TooltipModule} from 'primeng/tooltip';
import { SearchResultComponent } from './components/search-result/search-result.component';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ActivityLogComponent } from './activity-log/activity-log.component';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import { ClientPipePipe } from './pipes/client-pipe.pipe';
import { ProjectPipePipe } from './pipes/project-pipe.pipe';
import { UserPipePipe } from './pipes/user-pipe.pipe';
import { RolePipePipe } from './pipes/role-pipe.pipe';
import { PaperPipePipe } from './pipes/paper-pipe.pipe';
import { PaperTypePipePipe } from './pipes/paper-type-pipe.pipe';
import { CompanyComponent } from './company/company.component';
import { UpdateBillComponent } from './files/update-bill/update-bill.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BillPipePipe } from './pipes/bill-pipe.pipe';
import { QuoteComponent } from './files/quote/quote.component';
import { AddQuoteComponent } from './files/add-quote/add-quote.component';
import { UpdateQuoteComponent } from './files/update-quote/update-quote.component';
import { QuotePipe } from './pipes/quote.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SideNavComponent,
    LayoutComponent,
    DashboardComponent,
    UsersComponent,
    ClientsComponent,
    ProjectsComponent,
    BillsComponent,
    RolesComponent,
    AddBillComponent,
    LoginComponent,
    PaperManagerComponent,
    AddPaperComponent,
    AddPaperTypeComponent,
    UpdatePaperComponent,
    SearchResultComponent,
    UpdatePasswordComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ActivityLogComponent,
    ClientPipePipe,
    ProjectPipePipe,
    UserPipePipe,
    RolePipePipe,
    PaperPipePipe,
    PaperTypePipePipe,
    CompanyComponent,
    UpdateBillComponent,
    ProfileComponent,
    BillPipePipe,
    QuoteComponent,
    AddQuoteComponent,
    UpdateQuoteComponent,
    QuotePipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AutoCompleteModule,
    ButtonModule,
    MenubarModule,
    SplitButtonModule,
    SidebarModule,
    BrowserAnimationsModule,
    InputTextModule,
    CardModule,
    CarouselModule,
    HttpClientModule,
    SplitterModule,
    TagModule,
    BadgeModule,
    TableModule,
    ToastModule,
    CalendarModule,
    SliderModule,
    MultiSelectModule,
    ContextMenuModule,
    DialogModule,
    DropdownModule,
    ProgressBarModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    EditorModule,
    FormsModule,
    SplitButtonModule,
    AutoCompleteModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ConfirmPopupModule,
    TooltipModule,
    MessagesModule,
    MessageModule,
    AvatarModule,
AvatarGroupModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

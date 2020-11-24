import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { User, UserState } from 'mdmf-shared-libs';
import { ListUserComponent } from './list-user.component';

describe('ListUserShellComponent', () => {
  let component: ListUserComponent;
  let fixture: ComponentFixture<ListUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [
            ReactiveFormsModule,
            FormsModule,
            NgxsModule.forRoot([UserState])
          ],
      declarations: [ListUserComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render h2 element', () => {
    const element = fixture.debugElement.nativeElement.querySelector('h2');
    expect(element.textContent).toContain(
      'List users from the shared application state'
    );
  });

});

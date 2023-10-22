import {
  Component,
  OnInit,
  ElementRef,
  ViewChild, OnDestroy
} from '@angular/core';

import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // Change those to 'Template driven approach'
  // @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
  // @ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;

  // If you don't want to receive the form in the 'onAddItem' as a parameter
  // You can use this with 'ViewChild' decoration like below.
  // @ViewChild('f') ingEditForm: NgForm;
  submitted = false;
  editMode = false;

  subscription: Subscription;
  editItemIndex: number;
  editItem: Ingredient;
  @ViewChild('f') slForm: NgForm;

  constructor(private slService: ShoppingListService) {
  }

  ngOnInit() {
    this.subscription = this.slService.startedEditing.subscribe(
      (index: number) => {
        // this will be used to check whether it is editMode or addMode
        this.editMode = true;
        this.editItemIndex = index;
        // retrieving an ingredient already stored with 'editItemIndex'
        this.editItem = this.slService.getIngredient(index);

        // setting the form with the ingredient we retrieved
        this.slForm.setValue({
          name: this.editItem.name,
          amount: this.editItem.amount,
        })
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  onSubmit(form: NgForm) {
    if (this.editMode) {
      const newIngredient =
        new Ingredient(form.value.name, form.value.amount);
      this.slService.updateIngredient(this.editItemIndex, newIngredient);
    } else {
      // const ingName = this.nameInputRef.nativeElement.value;
      // const ingAmount = this.amountInputRef.nativeElement.value;

      // Change those to 'Template driven approach'
      const value = form.value;
      const ingName = value.name;
      const ingAmount = value.amount;

      const newIngredient = new Ingredient(ingName, ingAmount);
      this.slService.addIngredient(newIngredient);

      // console.log(this.ingEditForm);
      this.submitted = true;
    }
    form.reset();
    this.editMode = false;
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.onClear();
    this.slService.deleteIngredient(this.editItemIndex);
  }
}

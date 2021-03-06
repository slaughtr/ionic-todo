import { Component } from '@angular/core'
import { NavController, ViewController } from 'ionic-angular'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'

import { FirebaseDataProvider } from '../../providers/firebase-data/firebase-data'
import * as moment from 'moment'

@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html'
})
export class AddItemPage {

  title
  description
  due
  created
  difficulty
  estTime
  reward
  inSet
  skill
  repeat
  expOnComplete

  addItemForm: FormGroup


  constructor(public navCtrl: NavController, public view: ViewController, public builder: FormBuilder, public fbData: FirebaseDataProvider) {
    this.addItemForm = builder.group({
      'title': ['', Validators.required],
      'description': [''],
      'due': ['', Validators.required],
      'difficulty': ['', Validators.required],
      'estTime': ['', Validators.required],
      'reward': [''],
      'inSet': [''],
      'skill': [''],
      'repeat': [''],
      'expOnComplete': ['']
    })
   }

  saveItem(formData){

      let dateTime = moment().format('L') + " " + moment().format('LT')

      let newItem = {
        title: formData.title,
        description: formData.description,
        due: formData.due,
        created: dateTime,
        difficulty: formData.difficulty,
        estTime: formData.estTime,
        reward: formData.reward,
        inSet: formData.inSet,
        skill: formData.skill,
        repeat: formData.repeat,
        //arbitrary experience calculation
        //base of 10 exp, plus estTime divided by 60, plus 1/10 of difficulty
        //then the whole thing multiplied by two. might still be a bit low
        expOnComplete: ((10 + ((formData.estTime/60)+(.1*formData.difficulty)))*2).toFixed(2)
      }

      if (newItem.reward === undefined || '') newItem.reward = "No Reward"
      if (newItem.inSet === undefined || '') newItem.inSet = "Not in a Set"
      if (newItem.skill === undefined || '') newItem.skill = "No Skill attributed"
      if (newItem.repeat === undefined || '') newItem.repeat = "No Repeat set"
      if (newItem.description === undefined || '') newItem.description = ""

      this.view.dismiss(newItem)
  }

  close() { this.view.dismiss() }

}
